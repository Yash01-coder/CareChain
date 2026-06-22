const mongoose = require("mongoose");

// ==========================
// SCHEMA
// Phase 27 - Patient-Doctor
// Relationship System
// Emergency Access Supported
// ==========================
const accessGrantSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    patientWallet: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    doctorWallet: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    grantedAt: {
      type: Date,
      default: Date.now,
    },

    revokedAt: {
      type: Date,
      default: null,
    },

    isEmergency: {
      type: Boolean,
      default: false,
    },

    expiresAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Fast lookup for patient-doctor access.
// Allows one access record per patient-doctor wallet pair.
accessGrantSchema.index(
  { patientWallet: 1, doctorWallet: 1 },
  { unique: true }
);

// Helps doctor dashboard filter active and non-expired access quickly.
accessGrantSchema.index({
  doctorWallet: 1,
  isActive: 1,
  expiresAt: 1,
});

module.exports = mongoose.model("AccessGrant", accessGrantSchema);