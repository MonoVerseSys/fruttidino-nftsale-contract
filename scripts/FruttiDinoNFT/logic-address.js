const utils = require("../utils");
const { deployedAddress } = require("./_config");
const ethers = utils.ethers;
async function main() {
  const topic = ethers.utils.id(`Upgraded(address)`);
  console.log(`topic: ${topic}`);

  const interface = new ethers.utils.Interface([
    "event Upgraded(address indexed implementation)",
  ]);

  let filter = {
    address: deployedAddress,
    fromBlock: 21184170 ,
    toBlock: 21184170, //"latest",
    topics: [topic],
  };

  let logs = await ethers.provider.getLogs(filter);
  logs.map((l) => {
    const row = interface.parseLog(l);
    console.log("-----------logic address----------");
    console.log(row.args.implementation);
  });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
