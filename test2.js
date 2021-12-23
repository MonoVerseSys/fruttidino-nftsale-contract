const fs = require("fs");
const { decrypt } = require("./scripts/kms");
const { accountEnc } = require("./secrets.json");

(async () => {
  const mnemonics = await decrypt(accountEnc);
  module.exports = { mnemonics };
})();
