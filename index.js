const { exec } = require("child_process");
const path = require("path");

exports.handler = async function (event, context) {
  const data = getSecrets();
  return data;
};

function getSecrets() {
  const command = `bbog-dig-secret-decrypt --region sa-east-1 --cmk ${process.env.AWS_CMK_ARN} --json "{ ARMS: ${process.env.ARMS}" }`;
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return;
    }

    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);

    return stdout;
  });
}
