const moment = require('moment')
const utils = require("../utils");

const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const { ethers } = utils;

const mint = async() => {
  // const user =  (await utils.singers())[0].address;
  const user = '0xED22C760846af30fC50735181D9d71c8Efdb83D0'
  const amt = ethers.utils.parseEther('1000000')
  const c = await utils.attach({ contractName, deployedAddress })
  const result =  await c.mint(user, amt)
  console.log(result)
}
const transferBsc = async() => {
  const signers =  await utils.singers();

  const tx = await signers[0].sendTransaction({
    to: signers[1].address,
    value: ethers.utils.parseEther("0.25")
  });
  console.log(tx);

}
const transfer = async() => {
  // const user =  (await utils.singers())[1].address;
  const fromIdx = 1;
  const toIdx = 2;

  const signers = await utils.singers()


  const amount = utils.ethers.utils.parseUnits("1", "ether").toString();


  const _c = await utils.attach({ contractName, deployedAddress });
  const [c] = await utils.connectToSigner(_c, fromIdx)
  const result =  await c.transfer(signers[toIdx].address, amount)
  console.log(result);
}

const lock = async() => {
  const target =  (await utils.singers())[1].address;
  const unixTimestamp = moment().add(2, 'minutes').unix()

  const c = await utils.attach({ contractName, deployedAddress });
  const result =  await c.lock(target, unixTimestamp)
  console.log(result);
}

const isLock = async() => {
  const target =  (await utils.singers())[1].address;

  const c = await utils.attach({ contractName, deployedAddress });
  const result =  await c.isLock(target)
  console.log(result);
}


async function main() {
  // await transfer();
  // await lock();
  // await isLock();
  await mint()
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
