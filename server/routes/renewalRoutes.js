const express = require("express");

const {
getRenewals,
startRenewal,
updateRenewal,
getRenewalStats
} = require("../controllers/renewalController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getRenewals);
router.get("/stats", getRenewalStats);
router.post("/", startRenewal);
router.put("/:id", updateRenewal);

module.exports = router;
