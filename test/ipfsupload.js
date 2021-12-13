const fleekStorage = require("@fleekhq/fleek-storage-js");
const path = require("path");
const fs = require("fs");
const apiKey = "Z/4pm+AEMssSftRDx+7Zkw==";
const apiSecret = "3GkhnoUU7OLTJtzhQL7GhljZEHBosbbsnRlAKJQ6ji0=";
const fileKey = "1.png";
// const myFile = await fleekStorage.get({
//   apiKey: "Z/4pm+AEMssSftRDx+7Zkw==",
//   apiSecret: "3GkhnoUU7OLTJtzhQL7GhljZEHBosbbsnRlAKJQ6ji0=",
//   key: "1",
//   getOptions: ["data", "bucket", "key", "hash", "publicUrl"],
// });
const filePath = path.join(__dirname, "..", "src/complete/1.png");
fs.readFile(filePath, async (error, fileData) => {
  const uploadedFile = await fleekStorage.upload({
    apiKey: apiKey,
    apiSecret: apiSecret,
    key: fileKey,
    data: fileData,
    httpUploadProgressCallback: (event) => {
      console.log(Math.round((event.loaded / event.total) * 100) + "% done");
    },
  });

  console.log(uploadedFile);
});
