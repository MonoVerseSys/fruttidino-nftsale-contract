
const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const { ethers } = utils;
const BigNumber = require('bignumber.js')

async function main() {
    const addrs = [
        '0xe8270e58c8f4dC383e3b560268B8a9a396E27A5e']

    const amts = [
        '269000'
    ]
    console.log(addrs.length, amts.length)
    const timeStamps = []
    addrs.forEach(item => {
        timeStamps.push('1703084400')
    })
    const c = await utils.attach({ contractName, deployedAddress });
    // for(let i=0;i<1;i++) {

    //     const addr = addrs[i]
    //     const amt = amts[i]
    //     const time = timeStamps[i]
    //     const sendBN = new BigNumber(amt).times(1e18)
    //     const send = sendBN.toFixed()

    //     console.log(addr, send);

    //     const result = await c.allocation(addr, send, time);
    //     console.log(result);
    // }
    // console.log(addrs)
        const addr = addrs[0]
        const amt = amts[0]
        const time = timeStamps[0]
        const sendBN = new BigNumber(amt).times(1e18)
        const send = sendBN.toFixed()

        console.log(addr, send);

        const result = await c.allocation(addr, send, time);
        console.log(result);


    
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

