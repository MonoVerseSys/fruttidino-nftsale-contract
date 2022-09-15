const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const amount = utils.ethers.utils.parseEther('4029').toString()
  const bulkTransferCa = '0x1cAdb7e0f17DF0CCC668757bf3a43b8582F5F526'

  console.log(amount)
  const result = await c.approve(
    bulkTransferCa,
    amount
  );  // bulk transfer contract에 권한을 준다 .
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
