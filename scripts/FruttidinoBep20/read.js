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
  const c = await utils.attach({ contractName, deployedAddress });
  const result = await c.totalSupply();
  console.log(result);

  // const rol1 =  await c.hasRole(minterRole, '0x58b8654999d49f847404d71336b12aee5fdc6b41')
  // console.log(`rol1, ${rol1}`)

  // const rol2 =  await c.hasRole(minterRole, '0x677d8a47D009227368b96BeB98c7d7a9123E1FE0')
  // console.log(`rol2, ${rol2}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
