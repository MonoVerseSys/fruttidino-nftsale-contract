// const HdAddGen = require("hdaddressgenerator");
// // const { mnemonic } = require("./secrets.json");
// // const { mnemonics } = require("./test2");
// // console.log(`mnemonics: ${mnemonics}`);
// let bip44 = HdAddGen.withMnemonic('', false, "ETH");
// const ethers = require('ethers')
const main = async () => {
  // let addresses = await bip44.generate(10);
  //   console.log(addresses);
  // addresses.forEach((address) => {
  //   console.log(address.path, address.address, address.pubKey, address.privKey);
  // });

  const a = await ethers.provider.getTransaction(
    '0x2fcbc2064d4811db90dd99802ba2bf5aa72c01cb48ab18222305731a1e9e7078'
  )
  console.log(a, a.value.toHexString())
  try {
      let code = await ethers.provider.call(a, a.blockNumber)
      console.log(code)
      let reason = ethers.utils.toUtf8String('0x' + code.substring(138))
      console.log(`reason:${reason}:`)
  } catch (err) {
      console.log(err)
  }


};

main();
