const HdAddGen = require("hdaddressgenerator");
// const { mnemonic } = require("./secrets.json");
// const { mnemonics } = require("./test2");
// console.log(`mnemonics: ${mnemonics}`);
let bip44 = HdAddGen.withMnemonic('', false, "ETH");

const main = async () => {
  let addresses = await bip44.generate(10);
  //   console.log(addresses);
  addresses.forEach((address) => {
    console.log(address.path, address.address, address.pubKey, address.privKey);
  });


};

main();
