const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const minter =  (await utils.singers())[0].address;
  console.log(minter);

  const cap = utils.ethers.utils.parseUnits("1000000000", "ether").toString();
  console.log(`cap: ${cap}`);

  const result = await utils.deployProxy({ contractName, deployPrams: [ cap, '0x677d8a47D009227368b96BeB98c7d7a9123E1FE0' , minter ] });

  // const result = await utils.deployProxy({ contractName, deployPrams: [ cap, minter , minter ] });
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
