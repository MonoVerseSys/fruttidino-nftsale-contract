const utils = require("../utils");
const {
  contractName,
  deployPrams
} = require("./_config.json");


async function main() {
  await utils.deploy({ contractName, deployPrams });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
