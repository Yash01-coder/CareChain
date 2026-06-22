const { ethers } = require("ethers");

require("dotenv").config();

// ==========================
// PROVIDER
// ==========================
const provider = new ethers.JsonRpcProvider(
  process.env.RPC_URL
);

// ==========================
// WALLET
// ==========================
const wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY,
  provider
);

// ==========================
// CONTRACT ABI
// ==========================
const abi = [
  "function grantAccess(address doctor) public",
  "function revokeAccess(address doctor) public",
  "function checkAccess(address patient, address doctor) public view returns(bool)"
];

// ==========================
// CONTRACT
// ==========================
const contract = new ethers.Contract(
  process.env.ACCESS_CONTROL_ADDRESS,
  abi,
  wallet
);

// ==========================
// GRANT ACCESS
// ==========================
exports.grantAccess = async (doctorAddress) => {

  try {

    const tx = await contract.grantAccess(
      doctorAddress
    );

    await tx.wait();

    return tx.hash;

  } catch (error) {

    console.log(
      "GRANT ACCESS ERROR:",
      error
    );

    throw new Error(
      "Grant Access Failed"
    );
  }
};

// ==========================
// REVOKE ACCESS
// ==========================
exports.revokeAccess = async (doctorAddress) => {

  try {

    const tx = await contract.revokeAccess(
      doctorAddress
    );

    await tx.wait();

    return tx.hash;

  } catch (error) {

    console.log(
      "REVOKE ACCESS ERROR:",
      error
    );

    throw new Error(
      "Revoke Access Failed"
    );
  }
};

// ==========================
// CHECK ACCESS
// ==========================
exports.checkAccess = async (
  patientAddress,
  doctorAddress
) => {

  try {

    const access =
      await contract.checkAccess(
        patientAddress,
        doctorAddress
      );

    return access;

  } catch (error) {

    console.log(
      "CHECK ACCESS ERROR:",
      error
    );

    throw new Error(
      "Check Access Failed"
    );
  }
};