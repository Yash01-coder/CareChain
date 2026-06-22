const mongoose =
  require("mongoose");

const recordSchema =
  new mongoose.Schema({

    patient: {

      type:
        mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    patientWallet: {
  type: String,
},

    recordType: {

      type: String,

      required: true,
    },

    fileName: {

      type: String,

      required: true,
    },

    ipfsHash: {

      type: String,

      default: "TEMP_CID",
    },

    iv: {
    type: String,
    },

    transactionHash: {
  type: String,
},

    uploadedAt: {

      type: Date,

      default: Date.now,
    },
  });

module.exports =
  mongoose.model(
    "Record",
    recordSchema
  );