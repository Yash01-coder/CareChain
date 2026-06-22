async function main() {

  // =========================
  // USER REGISTRY
  // =========================
  const UserRegistry =
    await ethers.getContractFactory("UserRegistry");

  const userRegistry =
    await UserRegistry.deploy();

  await userRegistry.waitForDeployment();

  console.log(
    "UserRegistry deployed to:",
    await userRegistry.getAddress()
  );

  // =========================
  // RECORD REGISTRY
  // =========================
  const RecordRegistry =
    await ethers.getContractFactory("RecordRegistry");

  const recordRegistry =
    await RecordRegistry.deploy();

  await recordRegistry.waitForDeployment();

  console.log(
    "RecordRegistry deployed to:",
    await recordRegistry.getAddress()
  );

  // =========================
  // ACCESS CONTROL
  // =========================
  const AccessControl =
    await ethers.getContractFactory("AccessControl");

  const accessControl =
    await AccessControl.deploy();

  await accessControl.waitForDeployment();

  console.log(
    "AccessControl deployed to:",
    await accessControl.getAddress()
  );

  // =========================
  // AUDIT TRAIL
  // =========================
  const AuditTrail =
    await ethers.getContractFactory("AuditTrail");

  const auditTrail =
    await AuditTrail.deploy();

  await auditTrail.waitForDeployment();

  console.log(
    "AuditTrail deployed to:",
    await auditTrail.getAddress()
  );
}

// Execute Deployment
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });