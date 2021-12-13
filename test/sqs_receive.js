const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");
const delay = require("delay");

AWS.config.update({
  accessKeyId: "AKIATTDOIGFNUO53JLAM",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});
const qUrl =
  "https://sqs.ap-southeast-1.amazonaws.com/247191843163/fdt-nft-event-testnet-hdtest.fifo";
// const qUrl =  'https://sqs.ap-southeast-1.amazonaws.com/247191843163/fdt-nft-ipfs-testnet'
const app = Consumer.create({
  queueUrl: qUrl,
  handleMessage: async (message) => {
    try {
      // console.log(message);
      console.log(JSON.parse(message.Body));
      // await delay(1000 * 10);
    } catch (err) {
      console.error(err);
    }

    console.log(`complete!!!!!`);
  },
  sqs: new AWS.SQS(),
  attributeNames: ["All"],
  messageAttributeNames: ["Title", "Author", "WeeksOn"],
});

app.on("error", (err) => {
  console.error(err.message);
});

app.on("processing_error", (err) => {
  console.error(err.message);
});

app.on("timeout_error", (err) => {
  console.error(err.message);
});

app.start();
