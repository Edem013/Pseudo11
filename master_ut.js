/*
 * Method for execution of all the test cases defined in the
 * application. This method will call every method defined with the
 * same name in the sub-name-spaces.
 */
Pseudo.StartUnitTest = function()
{
	Pseudo.StartUnitTest.Logging = false;
	
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
			function setUp()
			{
				Pseudo.StartUnitTest.Result = "";
			};
			
			function test_CreateTestApp()
			{
				//this.getTestObject();
			
				Pseudo.StartUnitTest.App =
					Pseudo.Init(function(e){Pseudo.StartUnitTest.Result += "" + e;});
					
				jsUnity.assertions.assertNotUndefined(Pseudo.StartUnitTest.App, 
					"Unable to create test application!");
			};
			
			function test_9_1_4_Eratosztenesz()
			{
				Pseudo.StartUnitTest.App.ClearVariables();
				Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
				Pseudo.StartUnitTest.App.AddVariable("p","p","Integer",{i: false, m:true, o: false});
				Pseudo.StartUnitTest.App.AddVariable("a","a","Boolean",{i: false, m:true, o: false}, 10);
				Pseudo.StartUnitTest.App.Run(
					"for I <- 2, 10\n" +
					"  A[I] <- igaz\n" +
					"for P <- 2, 10\n" +
					"  if A[P] = igaz\n" +
					"    for I<- 2*P, 10, P\n" +
					"      A[I] <- hamis\n" +
					"For I <- 2, 10\n" +
					"  if A[I] = igaz\n" +
					"    if I <> 2\n" +
					"      KI: \", \"\n" +
					"    Ki: I"
				, "");
				Pseudo.Options.Log.DisableAll();
				jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "2, 3, 5, 7", "");
			};
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
		
		var results = "*** Total Passed: " + totalPassed + " ***\n" +
					  "*** Total Failed: " + totalFailed + " ***";
		
		Pseudo._log(results);
		
		alert(results);
		
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