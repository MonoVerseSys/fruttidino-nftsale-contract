const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const singers = await utils.singers();
  
  const result = await c.mintDino(
    singers[0].address,
    2,
    "kkaf2c49-168c-4da9-9d99-0ddf8fa70cz2"
  );
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
