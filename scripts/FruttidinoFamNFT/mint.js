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
  
  // const tx = await c.mint(
  //   singers[0].address
  // );

  // console.log(tx)

  const target = [
    // '0x81962D9324B1b51F03AfB35916b46Bd0f1Cd7fDA',
    '0x56614D88AD50236A3eb53e8003AD0503f3d6F00d',
    '0xb09090CC54b5341c89d46c5202309463986aB44E',
    '0x01C9434E117B14F518d372D25FF4c44fc4FCEd2E',
    '0x147A58EaAaa9a8424e012998CC9bcBfDCFB8047E',
    '0x5Acbc9922De9bfd44AFEcE0B406949D56FAde245',
    '0xA6D3019730c77A5dD83B2A1e75BF55B1b33d6d42',
    '0xd7463769c802e4814574e6F7F7c9f952Cce020B3',
    '0xE476d74e512fBB92d4196c71F47072678ad6703D',
    '0x5D9443EfEdAFA0B69046013e8B6d30Ea54b2bD46',
    '0xF0bF5740e630e90ff08f454902927ee7857D6497',
    '0xfdc79905818Aa8e0ff637c2627C98B1E8B5A54b5',
    '0xe391aD4B3F33DCc7D335BEC08E67DCf4d74FfBC3',
    '0x4722a4dc3671b99a48cc6a1d46fa1191f54bc780',
    '0xfa5751E4bF8491712BC4dA6341e56Cb4D5cC444d',
    '0x9825e7480e8cFe5848142Dd9cA674F193ab316ED',
    '0x93B04988971808DdEA18890b8b28b516fAb8AE2E',
  ]


  for(let addr of target) {
    const tx = await c.mint(addr);
    console.log(tx);
    const receipt = await  tx.wait()
    console.log(receipt);
  }



  // const tx1 = await c.transferFrom(singers[0].address, singers[1].address, 1)
  // console.log(tx1);

    
  
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
