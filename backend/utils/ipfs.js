const axios = require("axios");

const FormData =
  require("form-data");

// ==========================
// UPLOAD TO PINATA
// ==========================
exports.uploadToIPFS =
async (
  fileBuffer,
  fileName
) => {

  try {

    const data =
      new FormData();

    data.append(
      "file",
      fileBuffer,

      fileName
    );

    const response =
      await axios.post(

        "https://api.pinata.cloud/pinning/pinFileToIPFS",

        data,

        {
          headers: {

            ...data.getHeaders(),

            pinata_api_key:
              process.env.PINATA_API_KEY,

            pinata_secret_api_key:
              process.env
                .PINATA_SECRET_API_KEY,
          },
        }
      );

    return response.data.IpfsHash;

  } catch (error) {

    console.log(error);

    throw new Error(
      "IPFS Upload Failed"
    );
  }
};
// ==========================
// DOWNLOAD FROM IPFS
// ==========================
exports.downloadFromIPFS =
async (ipfsHash) => {

  try {

    const response =
      await axios.get(

        `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,

        {
          responseType:
            "arraybuffer",
        }
      );

    return Buffer.from(
      response.data
    );

  } catch (error) {

    console.log(error);

    throw new Error(
      "IPFS Download Failed"
    );
  }
};