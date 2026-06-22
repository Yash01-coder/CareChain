const mongoose = require("mongoose");

// ==========================
// SCHEMA
// Phase 24 - Audit Trail
// Phase 28 - Audit Dashboard
// ==========================
const auditLogSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      // RECORD_VIEWED | RECORD_DOWNLOADED
      // ACCESS_GRANTED | ACCESS_REVOKED
      // RECORD_UPLOADED
      required: true,
    },

    doctorWallet: {
      type: String,
      lowercase: true,
      trim: true,
      default: null,
    },

    patientWallet: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },

    recordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Record",
      default: null,
    },

    ipfsHash: {
      type: String,
      default: null,
    },

    performedBy: {
      type: String,
      // "patient" | "doctor"
      required: true,
    },

    details: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);