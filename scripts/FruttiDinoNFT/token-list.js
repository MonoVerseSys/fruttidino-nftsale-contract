const utils = require("../utils");
const {
  contractName,
  deployedAddress,
  deployPrams,
} = require("./_config.json");

async function main() {
    const signers = await utils.singers();
    let _c = await utils.attach({ contractName, deployedAddress: '0x60bA8Ed7cbE095FE7f47b4a70C1d92a2878DAE71' });
    // const result = await c.tokenURI(1);
    // console.log(result);
    const signer = utils.ethers.Wallet.fromMnemonic('fossil know echo wide robot very leader ramp foil field pizza argue')
    console.log(signer.privateKey)
    const [c] = await utils.connectToWallet(_c, signer.privateKey)
    // console.log(c)
    const owner = signer.address
    const count = await c.balanceOf(owner)
    const len = parseInt(count.toString(), 10)
    const tokenIds = []
    console.log(`owner: ${owner}, len: ${len} `)
    for(let i = 0; i < len; i++) {
      const tokenId = await c.tokenOfOwnerByIndex(owner, i)
      tokenIds.push(tokenId.toString())
    }

    
    for(let i = 0; i < tokenIds.length; i++) {
      let isFailed = false
      do {
        try {
          if(isFailed) {
            console.log(`retrying ${i}`)
          }
          const tokenId = tokenIds[i]
          console.log(`tokenId: ${tokenId}`)
          const receipt = await c.transferFrom(owner, '0xCb3F7F25c3d7Bc21b1253daA4bbD052385B233e7', tokenId)
          console.log(`receipt: ${receipt.hash}`)
          const tx = await receipt.wait()
          console.log(tx, len - (i + 1), len)
  
        } catch( e) {
          console.log(`error: ${e.message}`)
          isFailed = true
        }
      } while (isFailed)
    }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
