const { ethers } = require("ethers");


// ==========================
// PROVIDER
// ==========================
const provider =
  new ethers.JsonRpcProvider(
    process.env.RPC_URL
  );


// ==========================
// WALLET
// ==========================
const wallet =
  new ethers.Wallet(
    process.env.PRIVATE_KEY,
    provider
  );


// ==========================
// CONTRACT ABI
// ==========================
const recordRegistryABI = [
  // PASTE ABI HERE
];


// ==========================
// CONTRACT INSTANCE
// ==========================
const recordRegistry =
  new ethers.Contract(
    process.env.RECORD_REGISTRY_ADDRESS,
    recordRegistryABI,
    wallet
  );

module.exports = {
  recordRegistry,
};