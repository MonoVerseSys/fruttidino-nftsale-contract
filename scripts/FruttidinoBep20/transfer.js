const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const { ethers } = utils;

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
//   const singers = await utils.singers();
  const amounts = ethers.utils.parseUnits('10000000', 'ether')
    console.log(amounts.toString())

  const result = await c.mint('0xED22C760846af30fC50735181D9d71c8Efdb83D0', amounts)
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  