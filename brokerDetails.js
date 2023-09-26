//This class contains the details of the broker which will publish the pact to packflow
const path = require('path');

class Broker {
    static brokerObj = {
        //path to pack-broker.bat file 
    exeFile : path.join(__dirname , 'src', 'pact', 'bin', 'pact-broker.bat'),
    //the version to be displayed at broker
    consumerAppVersion: "1.0.0",
    //path to the pact file 
    pactFilePath: path.join(__dirname, 'pacts', 'singleEmpDetails-allEmployees.json'),
    //pactflow base URL
    brokerBaseUrl:"https://testingpurpose.pactflow.io",
    //pactflow broker user authentication token
    brokerToken:"zh3kpPyGttRKvzSJtbT10g",
    }//end object
}//end class
module.exports = { Broker };//export class