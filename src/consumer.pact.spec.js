const { Pact } = require("@pact-foundation/pact"); //extract the Pact property from pact module provided by pact-foundation organisation scope
const axios = require("axios"); //import to make the HTTP requests
const {before, after, describe, it } = require("mocha"); // Import mocha functions to be used in pact spec
const chai = require("chai"); // Import Chai assertion library for result verification
const chaiAsPromised = require("chai-as-promised"); // Import entire chai-as-promised for handling async assertions
const { publishToPactBroker } =require("./publishPactUtil")//to pubish pact
const { Broker } = require('../brokerDetails');//to get the broker details

// Initialize Chai
chai.use(chaiAsPromised);// use chaiAsPromised for using async-await/promises in chai assertions
const expect = chai.expect;//store chai's expect in const

const mockProvider = new Pact({
  consumer: "singleEmpDetails", // Consumer Name
  provider: "allEmployees", // Provider Name
  timeout: 30000, 
});
process.env.PACT_FILE_WRITE_MODE = 'update'; //to provide customized pact generation path
// Start the mock service
before(async () => {
    await mockProvider.setup();
  });

// Define the contract
describe("API Request - Get Employee", () => {
  it("should return employee details for employee ID 1", async () => {
    // Define the expected response from the provider
    const expectedResponse ={
        "status": "success",
        "data": {
            "id": 1,
            "employee_name": "Tiger Nixon",
            "employee_salary": 320800,
            "employee_age": 61,
            "profile_image": ""
        },
        "message": "Successfully! Record has been fetched."
    };
    // Create the interaction for the HTTP request using mockprovider
    await mockProvider.addInteraction({
      state: "An employee with ID 1 exists", //Provider state before making request
      uponReceiving: "a request to get employee details for ID 1", // More details on the request
      //request will have below details 
      withRequest: { 
        //Request type is GET
        method: "GET",
        //endpoint to be appended the base API 
        path: "/api/v1/employee/1",
      }, 
      //response expected by the client on making above request 
      willRespondWith: {
        //status to be 200 
        status: 200,
        //header to be json 
        headers: { "content-type": "application/json" },
        //body to be same as expectedResponse variable 
        body: expectedResponse,
      },
    }); //end add interaction
    
    // Make the actual API request to the provider using axios lib by passing the full endpoint
    const response = await axios.get("https://dummy.restapiexample.com/api/v1/employee/1");
    //print the logs
    console.log("This is printed for log purpose: ", response)
    console.log('***************************************')
    console.log('Response Headers:', response.headers);
    
    // Perform your assertions on the response here
    //1. Check the response status to be 200
    expect(response.status).to.equal(200);
    //2. Check the response data to be same as expected
    expect(response.data).to.deep.equal(expectedResponse);
    //3. check the header details to be expected
    expect(response.headers.get("Content-Type")).to.include("application/json");

  }); //end it section
});//end describe section
//Once the execution is done, close the mock provider, write the pact and publish it to the broker
after(async () => {
  //finalize the mock provider to write the pack 
    await mockProvider.finalize();  
    // Write the generated Pact file 
    await mockProvider.writePact();
    //Call the function to publish the pact using pact broker
    publishToPactBroker(Broker.brokerObj);
});