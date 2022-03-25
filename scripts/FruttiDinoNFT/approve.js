const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
  const c = await utils.attach({ contractName, deployedAddress });
  const singers = await utils.singers();
  const result = await c.setApprovalForAll(
    "0x1085924BBA87EE5818B38909B892E38583d37204",
    true
  );  // bulk transfer contract에 권한을 준다 .
  console.log(result);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
