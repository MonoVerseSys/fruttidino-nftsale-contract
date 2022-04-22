const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const { ethers } = utils;

async function main() {
  const lockRole = ethers.utils.keccak256(
    ethers.utils.toUtf8Bytes("LOCK_ROLE")
  );

  const c = await utils.attach({ contractName, deployedAddress });
  const singers = await utils.singers();
  
  const result = await c.grantRole(lockRole, singers[0].address);
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
