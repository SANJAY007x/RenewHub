const pool = require("../config/db");

// GET ALL DOCUMENTS
const getDocuments = async (req, res) => {
try {
const userId = req.user.userId;


const [documents] = await pool.execute(
  `
  SELECT
    id,
    document_name,
    document_type,
    document_number,
    holder_name,
    issuing_authority,
    issue_date,
    expiry_date,
    notes,
    file_name,
    file_path,
    reminder_90_days,
    reminder_30_days,
    reminder_7_days,
    created_at,
    updated_at
  FROM documents
  WHERE user_id = ?
  ORDER BY expiry_date ASC
  `,
  [userId]
);

return res.status(200).json({
  success: true,
  documents
});


} catch (error) {
console.error("Get Documents Error:", error);


return res.status(500).json({
  success: false,
  message: "Unable to fetch documents."
});


}
};

// GET DOCUMENT STATISTICS
const getDocumentStats = async (req, res) => {
try {
const userId = req.user.userId;


const [rows] = await pool.execute(
  `
  SELECT
    COUNT(*) AS total,
    COALESCE(SUM(
      CASE
        WHEN expiry_date >= CURDATE() THEN 1
        ELSE 0
      END
    ), 0) AS active,
    COALESCE(SUM(
      CASE
        WHEN expiry_date >= CURDATE()
        AND expiry_date <= DATE_ADD(CURDATE(), INTERVAL 30 DAY)
        THEN 1
        ELSE 0
      END
    ), 0) AS expiringSoon,
    COALESCE(SUM(
      CASE
        WHEN expiry_date < CURDATE() THEN 1
        ELSE 0
      END
    ), 0) AS expired
  FROM documents
  WHERE user_id = ?
  `,
  [userId]
);

return res.status(200).json({
  success: true,
  statistics: {
    total: Number(rows[0].total),
    active: Number(rows[0].active),
    expiringSoon: Number(rows[0].expiringSoon),
    expired: Number(rows[0].expired)
  }
});


} catch (error) {
console.error("Get Document Statistics Error:", error);


return res.status(500).json({
  success: false,
  message: "Unable to fetch document statistics."
});


}
};

// GET SINGLE DOCUMENT
const getDocumentById = async (req, res) => {
try {
const userId = req.user.userId;
const documentId = req.params.id;


const [documents] = await pool.execute(
  `
  SELECT
    id,
    document_name,
    document_type,
    document_number,
    holder_name,
    issuing_authority,
    issue_date,
    expiry_date,
    notes,
    file_name,
    file_path,
    reminder_90_days,
    reminder_30_days,
    reminder_7_days,
    created_at,
    updated_at
  FROM documents
  WHERE id = ?
  AND user_id = ?
  LIMIT 1
  `,
  [documentId, userId]
);

if (documents.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Document not found."
  });
}

return res.status(200).json({
  success: true,
  document: documents[0]
});


} catch (error) {
console.error("Get Document Error:", error);


return res.status(500).json({
  success: false,
  message: "Unable to fetch document."
});


}
};

// ADD DOCUMENT
const addDocument = async (req, res) => {
try {
const userId = req.user.userId;


const {
  documentName,
  documentType,
  documentNumber,
  holderName,
  issuingAuthority,
  issueDate,
  expiryDate,
  notes,
  fileName,
  filePath,
  reminder90Days,
  reminder30Days,
  reminder7Days
} = req.body;

if (
  !documentName?.trim() ||
  !documentType?.trim() ||
  !expiryDate
) {
  return res.status(400).json({
    success: false,
    message: "Document name, document type and expiry date are required."
  });
}

const [result] = await pool.execute(
  `
  INSERT INTO documents (
    user_id,
    document_name,
    document_type,
    document_number,
    holder_name,
    issuing_authority,
    issue_date,
    expiry_date,
    notes,
    file_name,
    file_path,
    reminder_90_days,
    reminder_30_days,
    reminder_7_days
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `,
  [
    userId,
    documentName.trim(),
    documentType.trim(),
    documentNumber || null,
    holderName || null,
    issuingAuthority || null,
    issueDate || null,
    expiryDate,
    notes || null,
    fileName || null,
    filePath || null,
    reminder90Days ? 1 : 0,
    reminder30Days ? 1 : 0,
    reminder7Days ? 1 : 0
  ]
);

return res.status(201).json({
  success: true,
  message: "Document added successfully.",
  documentId: result.insertId
});


} catch (error) {
console.error("Add Document Error:", error);


return res.status(500).json({
  success: false,
  message: "Unable to add document."
});


}
};

// UPDATE DOCUMENT
const updateDocument = async (req, res) => {
try {
const userId = req.user.userId;
const documentId = req.params.id;


const {
  documentName,
  documentType,
  documentNumber,
  holderName,
  issuingAuthority,
  issueDate,
  expiryDate,
  notes,
  reminder90Days,
  reminder30Days,
  reminder7Days
} = req.body;

if (
  !documentName?.trim() ||
  !documentType?.trim() ||
  !expiryDate
) {
  return res.status(400).json({
    success: false,
    message: "Document name, document type and expiry date are required."
  });
}

const [existingDocuments] = await pool.execute(
  `
  SELECT id
  FROM documents
  WHERE id = ?
  AND user_id = ?
  LIMIT 1
  `,
  [documentId, userId]
);

if (existingDocuments.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Document not found for this user."
  });
}

await pool.execute(
  `
  UPDATE documents
  SET
    document_name = ?,
    document_type = ?,
    document_number = ?,
    holder_name = ?,
    issuing_authority = ?,
    issue_date = ?,
    expiry_date = ?,
    notes = ?,
    reminder_90_days = ?,
    reminder_30_days = ?,
    reminder_7_days = ?
  WHERE id = ?
  AND user_id = ?
  `,
  [
    documentName.trim(),
    documentType.trim(),
    documentNumber || null,
    holderName || null,
    issuingAuthority || null,
    issueDate || null,
    expiryDate,
    notes || null,
    reminder90Days ? 1 : 0,
    reminder30Days ? 1 : 0,
    reminder7Days ? 1 : 0,
    documentId,
    userId
  ]
);

return res.status(200).json({
  success: true,
  message: "Document updated successfully."
});


} catch (error) {
console.error("Update Document Error:", error);


return res.status(500).json({
  success: false,
  message: "Unable to update document."
});


}
};

// DELETE DOCUMENT
const deleteDocument = async (req, res) => {
try {
const userId = req.user.userId;
const documentId = req.params.id;


const [result] = await pool.execute(
  `
  DELETE FROM documents
  WHERE id = ?
  AND user_id = ?
  `,
  [documentId, userId]
);

if (result.affectedRows === 0) {
  return res.status(404).json({
    success: false,
    message: "Document not found."
  });
}

return res.status(200).json({
  success: true,
  message: "Document deleted successfully."
});


} catch (error) {
console.error("Delete Document Error:", error);


return res.status(500).json({
  success: false,
  message: "Unable to delete document."
});


}
};

module.exports = {
getDocuments,
getDocumentStats,
getDocumentById,
addDocument,
updateDocument,
deleteDocument
};
