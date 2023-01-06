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
  let run = 0

  const target = [
    '0x3236ed421a931f1c7b849e200555fb70dd13f475',
    // '0xc51f119802b9d1c63f9aa1274aaa790d4f5dc837',
    // '0xaa06151d207039b9ca9d107b0d971336431b8390',
    // '0x7db295df1ace11e45582128a0f5991b9399622f4',
    // '0x07bbbf17f1e86e6a886ec8742385da56f80a0649',
    // '0x1d9d56ac5aea4f45d7ea46b065aca532ff9bc811',
    // '0xa0eb2bf835d99abee1ec0cdf4de9fe16d35c21cc',
    // '0x38b43b8aa04d79a74bb574628d96e0c28d370ab2',
  ]
  do {
    
    try {

      for(let i=1;i<=20;i++) {
        const tx = await c.mint(
          target[run],
          i,
          v4()
        );
          console.log(tx)
          const receipt = await tx.wait()
          console.log(receipt, '-->', i)
          
      }
      run++
    } catch(e) {
      console.error(e)
    }
    
  } while(run < target.length)
  
    
  
  // console.log(result);
  // const k = null
  // const a =  ethers.BigNumber.from('0').add(k || 43243).toString()
  // console.log(a)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
