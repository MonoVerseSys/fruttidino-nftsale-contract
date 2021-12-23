const utils = require("../utils");
const BigNumber = require("bignumber.js");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const fromIdx = 0;
  const toIdx = 1;

  const c = await utils.attach({ contractName, deployedAddress });
  // const [c] = await utils.connectToSigner(_c, fromIdx);
  const signers = await utils.singers();
  const fromS = signers[fromIdx];
  const toS = signers[toIdx];

  const result = await c.transferFrom(fromS.address, toS.address, 217);
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
