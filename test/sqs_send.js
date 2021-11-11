const AWS = require("aws-sdk");
// https://docs.aws.amazon.com/general/latest/gr/sqs-service.html
AWS.config.update({
  accessKeyId: "AKIATTDOIGFNUO53JLAM",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});
const sqs = new AWS.SQS();

const params = {
  MessageAttributes: {
    Title: {
      DataType: "String",
      StringValue: "The Whistler",
    },
    Author: {
      DataType: "String",
      StringValue: "John Grisham",
    },
    WeeksOn: {
      DataType: "Number",
      StringValue: "6",
    },
  },
  MessageBody:
    "Information about current NY Times fiction bestseller for week of 12/11/2016.",
  QueueUrl:
    "https://sqs.ap-northeast-2.amazonaws.com/247191843163/fruttidino_nft_sale",
};

sqs.sendMessage(params, function (err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.MessageId);
  }
});
