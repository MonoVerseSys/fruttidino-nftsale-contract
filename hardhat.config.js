require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
const { infuraKey, mnemonic, hodongM, mnemonicMultiTransfer, etherScanKey, mnemonicBridgeOwner } = require("./secrets.json");
// fdt deploy mnemonicBridgeOwner
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  // for(let i=0;i<20;i++) {
    
  //   const wallet = hre.ethers.Wallet.fromMnemonic(mnemonic, `m/44'/60'/0'/0/${i}`)

  //   const balance = await ethers.provider.getBalance(wallet.address);

  //   console.log(wallet.address, wallet.privateKey, ethers.utils.formatEther(balance))
  // }

  const accounts = await hre.ethers.getSigners();

  for (const [i, account] of accounts.entries()) {
    // console.log(account);

    const balance = await ethers.provider.getBalance(account.address);
    // const wallet = hre.ethers.Wallet.fromMnemonic(test, `m/44'/60'/0'/0/${i}`)
    // console.log(account)
    console.log(account.address, ethers.utils.formatEther(balance) + "bnb");
    // wallet.pri
  }
})

task("transfer", "transfer bnb", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  const txObj = await accounts[0].sendTransaction({
    to: '0x6fF19028DC69c40ca87e2f15D9B3945b9E81F8aa',
    value: hre.ethers.utils.parseEther('0.02')
  });
  console.log(txObj);

})
//0xfe64b87d38f6d24a98ea668148ac9b0653d04547
// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  optimizer: {
    enabled: true,
    runs: 1,
  },
  networks: {
    bsctest: {
      url: `https://data-seed-prebsc-1-s3.binance.org:8545/`,
      // url : `https://data-seed-prebsc-1-s1.binance.org:8545`,
      // accounts: { mnemonic: mnemonicMultiTransfer },
      accounts: { mnemonic: mnemonic }, 
      gas: "auto",
      gasPrice: "auto",
    },
    bsc: {
      url: `https://bsc-dataseed1.binance.org/`,
      // url: 'https://rpc.ankr.com/bsc',
      // url: 'https://bscrpc.com',
      // accounts: { mnemonic: mnemonicMultiTransfer },
      accounts: { mnemonic: mnemonicBridgeOwner }, // erc20 owner
      // accounts: { mnemonic: mnemonic }, // nft owner
      // accounts: { mnemonic: hodongM },
      gas: "auto",
      gasPrice: "auto",
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraKey}`,
      accounts: { mnemonic: mnemonic },
      gas: "auto",
      gasPrice: "auto",
    },
    eth: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      accounts: { mnemonic: mnemonic },
      gas: "auto",
      gasPrice: "auto",
    },
    entropy: {
      url: 'http://alb-chain-stage-edge-1070023354.ap-southeast-1.elb.amazonaws.com',
      accounts: { mnemonic: mnemonic },
      gas: "auto",
      gasPrice: "auto",
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: etherScanKey,
  },
};
