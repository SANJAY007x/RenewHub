const db = require("../config/db");

const getRenewals = async (req, res) => {
try {
const userId = req.user.userId;

const [renewals] = await db.query(
  `SELECT
      r.id,
      r.document_id,
      r.status,
      r.started_at,
      r.renewal_date,
      r.completed_at,
      r.reference_number,
      r.notes,
      r.created_at,
      r.updated_at,
      d.document_name,
      d.document_type,
      d.document_number,
      d.expiry_date
   FROM renewals r
   INNER JOIN documents d ON r.document_id = d.id
   WHERE d.user_id = ?
   ORDER BY r.created_at DESC`,
  [userId]
);

res.status(200).json({
  success: true,
  renewals
});


} catch (error) {
console.error("Get Renewals Error:", error);


res.status(500).json({
  success: false,
  message: "Unable to retrieve renewals."
});


}
};

const startRenewal = async (req, res) => {
try {
const userId = req.user.userId;
const { documentId } = req.body;


if (
  !documentId ||
  !Number.isInteger(Number(documentId)) ||
  Number(documentId) <= 0
) {
  return res.status(400).json({
    success: false,
    message: "A valid document ID is required."
  });
}

const [documents] = await db.query(
  `SELECT id, document_name, expiry_date
   FROM documents
   WHERE id = ? AND user_id = ?
   LIMIT 1`,
  [Number(documentId), userId]
);

if (documents.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Document not found for this user."
  });
}

const [existingRenewals] = await db.query(
  `SELECT id, status
   FROM renewals
   WHERE document_id = ?
   AND status IN ('Pending', 'In Progress')
   LIMIT 1`,
  [Number(documentId)]
);

if (existingRenewals.length > 0) {
  return res.status(409).json({
    success: false,
    message: "An active renewal already exists for this document.",
    renewal: existingRenewals[0]
  });
}

const [result] = await db.query(
  `INSERT INTO renewals
    (document_id, status, started_at, renewal_date)
   VALUES (?, 'In Progress', NOW(), ?)`,
  [Number(documentId), documents[0].expiry_date]
);

const [newRenewals] = await db.query(
  `SELECT
      r.id,
      r.document_id,
      r.status,
      r.started_at,
      r.renewal_date,
      r.completed_at,
      r.reference_number,
      r.notes,
      r.created_at,
      r.updated_at,
      d.document_name,
      d.document_type,
      d.document_number,
      d.expiry_date
   FROM renewals r
   INNER JOIN documents d ON r.document_id = d.id
   WHERE r.id = ? AND d.user_id = ?
   LIMIT 1`,
  [result.insertId, userId]
);

res.status(201).json({
  success: true,
  message: "Renewal started successfully.",
  renewal: newRenewals[0]
});


} catch (error) {
console.error("Start Renewal Error:", error);


res.status(500).json({
  success: false,
  message: "Unable to start the renewal."
});


}
};

const updateRenewal = async (req, res) => {
try {
const userId = req.user.userId;
const { id } = req.params;
const { status, referenceNumber, notes } = req.body;


const allowedStatuses = [
  "Pending",
  "In Progress",
  "Completed",
  "Cancelled"
];

if (!allowedStatuses.includes(status)) {
  return res.status(400).json({
    success: false,
    message: "Invalid renewal status."
  });
}

const [renewals] = await db.query(
  `SELECT r.id
   FROM renewals r
   INNER JOIN documents d ON r.document_id = d.id
   WHERE r.id = ? AND d.user_id = ?
   LIMIT 1`,
  [id, userId]
);

if (renewals.length === 0) {
  return res.status(404).json({
    success: false,
    message: "Renewal not found."
  });
}

await db.query(
  `UPDATE renewals
   SET status = ?,
       reference_number = ?,
       notes = ?,
       completed_at = CASE
         WHEN ? = 'Completed' THEN COALESCE(completed_at, NOW())
         ELSE NULL
       END
   WHERE id = ?`,
  [
    status,
    referenceNumber || null,
    notes || null,
    status,
    id
  ]
);

const [updatedRenewals] = await db.query(
  `SELECT
      r.id,
      r.document_id,
      r.status,
      r.started_at,
      r.renewal_date,
      r.completed_at,
      r.reference_number,
      r.notes,
      r.created_at,
      r.updated_at,
      d.document_name,
      d.document_type,
      d.document_number,
      d.expiry_date
   FROM renewals r
   INNER JOIN documents d ON r.document_id = d.id
   WHERE r.id = ? AND d.user_id = ?
   LIMIT 1`,
  [id, userId]
);

res.status(200).json({
  success: true,
  message: "Renewal updated successfully.",
  renewal: updatedRenewals[0]
});


} catch (error) {
console.error("Update Renewal Error:", error);


res.status(500).json({
  success: false,
  message: "Unable to update the renewal."
});


}
};

const getRenewalStats = async (req, res) => {
try {
const userId = req.user.userId;

const [stats] = await db.query(
  `SELECT
      COUNT(*) AS totalRenewals,
      COALESCE(SUM(status = 'Pending'), 0) AS pendingRenewals,
      COALESCE(SUM(status = 'In Progress'), 0) AS inProgressRenewals,
      COALESCE(SUM(status = 'Completed'), 0) AS completedRenewals,
      COALESCE(SUM(status = 'Cancelled'), 0) AS cancelledRenewals
   FROM renewals r
   INNER JOIN documents d ON r.document_id = d.id
   WHERE d.user_id = ?`,
  [userId]
);

res.status(200).json({
  success: true,
  stats: stats[0]
});


} catch (error) {
console.error("Renewal Stats Error:", error);


res.status(500).json({
  success: false,
  message: "Unable to retrieve renewal statistics."
});


}
};

module.exports = {
  getRenewals,
  startRenewal,
  updateRenewal,
  getRenewalStats
};
