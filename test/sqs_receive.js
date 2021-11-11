const { Consumer } = require("sqs-consumer");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIATTDOIGFNUO53JLAM",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

const app = Consumer.create({
  queueUrl:
    "https://sqs.ap-northeast-2.amazonaws.com/247191843163/fruttidino_nft_sale",
  handleMessage: async (message) => {
    console.log(message);
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
