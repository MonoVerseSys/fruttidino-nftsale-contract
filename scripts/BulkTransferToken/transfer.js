const utils = require("../utils");
const BigNumber = require("bignumber.js")
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");
const {data} = require('./data')
const delay = require('delay');
const { ethers } = require("hardhat");


// bsc 0x1cAdb7e0f17DF0CCC668757bf3a43b8582F5F526 
async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const token = '0x3a599e584075065eAAAc768D75EaEf85c2f2fF64' // bsc main net
  const signers = await utils.singers()
  const owner = signers[0]


  let totalAmt = ethers.BigNumber.from(0)
  let receivers = []
  let amounts = []



  data.forEach(item => {

    let [ receiver, amount ] = item
    receivers.push(receiver)
    const amountBN = ethers.utils.parseEther(amount)
    amounts.push(amountBN.toString())
    totalAmt = totalAmt.add(amountBN)
  })

  if(receivers.length !== amounts.length) {
    console.error(`error!`, '데이터 오류. 사이즈 확인 ', receivers.length, amounts.length)
    return
  } else {
    console.log('data size ok ', receivers.length)
  }

  
  const fdt = await ethers.getContractAt('ERC20', token, owner)

  const allowance = await fdt['allowance(address,address)'](owner.address, deployedAddress)
    console.log(`allowance : ${ ethers.utils.formatEther(allowance) },  ${ethers.utils.formatEther(totalAmt)}`)
    if(allowance.lt(totalAmt)) {
     
      console.log(' req approve: ', ethers.utils.formatEther(totalAmt))
      const receipt = await fdt['approve(address,uint256)'](deployedAddress, totalAmt.toString())
      console.log(`approve receipt : `, receipt)
      const tx = await receipt.wait()
      console.log(`approve tx : `, tx)

    }

  const totalCount = receivers.length

  // console.log(receivers, amounts, totalCount)

  const bulkSize = 40

  let sendDataReceivers = []
  let sendDataAmounts = []

  for(let [i, v] of receivers.entries()) {
    sendDataReceivers.push(v)
    sendDataAmounts.push(amounts[i])

    if(totalCount - 1 === i || sendDataReceivers.length === bulkSize) {

      console.log(`${token}, ${owner.address}`, sendDataReceivers, sendDataAmounts)
      const receipt = await c.multipleTransfer(token, owner.address, sendDataReceivers, sendDataAmounts)
      const tx = await receipt.wait()
      console.log(tx)
      sendDataReceivers = []
      sendDataAmounts = []
    }
  }

  console.log(`total amt : ${ethers.utils.formatEther(totalAmt)}`)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
