const express = require("express");

const {
  getDocuments,
  getDocumentStats,
  getDocumentById,
  addDocument,
  updateDocument,
  deleteDocument
} = require("../controllers/documentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ============================================================
// AUTHENTICATION
// All document routes require a valid JWT token
// ============================================================

router.use(authMiddleware);


// ============================================================
// GET ALL DOCUMENTS
// GET /api/documents
// ============================================================

router.get("/", getDocuments);


// ============================================================
// GET DOCUMENT STATISTICS
// GET /api/documents/stats
// ============================================================

router.get("/stats", getDocumentStats);


// ============================================================
// GET SINGLE DOCUMENT
// GET /api/documents/:id
// ============================================================

router.get("/:id", getDocumentById);


// ============================================================
// ADD DOCUMENT
// POST /api/documents
// ============================================================

router.post("/", addDocument);


// ============================================================
// UPDATE DOCUMENT
// PUT /api/documents/:id
// ============================================================

router.put("/:id", updateDocument);


// ============================================================
// DELETE DOCUMENT
// DELETE /api/documents/:id
// ============================================================

router.delete("/:id", deleteDocument);


// ============================================================
// EXPORT ROUTER
// ============================================================

module.exports = router;