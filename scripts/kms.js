const { KMS } = require("aws-sdk");
const secrets = require("../secrets.json");
const kms = new KMS({
  accessKeyId: secrets.accessKeyId,
  secretAccessKey: secrets.secretAccessKey,
  region: secrets.region,
});

const encrypt = async (source) => {
  const params = {
    KeyId: secrets.kmsKey,
    Plaintext: source,
  };
  const { CiphertextBlob } = await kms.encrypt(params).promise();
  return CiphertextBlob.toString("base64");
};

const decrypt = async (source) => {
  const params = {
    CiphertextBlob: Buffer.from(source, "base64"),
  };
  const { Plaintext } = await kms.decrypt(params).promise();
  return Plaintext.toString();
};
module.exports = {
  encrypt,
  decrypt,
};
