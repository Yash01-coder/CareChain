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

const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
];

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file type. Only PDF, JPG, PNG, and WEBP files are allowed.")
      );
    }

    cb(null, true);
  },
});

const handleUpload = (req, res, next) => {
  upload.single("file")(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File is too large. Maximum upload size is 10MB.",
      });
    }

    return res.status(400).json({
      message: error.message || "File upload failed.",
    });
  });
};

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