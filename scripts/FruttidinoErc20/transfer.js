const utils = require("../utils");
const BigNumber = require("bignumber.js");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const fromIdx = 2;
  const toIdx = 0;
  const amount = 5;

  const _c = await utils.attach({ contractName, deployedAddress });
  const [c] = await utils.connectToSigner(_c, fromIdx);
  const signer = (await utils.singers())[toIdx];

  const result = await c.transfer(
    signer.address,
    new BigNumber(amount).times(1e18).toFixed()
  );
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
