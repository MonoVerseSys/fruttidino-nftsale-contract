const utils = require("../utils");
const uuid = require('uuid');
const { ethers } = utils
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const signers = await utils.singers();
  
  const datas = []
  const lastesTokenid =  await c.getLatestTokenId()
  const addValue = ethers.BigNumber.from('1')

  let nftId = lastesTokenid

  for(let i=0; i<10; i++) {
    nftId = nftId.add(addValue)

    datas.push({
      receiver: signers[i].address,
      nftId: nftId.toString(),
      dinoId: uuid.v4()
    })
  }

  console.log(datas)
  
  const result = await c.batchMintDino(
    datas.map(item => item.receiver),
    datas.map(item => item.nftId),
    datas.map(item => item.dinoId)
  );
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
