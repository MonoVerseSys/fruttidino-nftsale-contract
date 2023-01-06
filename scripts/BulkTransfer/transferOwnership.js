const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  c.transferOwnership()
  const dinoIds = []
  const senders = []
  const receivers = []
  for(let i=3847;i<3847+20;i++) {
    senders.push()
    dinoIds.push(i)
  }
  console.log(dinoIds.length)
  const result = await c.multipleTransfer(
    dinoIds
  );
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
