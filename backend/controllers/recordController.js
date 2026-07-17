const crypto = require("crypto");
const Record = require("../models/Record");
const AccessGrant = require("../models/AccessGrant");
const AuditLog = require("../models/AuditLog");
const User = require("../models/User");

const { encryptFile, decryptFile } = require("../utils/encryption");
const { uploadToIPFS, downloadFromIPFS } = require("../utils/ipfs");
const { storeRecordOnBlockchain } = require("../utils/blockchain");
const { grantAccess, revokeAccess } = require("../utils/accessControl");

// ==========================
// HELPER - ACTIVE ACCESS CHECK
// Normal access: active forever until revoked
// Emergency access: active only until expiresAt
// ==========================
const activeAccessQuery = (patientWallet, doctorWallet) => ({
  patientWallet,
  doctorWallet,
  isActive: true,
  $or: [
    { isEmergency: false },
    { isEmergency: { $exists: false } },
    { isEmergency: true, expiresAt: { $gt: new Date() } },
  ],
});

// ==========================
// UPLOAD RECORD
// Phase 12-15 + fix Bug #1
// ==========================
exports.uploadRecord = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { recordType } = req.body;

    let patientWallet = req.body.patientWallet || "";

    if (!patientWallet && req.user?.id) {
      const user = await User.findById(req.user.id);
      patientWallet = user?.walletAddress || "";
    }

    const { iv, encryptedData } = encryptFile(req.file.buffer);

    const ipfsHash = await uploadToIPFS(
      encryptedData,
      req.file.originalname
    );

    console.log("IPFS HASH:", ipfsHash);

    const fileHash = crypto
  .createHash("sha256")
  .update(req.file.buffer)
  .digest("hex");

    const blockchainResult = await storeRecordOnBlockchain(
      ipfsHash,
      recordType,
      fileHash
    );

    const record = await Record.create({
      patient: req.user?.id,
      patientWallet: patientWallet.toLowerCase(),
      recordType,
      fileName: req.file.originalname,
      ipfsHash,
      iv,
      fileHash,
      verificationStatus: blockchainResult?.transactionHash ? "verified" : "pending",
      transactionHash: blockchainResult?.transactionHash || "",
    });

    await AuditLog.create({
      action: "RECORD_UPLOADED",
      patientWallet: patientWallet.toLowerCase(),
      recordId: record._id,
      ipfsHash,
      performedBy: "patient",
      details: `Uploaded ${recordType}: ${req.file.originalname}`,
    });

    res.status(200).json({
      success: true,
      message: "Encrypted Record Uploaded",
      ipfsHash,
      fileHash,
      verificationStatus: record.verificationStatus,
      transactionHash: blockchainResult?.transactionHash,
      record,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================
// GET MY RECORDS
// Phase 16-18
// ==========================
exports.getMyRecords = async (req, res) => {
  try {
    const records = await Record.find({
      patient: req.user.id,
    }).sort({ uploadedAt: -1 });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ==========================
// DOWNLOAD RECORD
// Phase 25 - access check before download
// ==========================
exports.downloadRecord = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    const requesterId = req.user?.id;

    if (requesterId) {
      const user = await User.findById(requesterId);

      if (!user) {
        return res.status(403).json({ message: "Unauthorized" });
      }

      const isOwner = String(record.patient) === String(requesterId);

      if (!isOwner && user.role === "doctor") {
        const doctorWallet = user.walletAddress?.toLowerCase();

        const grant = await AccessGrant.findOne(
          activeAccessQuery(record.patientWallet, doctorWallet)
        );

        if (!grant) {
          return res.status(403).json({
            message: "Access denied. Patient has not granted you access or emergency access has expired.",
          });
        }

        await AuditLog.create({
          action: "RECORD_DOWNLOADED",
          doctorWallet,
          patientWallet: record.patientWallet,
          recordId: record._id,
          ipfsHash: record.ipfsHash,
          performedBy: "doctor",
          details: `Doctor downloaded ${record.recordType}: ${record.fileName}`,
        });
      }
    }

    const encryptedBuffer = await downloadFromIPFS(record.ipfsHash);
    const decryptedBuffer = decryptFile(encryptedBuffer, record.iv);

    res.set({
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${record.fileName}"`,
    });

    res.send(decryptedBuffer);
  } catch (error) {
    console.log("DOWNLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ==========================
// VERIFY RECORD INTEGRITY METADATA
// Returns proof metadata only. Does not expose file contents.
// ==========================
exports.verifyRecordIntegrity = async (req, res) => {
  try {
    const { id } = req.params;

    const record = await Record.findById(id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    const requester = await User.findById(req.user?.id);

    if (!requester) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const isOwner = String(record.patient) === String(requester._id);

    let hasDoctorAccess = false;

    if (!isOwner && requester.role === "doctor") {
      const doctorWallet = requester.walletAddress?.toLowerCase();

      const grant = await AccessGrant.findOne(
        activeAccessQuery(record.patientWallet, doctorWallet)
      );

      hasDoctorAccess = !!grant;
    }

    if (!isOwner && !hasDoctorAccess) {
      return res.status(403).json({
        message: "Access denied. You are not authorized to verify this record.",
      });
    }

    res.status(200).json({
      success: true,
      recordId: record._id,
      recordType: record.recordType,
      fileName: record.fileName,
      ipfsHash: record.ipfsHash,
      fileHash: record.fileHash,
      transactionHash: record.transactionHash,
      verificationStatus: record.verificationStatus,
      uploadedAt: record.uploadedAt,
      access: {
        isOwner,
        hasDoctorAccess,
      },
    });
  } catch (error) {
    console.log("VERIFY RECORD ERROR:", error);
    res.status(500).json({ message: "Failed to verify record integrity" });
  }
};

// ==========================
// GRANT DOCTOR ACCESS
// Phase 20/22/27 — saves to MongoDB
// ==========================
exports.grantDoctorAccess = async (req, res) => {
  try {
    const doctorAddress = req.body?.doctorAddress?.toLowerCase().trim();

    if (!doctorAddress) {
      return res.status(400).json({ message: "Doctor address required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientWallet = user.walletAddress?.toLowerCase().trim();

    if (!patientWallet) {
      return res.status(400).json({
        message: "Patient wallet not found. Please update your profile.",
      });
    }

    await AccessGrant.findOneAndUpdate(
      { patientWallet, doctorWallet: doctorAddress },
      {
        patientId: user._id,
        patientWallet,
        doctorWallet: doctorAddress,
        isActive: true,
        grantedAt: new Date(),
        revokedAt: null,
        isEmergency: false,
        expiresAt: null,
      },
      { upsert: true, new: true }
    );

    await AuditLog.create({
      action: "ACCESS_GRANTED",
      doctorWallet: doctorAddress,
      patientWallet,
      performedBy: "patient",
      details: `Patient granted access to doctor ${doctorAddress}`,
    });

    let txHash = "";

    try {
      txHash = await grantAccess(doctorAddress);
    } catch (blockchainErr) {
      console.log("Blockchain grant skipped (Hardhat not running):", blockchainErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Access Granted Successfully",
      transactionHash: txHash,
    });
  } catch (error) {
    console.log("GRANT ACCESS ERROR:", error);
    res.status(500).json({ message: "Grant Access Failed" });
  }
};

// ==========================
// GRANT EMERGENCY ACCESS
// Temporary access for critical situations
// ==========================
exports.grantEmergencyAccess = async (req, res) => {
  try {
    const doctorAddress = req.body?.doctorAddress?.toLowerCase().trim();
    const durationHours = Number(req.body?.durationHours || 24);

    if (!doctorAddress) {
      return res.status(400).json({ message: "Doctor address required" });
    }

    if (![6, 12, 24, 48].includes(durationHours)) {
      return res.status(400).json({
        message: "Invalid duration. Allowed values: 6, 12, 24, 48 hours.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientWallet = user.walletAddress?.toLowerCase().trim();

    if (!patientWallet) {
      return res.status(400).json({
        message: "Patient wallet not found. Please update your profile.",
      });
    }

    const expiresAt = new Date(Date.now() + durationHours * 60 * 60 * 1000);

    const accessGrant = await AccessGrant.findOneAndUpdate(
      { patientWallet, doctorWallet: doctorAddress },
      {
        patientId: user._id,
        patientWallet,
        doctorWallet: doctorAddress,
        isActive: true,
        grantedAt: new Date(),
        revokedAt: null,
        isEmergency: true,
        expiresAt,
      },
      { upsert: true, new: true }
    );

    await AuditLog.create({
      action: "EMERGENCY_ACCESS_GRANTED",
      doctorWallet: doctorAddress,
      patientWallet,
      performedBy: "patient",
      details: `Emergency access granted to doctor ${doctorAddress} for ${durationHours} hours. Expires at ${expiresAt.toISOString()}`,
    });

    res.status(201).json({
      success: true,
      message: "Emergency Access Granted Successfully",
      expiresAt,
      accessGrant,
    });
  } catch (error) {
    console.log("EMERGENCY ACCESS ERROR:", error);
    res.status(500).json({ message: "Failed to grant emergency access" });
  }
};

// ==========================
// REVOKE DOCTOR ACCESS
// Phase 20/22
// ==========================
exports.revokeDoctorAccess = async (req, res) => {
  try {
    const doctorAddress = req.body?.doctorAddress?.toLowerCase().trim();

    if (!doctorAddress) {
      return res.status(400).json({ message: "Doctor address required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const patientWallet = user.walletAddress?.toLowerCase().trim();

    await AccessGrant.findOneAndUpdate(
      { patientWallet, doctorWallet: doctorAddress },
      {
        isActive: false,
        revokedAt: new Date(),
      }
    );

    await AuditLog.create({
      action: "ACCESS_REVOKED",
      doctorWallet: doctorAddress,
      patientWallet,
      performedBy: "patient",
      details: `Patient revoked access from doctor ${doctorAddress}`,
    });

    let txHash = "";

    try {
      txHash = await revokeAccess(doctorAddress);
    } catch (blockchainErr) {
      console.log("Blockchain revoke skipped:", blockchainErr.message);
    }

    res.status(200).json({
      success: true,
      message: "Access Revoked Successfully",
      transactionHash: txHash,
    });
  } catch (error) {
    console.log("REVOKE ACCESS ERROR:", error);
    res.status(500).json({ message: "Revoke Access Failed" });
  }
};

// ==========================
// CHECK DOCTOR ACCESS
// Phase 20/21
// ==========================
exports.checkDoctorAccess = async (req, res) => {
  try {
    const patientAddress = req.body?.patientAddress?.toLowerCase().trim();
    const doctorAddress = req.body?.doctorAddress?.toLowerCase().trim();

    if (!patientAddress || !doctorAddress) {
      return res.status(400).json({ message: "Both addresses required" });
    }

    const grant = await AccessGrant.findOne(
      activeAccessQuery(patientAddress, doctorAddress)
    );

    res.status(200).json({
      success: true,
      access: !!grant,
      source: "database",
      isEmergency: grant?.isEmergency || false,
      expiresAt: grant?.expiresAt || null,
    });
  } catch (error) {
    console.log("CHECK ACCESS ERROR:", error);
    res.status(500).json({ message: "Check Access Failed" });
  }
};

// ==========================
// GET AUDIT TRAIL
// Phase 24/28 - for patient to view
// ==========================
exports.getAuditTrail = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const patientWallet = user.walletAddress?.toLowerCase();

    const logs = await AuditLog.find({
      patientWallet,
    })
      .sort({ createdAt: -1 })
      .limit(50);

    res.status(200).json({
      success: true,
      logs,
    });
  } catch (error) {
    console.log("AUDIT TRAIL ERROR:", error);
    res.status(500).json({ message: "Failed to fetch audit trail" });
  }
};