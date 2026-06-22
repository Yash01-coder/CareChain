const crypto = require("crypto");

// ==========================
// AES ENCRYPTION
// ==========================
exports.encryptFile = (buffer) => {

  // RANDOM IV
  const iv =
    crypto.randomBytes(16);

  // CREATE CIPHER
  const cipher =
    crypto.createCipheriv(

      "aes-256-cbc",

      Buffer.from(
        process.env.ENCRYPTION_KEY
      ),

      iv
    );

  // ENCRYPT
  const encrypted =
    Buffer.concat([

      cipher.update(buffer),

      cipher.final(),
    ]);

  return {

    iv:
      iv.toString("hex"),

    encryptedData:
      encrypted,
  };
};

// ==========================
// AES DECRYPTION
// ==========================
exports.decryptFile = (
  encryptedBuffer,
  ivHex
) => {

  const decipher =
    crypto.createDecipheriv(

      "aes-256-cbc",

      Buffer.from(
        process.env.ENCRYPTION_KEY
      ),

      Buffer.from(
        ivHex,
        "hex"
      )
    );

  const decrypted =
    Buffer.concat([

      decipher.update(
        encryptedBuffer
      ),

      decipher.final(),
    ]);

  return decrypted;
};