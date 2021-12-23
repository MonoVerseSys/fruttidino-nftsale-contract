const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const { ethers } = utils;

async function main() {
  const minterRole = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("MINTER_ROLE")
  );

  // const c = await utils.attach({ contractName, deployedAddress });
  // const singers = await utils.singers();
  // const result = await c.grantRole(minterRole, '0x677d8a47D009227368b96BeB98c7d7a9123E1FE0');
  // console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
