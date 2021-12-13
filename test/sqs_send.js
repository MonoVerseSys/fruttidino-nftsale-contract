const AWS = require("aws-sdk");
// https://docs.aws.amazon.com/general/latest/gr/sqs-service.html
AWS.config.update({
  accessKeyId: "AKIATTDOIGFNUO53JLAM",
  secretAccessKey: "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",
  region: "ap-southeast-1",
});
const sqs = new AWS.SQS();

const params = {
  MessageBody: JSON.stringify({ a: "1", b: "10" }),
  QueueUrl:
    "https://sqs.ap-southeast-1.amazonaws.com/247191843163/fdt-nft-event-testnet.fifo",
  MessageGroupId: "test001",
  MessageDeduplicationId: "uniq02",
};

sqs.sendMessage(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
