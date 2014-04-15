/*
 * Method for execution of all the test cases defined in the
 * application. This method will call every method defined with the
 * same name in the sub-name-spaces.
 */
Pseudo.StartUnitTest = function()
{
	Pseudo.StartUnitTest.Logging = true;
	
	Pseudo._log("");
	Pseudo._log("*** Unit test started ***");
	Pseudo._log("Start Unit Test of Pseudo name-space.");
	
	Pseudo._log("Collect unit test methods");
	
	try{
		
		// Empty array for test-cases
		var testCases = [];
		
		// Define test case of the main namespace
		function MainTestCase()
		{
			function test_CreateTestApp()
			{
				//this.getTestObject();
			
				Pseudo.StartUnitTest.App =
					Pseudo.Init(function(e){Pseudo.StartUnitTest.Result = e;});
					
				jsUnity.assertions.assertNotUndefined(Pseudo.StartUnitTest.App, 
					"Unable to create test application!");
			};
			
			function test_temp()
			{
				//this.getTestObject();
			}
		};
		
		// Collect every test-case
		testCases = testCases.concat(MainTestCase);
		testCases = testCases.concat(this._findMethods(Pseudo, /^StartUnitTest$/));
		
		Pseudo._log("Total number of found testcases: " + testCases.length);
		Pseudo._log("*** Unit test started ***");
		
		// Define log method for jsUnity
		jsUnity.log = function(msg)
		{
			if (Pseudo.StartUnitTest.Logging)
				console.log(msg);
		};
		
		var totalPassed = 0;
		var totalFailed = 0;
		var failedTests = [];
		
		// Start the test
		Pseudo.Options.Log.DisableAll();
		for (var i=0; i<testCases.length; i++)
		{
			var actualTestCase = testCases[i];
			if (typeof actualTestCase === "function")
			{
				result = jsUnity.run(actualTestCase);
				totalPassed += result.passed;
				totalFailed += result.failed;
				failedTests.push(actualTestCase);
			}
		}
		Pseudo.Options.Log.EnableAll();
		
		Pseudo._log("*** Total Passed: " + totalPassed + " ***");
		Pseudo._log("*** Total Failed: " + totalFailed + " ***");
		
		alert("*** Total Failed: " + totalFailed + " ***");
		
		if (totalFailed > 0)
		{
			return false;
		}
		
		return true;
	}catch(e){
		Pseudo._log("!X! ERROR: " + e.message);
		return false;
	}
}