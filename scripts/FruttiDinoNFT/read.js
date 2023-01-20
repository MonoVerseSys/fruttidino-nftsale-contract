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
  const defaultAdminRole =  '0x0000000000000000000000000000000000000000000000000000000000000000'

  // console.log(ethers.utils.toUtf8Bytes(""))

  const c = await utils.attach({ contractName, deployedAddress });
  const result = await c.tokenURI(55);
  console.log(result);

  // const totalSupply = await c.totalSupply();
  // console.log(totalSupply.toNumber());

  // const result2 = await c.tokenIdFromDinoId("00af2c49-168c-4da9-9d99-0ddf8fa70c6bdd");
  // console.log(result2);
    
  const [signer] = await utils.singers()
  console.log(signer.address)
  const rol1 =  await c.hasRole(minterRole, signer.address)
  console.log(`rol1, ${rol1}`)

  const rol2 =  await c.hasRole(defaultAdminRole, signer.address)
  console.log(`rol2, ${rol2}`)


  // const rol2 =  await c.hasRole(minterRole, '0x677d8a47D009227368b96BeB98c7d7a9123E1FE0')
  // console.log(`rol2, ${rol2}`)

  // const a = await c.ownerOf(3015)
  // console.log('own of ', a)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
