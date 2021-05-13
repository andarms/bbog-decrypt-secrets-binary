const { exec } = require("child_process");
const path = require("path");

exports.handler = async function (event, context) {
  const data = await getSecrets();
  return data;
};

function getSecrets() {
  const command = `bbog-dig-secret-decrypt --region sa-east-1 --cmk ${process.env.AWS_CMK_ARN} --json "{ ARMS: ${process.env.ARMS}" }`;
  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }

      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);

      resolve(stdout);
    });
  });
}
