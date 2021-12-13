const utils = require("../utils");
// const BigNumber = require('bignumber.js')
const { contractName, deployedAddress, deployPrams } = require("./_config");
const {
  abi,
} = require("../../artifacts/contracts/FruttiDinoNFT.sol/FruttiDinoNFT.json");

async function main() {
  console.log(`starTT!`);
  const lastestBlock = await utils.ethers.provider.getBlockNumber();
  const eventNames = abi
    .filter((item) => item.type === "event")
    .map((item) => item.name);
  for (const evtName of eventNames) {
    const log = await utils.eventFromAbi(
      deployedAddress,
      abi,
      evtName,
      lastestBlock - 5000 + 1,
      lastestBlock
    );
    console.log(`==================== ${evtName} ====================`);
    console.log(log);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
