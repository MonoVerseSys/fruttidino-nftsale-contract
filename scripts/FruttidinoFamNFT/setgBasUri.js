const utils = require("../utils");
const delay = require("delay");
const { v4  }  = require("uuid")


const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const { ethers } = require("ethers");

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const tx = await c.setBaseURI('https://www.fruttidino.com/')
  console.log(tx);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
