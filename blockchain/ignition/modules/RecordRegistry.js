const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("RecordRegistryModule", (m) => {
  const recordRegistry = m.contract("RecordRegistry");

  return { recordRegistry };
});