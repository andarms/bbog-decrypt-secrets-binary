const execFile = require("child_process").execFile;
exports.handler = async function (event, context) {
  const data = await getSecrets();
  return data;
};

function getSecrets() {
  const params = [
    "--region",
    "sa-east-1",
    "--cmk",
    process.env.AWS_CMK_ARN_ID,
    "--json",
    JSON.stringify({ ARMS: process.env.ARMS }),
  ];
  let promise = new Promise((resolve, reject) => {
    execFile("./aws-decrypt", params, null, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
  return promise;
}
