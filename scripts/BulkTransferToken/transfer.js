const utils = require("../utils");
const BigNumber = require("bignumber.js")
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const {data} = require('./data')
const delay = require('delay')
// bsc 0x1cAdb7e0f17DF0CCC668757bf3a43b8582F5F526 
async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const token = '0x3a599e584075065eAAAc768D75EaEf85c2f2fF64' // bsc main net
  const accounts = await utils.singers()
  const from = accounts[0].address
  let receivers = data.map(item => item[0])
  let amounts = data.map(item => new BigNumber(item[1]).times(1e18).toFixed())
  
  const totalCount = receivers.length

  console.log(receivers, amounts, totalCount)

  const bulkSize = 50

  let sendDataReceivers = []
  let sendDataAmounts = []

  for(let [i, v] of receivers.entries()) {
    sendDataReceivers.push(v)
    sendDataAmounts.push(amounts[i])

    if(totalCount - 1 === i || sendDataReceivers.length === bulkSize) {

      // sendDataAmounts = sendDataAmounts.map(item => new BigNumber(item).times(1e18).minus(item).toFixed())
      // console.log(sendDataAmounts)
      console.log(`${token}, ${accounts[0].address}`, sendDataReceivers, sendDataAmounts)
      const receipt = await c.multipleTransfer(token, accounts[0].address, sendDataReceivers, sendDataAmounts)
      const tx = await receipt.wait()
      console.log(tx)
      sendDataReceivers = []
      sendDataAmounts = []
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
