const express = require("express");
const multer = require("multer");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  uploadRecord,
  getMyRecords,
  downloadRecord,
  verifyRecordIntegrity,
  grantDoctorAccess,
  grantEmergencyAccess,
  revokeDoctorAccess,
  checkDoctorAccess,
  getAuditTrail,
} = require("../controllers/recordController");

// ==========================
// MULTER - memory storage
// ==========================
const storage = multer.memoryStorage();

const upload = multer({ storage });

// ==========================
// PROTECTED ROUTES
// Phase 25 - authMiddleware on all
// ==========================
router.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  uploadRecord
);

router.get(
  "/my-records",
  authMiddleware,
  getMyRecords
);

router.get(
  "/download/:id",
  authMiddleware,
  downloadRecord
);

router.get(
  "/verify/:id",
  authMiddleware,
  verifyRecordIntegrity
);

router.post(
  "/grant-access",
  authMiddleware,
  grantDoctorAccess
);

router.post(
  "/emergency-access",
  authMiddleware,
  grantEmergencyAccess
);

router.post(
  "/revoke-access",
  authMiddleware,
  revokeDoctorAccess
);

router.post(
  "/check-access",
  authMiddleware,
  checkDoctorAccess
);

// Phase 24/28 - Audit Trail
router.get(
  "/audit-trail",
  authMiddleware,
  getAuditTrail
);

module.exports = router;