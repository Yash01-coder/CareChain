const Record = require("../models/Record");
const AccessGrant = require("../models/AccessGrant");
const AuditLog = require("../models/AuditLog");
const User = require("../models/User");

// ==========================
// HELPER - ACTIVE ACCESS CHECK
// Normal access: active forever until revoked
// Emergency access: active only until expiresAt
// ==========================
const activeDoctorAccessQuery = (doctorWallet) => ({
  doctorWallet,
  isActive: true,
  $or: [
    { isEmergency: false },
    { isEmergency: { $exists: false } },
    { isEmergency: true, expiresAt: { $gt: new Date() } },
  ],
});

// =======================================
// GET AUTHORIZED PATIENT RECORDS
// Phase 22/23 - Doctor Portal
// Emergency Access Supported
// =======================================
exports.getAuthorizedRecords = async (req, res) => {
  try {
    const doctorWallet = req.query.doctorAddress?.toLowerCase().trim();

    if (!doctorWallet) {
      return res.status(400).json({
        message: "Doctor wallet address required",
      });
    }

    const grants = await AccessGrant.find(
      activeDoctorAccessQuery(doctorWallet)
    );

    if (grants.length === 0) {
      return res.status(200).json({
        success: true,
        records: [],
        message: "No patients have granted you access yet",
      });
    }

    const patientWallets = grants.map((g) => g.patientWallet);

    const records = await Record.find({
      patientWallet: { $in: patientWallets },
    }).sort({ uploadedAt: -1 });

    for (const grant of grants) {
      await AuditLog.create({
        action: grant.isEmergency
          ? "EMERGENCY_RECORD_VIEWED"
          : "RECORD_VIEWED",
        doctorWallet,
        patientWallet: grant.patientWallet,
        performedBy: "doctor",
        details: grant.isEmergency
          ? `Doctor ${doctorWallet} viewed patient records using emergency access`
          : `Doctor ${doctorWallet} viewed patient records`,
      });
    }

    res.status(200).json({
      success: true,
      records,
      patientsCount: patientWallets.length,
    });
  } catch (error) {
    console.log("DOCTOR RECORDS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch authorized records" });
  }
};

// =======================================
// GET LIST OF PATIENTS WHO GRANTED ACCESS
// Phase 23 - Doctor sees authorized patients
// Emergency Access Supported
// =======================================
exports.getAuthorizedPatients = async (req, res) => {
  try {
    const doctorWallet = req.query.doctorAddress?.toLowerCase().trim();

    if (!doctorWallet) {
      return res.status(400).json({ message: "Doctor wallet required" });
    }

    const grants = await AccessGrant.find(
      activeDoctorAccessQuery(doctorWallet)
    );

    const patients = await Promise.all(
      grants.map(async (grant) => {
        const user = await User.findOne({
          walletAddress: { $regex: new RegExp(`^${grant.patientWallet}$`, "i") },
        });

        return {
          patientWallet: grant.patientWallet,
          patientName: user?.name || "Unknown Patient",
          patientEmail: user?.email || "",
          grantedAt: grant.grantedAt,
          isEmergency: grant.isEmergency || false,
          expiresAt: grant.expiresAt || null,
        };
      })
    );

    res.status(200).json({
      success: true,
      patients,
    });
  } catch (error) {
    console.log("GET PATIENTS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch patients" });
  }
};