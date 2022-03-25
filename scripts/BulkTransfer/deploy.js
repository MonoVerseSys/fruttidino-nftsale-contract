const utils = require("../utils");
const {
  contractName,
} = require("./_config.json");


async function main() {
  await utils.deploy({ contractName, deployPrams: '0xA445fc08dBdeb9Fc02aEFB42315460Df4384afA5' });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
