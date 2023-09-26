//This util will provide the method to publish the pact to the pactflow using pact-broker.bat's publish command
const { exec } = require("child_process");//needed to execute the bat file commands
// Function to run the pact-broker command that takes an object having the command parameters
function publishToPactBroker(obj) {
  //store the command in the pactBrokerCommand variable 
  const pactBrokerCommand = `${obj.exeFile} publish ${obj.pactFilePath} --consumer-app-version ${obj.consumerAppVersion} --branch main --tag 1.0.0.0 --broker-base-url ${obj.brokerBaseUrl} --broker-token ${obj.brokerToken}`;
  //execute the command using exec method that allows to execute the shell command
  exec(pactBrokerCommand, (error, stdout, stderr) => {
    if (error) { //if there is an error while execution of the command
      //log the error message 
      console.error(`Error: ${error.message}`);
      return;
    }
    //log the standard output which may print the information of the command result
    console.log(`stdout: ${stdout}`);
  });
}

module.exports = {
  publishToPactBroker
};

