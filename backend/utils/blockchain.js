const { ethers } = require("ethers");

const RecordRegistry = require("../blockchain/RecordRegistryABI.json");

// ==========================
// PROVIDER
// ==========================
const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL || "http://127.0.0.1:8545"
);

// ==========================
// WALLET
// ==========================
const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

// ==========================
// CONTRACT
// ==========================
const contract = new ethers.Contract(
  process.env.RECORD_REGISTRY_ADDRESS,
  RecordRegistry,
  wallet
);

// ==========================
// STORE RECORD
// ==========================
exports.storeRecordOnBlockchain = async (cid, recordType) => {

  try {

    console.log("CID:", cid);
    console.log("Record Type:", recordType);

    const tx = await contract.addRecord(
      String(cid),
      String(recordType)
    );

    const receipt = await tx.wait();

    console.log("Blockchain Success");

    return {
      transactionHash: receipt.hash,
    };

  } catch (error) {

    console.log("BLOCKCHAIN ERROR:", error.message);

    // Return empty hash instead of throwing, so upload doesn't fail
    // if Hardhat node is not running
    return { transactionHash: "" };
  }
};