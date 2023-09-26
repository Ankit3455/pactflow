const { Verifier } = require('@pact-foundation/pact');

describe("Pact Verification ", () => {
  it("Validates the expectations of Matching Service", () => {
    //setup the provider options
    const opts = {
      provider: 'allEmployees', //Name of the provider(cofnigured in contract)
      pactBrokerToken:"zh3kpPyGttRKvzSJtbT10g", //pact broker API token(authentication)
      providerBaseUrl: 'https://dummy.restapiexample.com', //API (provider)
      pactUrls: [
        "https://testingpurpose.pactflow.io/pacts/provider/allEmployees/consumer/singleEmpDetails/version/1.0.0"
      ],
      timeout: 100000,
      publishVerificationResult: true,
      providerVersion: "1.0.0",      
    };
    //create asyn method for verification
    async function runPactVerification() {
      try {
        // Perform the Pact verification
        await new Verifier(opts).verifyProvider();
        console.log("Employee matched based on contract!");
        // If the Promise resolves without errors, the exit code will be 0
        process.exit(0);
      } catch (error) {
        console.error("Pact Verification Error:", error);
        // If there was an error, the exit code will be non-zero
        process.exit(1);
      }
    }
    // Start the verification process by calling the method created above
    runPactVerification();
  })
})
