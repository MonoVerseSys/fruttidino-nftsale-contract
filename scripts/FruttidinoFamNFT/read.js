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
  const singers = await utils.singers();
  const uri = await  c.tokenURI(2)
  console.log(uri);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
