const utils = require("../utils");
const BigNumber = require("bignumber.js");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const signers = await utils.singers();
  for (const signer of signers) {
    const balance = await c.balanceOf(signer.address);
    console.log(
      signer.address,
      ":",
      new BigNumber(balance).div(1e18).toFixed()
    );
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
