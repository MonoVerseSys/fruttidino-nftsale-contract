require("dotenv").config();
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
const { infuraKey, mnemonic, mnemonicMultiTransfer, etherScanKey, mnemonicBridgeOwner } = require("./secrets.json");
// fdt deploy mnemonicBridgeOwner
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    // console.log(account);

    const balance = await ethers.provider.getBalance(account.address);

    console.log(account.address, ethers.utils.formatEther(balance) + "bnb");
  }
})

task("transfer", "transfer bnb", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  const txObj = await accounts[0].sendTransaction({
    to: '0x77A94De39C859cb4D3a667130A91337d39a9DE82',
    value: hre.ethers.utils.parseEther('0.5')
  });
  console.log(txObj);

})

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
      url: `https://data-seed-prebsc-1-s1.binance.org:8545/`,
      // accounts: { mnemonic: mnemonicMultiTransfer },
      accounts: { mnemonic: mnemonic },
      gas: "auto",
      gasPrice: "auto",
    },
    bsc: {
      url: `https://bsc-dataseed.binance.org/`,
      // accounts: { mnemonic: mnemonicMultiTransfer },
      accounts: { mnemonic: mnemonicBridgeOwner }, // erc20 owner
      // accounts: { mnemonic: mnemonic },
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
