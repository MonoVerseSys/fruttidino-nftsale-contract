const utils = require("../utils");
const {
  contractName,
} = require("./_config.json");


async function main() {
  await utils.deploy({ contractName, deployPrams: '0x60bA8Ed7cbE095FE7f47b4a70C1d92a2878DAE71' });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
