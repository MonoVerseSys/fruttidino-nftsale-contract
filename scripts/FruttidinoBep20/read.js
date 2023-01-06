const utils = require("../utils");
const readline = require('readline');

const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const { ethers } = utils;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', (line) => {
    console.log(line);
})



async function main() {
  const minterRole = ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes("MINTER_ROLE")
    );
    const defaultAdminRole =  '0x0000000000000000000000000000000000000000000000000000000000000000'

    console.log(`minterRole: ${minterRole}`)
    console.log(`defaultAdminRole: ${defaultAdminRole}`)
    const c = await utils.attach({ contractName, deployedAddress });
    // const result = await c.totalSupply();
    // console.log(result);
    // const signers = await utils.singers()
    // const r = await c.balanceOf(signers[0].address)
    // console.log(ethers.utils.formatEther(r));

    // const rol1 =  await c.hasRole(minterRole, signers[0].address)
    // console.log(`rol1:, ${rol1}`)

    // const rol2 =  await c.hasRole(minterRole, '0x58B8654999d49f847404D71336b12aEe5Fdc6b41')
    // console.log(`rol2, ${rol2}`)

    const results = await c.queryFilter(c.filters.Transfer(), 23917292, 23917292);
    console.log(results)
    // const rol2 = await c.hasRole(defaultAdminRole, signers[0].address)
    // console.log(`rol2:, ${rol2}`)

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
