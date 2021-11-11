const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

const {
  deployedAddress: fdtAddress,
} = require("../FruttidinoErc20/_config.json");

async function main() {
  await utils.deployProxy({ contractName, deployPrams: [fdtAddress] });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
