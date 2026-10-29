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

router.use(authMiddleware);

router.get("/", getDocuments);
router.get("/stats", getDocumentStats);
router.get("/:id", getDocumentById);
router.post("/", addDocument);
router.put("/:id", updateDocument);
router.delete("/:id", deleteDocument);

module.exports = router;