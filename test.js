const HdAddGen = require("hdaddressgenerator");
const { mnemonic } = require("./secrets.json");

let bip44 = HdAddGen.withMnemonic(mnemonic, false, "ETH");
const main = async () => {
  let addresses = await bip44.generate(10);
  //   console.log(addresses);
  addresses.forEach((address) => {
    console.log(address.path, address.address, address.pubKey, address.privKey);
  });
};

main();
