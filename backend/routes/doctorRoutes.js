const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAuthorizedRecords,
  getAuthorizedPatients,
} = require("../controllers/doctorController");

// ==========================
// DOCTOR ROUTES
// Phase 22/23
// ==========================

// GET /api/doctors/records?doctorAddress=0x...
router.get(
  "/records",
  getAuthorizedRecords
);

// GET /api/doctors/patients?doctorAddress=0x...
router.get(
  "/patients",
  getAuthorizedPatients
);

module.exports = router;