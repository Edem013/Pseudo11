// Method for containing automatic test cases
Pseudo.COM.CodeGenerator.StartUnitTest = function CodeGeneratorTestCase()
{	
	
	function test_AndOperator1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1=1 and 2=2 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_AndOperator2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 2 \n" +
			"IF ( 1=6 and 2=2 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");
	};
	
	function test_AndOperator3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 3 \n" +
			"IF ( 1=1 and 2=7 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");
	};
	
	function test_AndOperator4()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1=5 and 2=7 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_AndOperator5()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 5 \n" +
			"IF ( ( 1=1 and 2=2) and ( 3=3 and 4=4) )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_AndOperator6()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 2 \n" +
			"IF ( ( 1=4 and 2=2) and ( 3=3 and 4=4) )\n" + 
			"  Ki: 6",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");
	};
	
	function test_AndOperator7()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 3 \n" +
			"IF ( ( 1=1 and 2=3) and ( 3=3 and 4=4) )\n" + 
			"  Ki: 6",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");
	};
	
	function test_AndOperator8()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( ( 1=1 and 2=2) and ( 4=3 and 4=4) )\n" + 
			"  Ki: 6",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_AndOperator9()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 5 \n" +
			"IF ( ( 1=1 and 2=2) and ( 3=3 and 6=4) )\n" + 
			"  Ki: 6",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_AndOperator10()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 7 \n" +
			"IF (  1=1 and 2=2 and 3=3 and 4=4 )\n" + 
			"  Ki: 8",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_AndOperator11()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 9 \n" +
			"IF (  1=1 and 2=2 and 3=3 and 4=5 )\n" + 
			"  Ki: 10",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 9, "");
	};
	
	function test_OrOperator1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 1 \n" +
			"IF ( ( 1=1 or 2=2) or ( 3=3 or 4=4) )\n" + 
			"  Ki: 2",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");
	};
	
	function test_OrOperator2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 3 \n" +
			"IF ( ( 1=2 or 2=3) or ( 3=4 or 4=5) )\n" + 
			"  Ki: 4",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");
	};
	
	function test_OrOperator3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 5 \n" +
			"IF ( ( 1=1 or 2=3) or ( 3=4 or 4=5) )\n" + 
			"  Ki: 6",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_OrOperator4()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 7 \n" +
			"IF ( ( 1=2 or 2=2) or ( 3=4 or 4=5) )\n" + 
			"  Ki: 8",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_OrOperator5()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 9 \n" +
			"IF ( ( 1=2 or 2=3) or ( 3=3 or 4=5) )\n" + 
			"  Ki: 10",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
		
	};
	
	function test_OrOperator6()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 11 \n" +
			"IF ( ( 1=2 or 2=3) or ( 3=4 or 5=5) )\n" + 
			"  Ki: 12",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 12, "");
	};
	
	function test_OrOperator7()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 13 \n" +
			"IF ( 1=2 or 2=3 or 3=3 or 5=6 )\n" + 
			"  Ki: 14",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 14, "");
	};
	
	function test_OrOperator8()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 15 \n" +
			"IF ( 1=2 or 2=3 or 3=5 or 5=6 )\n" + 
			"  Ki: 16",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 15, "");
	};
	
	function test_AndOrOperator1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 1 \n" +
			"IF ( 1+3=2+5 or ((2+5=3+5 and 3+3=5+3) or 5+3=6+2) )\n" + 
			"  Ki: 2",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");
	};
	
	function test_AndOrOperator2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 3 \n" +
			"IF ( 1+3=2+5 or ((2+5=3+5 and 3+3=5+3) or 5+3=6+3) )\n" + 
			"  Ki: 4",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");
	};
	
	function test_AndOrOperator3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 5 \n" +
			"IF ( 1+3=2+5 or ((2+6=3+5 and 3+2+3=5+3) or 5+3=6+2) )\n" + 
			"  Ki: 6",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_ForCycle1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"J <- 0 \n" +
			"For I <- 1, 5 \n" +
			"  J <- J + 2 \n" +
			"Ki: J",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_ForCycle2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"J <- 2 \n" +
			"For I <- 1*4+J, 8 \n" +
			"  J <- J + 2 \n" +
			"Ki: J",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_ForCycle3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"J <- 3 \n" +
			"K <- 3 \n" +
			"For I <- 2*K-3, K*K-2*2 \n" +
			"  J <- J + 2 \n" +
			"  K <- K - 1 \n" +
			"Ki: J",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_ForCycle4()
	{
		//Pseudo.Options.Log.EnableAll()
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"J <- 3 \n" +
			"K <- 3 \n" +
			"For I <- 2*K-3, K*K, 3 \n" +
			"  J <- J + 2 \n" +
			"Ki: J",
			"");
		//Pseudo.Options.Log.DisableAll()
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 9, "");
	};
	
	function test_ForCycle5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"J <- 1 \n" +
			"For I <- 10, 2, -2 \n" +
			"  J <- J + 2 \n" +
			"Ki: J",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 11, "");
	};
	
	function test_ForCycle6()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"J <- 0 \n" +
			"For I <- 1, 10, J+1 \n" +
			"  J <- J + 1 \n" +
			"Ki: J",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_ForCycle7()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"J <- 0 \n" +
			"For I <- 1, 5 \n" +
			"  For K <- 1, 4  \n" +
			"    J <- J + K \n" +
			"Ki: J",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 50, "");
	};
	
	function test_ForCycle8()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"For I <- 1, 5 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_WhileCycle1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 0 \n" +
			"J <- 2 \n" + 
			"While (I < J+2) \n" +
			"  J <- J + 1 \n" +
			"  I <- I + 2 \n" +
			"Ki: J",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_WhileCycle2()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 5 \n" +
			"J <- 2 \n" + 
			"While (-5 < I) \n" +
			"  J <- J + 1 \n" +
			"  I <- I - 1 \n" +
			"Ki: J",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 12, "");
	};
	
	function test_WhileCycle3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 5 \n" +
			"J <- 2 \n" + 
			"While ( I < 5 and J = 8) \n" +
			"  J <- J + 1 \n" +
			"  I <- I + 1 \n" +
			"Ki: J",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");
	};
	
	function test_WhileCycle4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 2 \n" +
			"J <- 2 \n" + 
			"While ( I < 5 and J = 2) \n" +
			"  I <- I + 2 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_WhileCycle5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 1 \n" +
			"J <- 2 \n" + 
			"K <- 0 \n" + 
			"While (J = 2) \n" +
			"  I <- I + 2 \n" +
			"  K <- K + 1 \n" +
			"  If ( 10 < I ) \n" +
			"    J <- 3 \n" +
			"Ki: K",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_WhileCycle6()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 5 \n" +
			"K <- 0 \n" +
			"While ( I < 10 ) \n" +
			"  J <- I \n" + 
			"  I <- I + 1 \n" +
			"  While ( J < 10 ) \n" +
			"    J <- J + 1 \n" +
			"    K <- K + 1 \n" +
			"Ki: K",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 15, "");
	};
	
	function test_WhileCycle7()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 5 \n" +
			"While (I < 2) \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_CompareEqual1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1=1 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareEqual2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1=4 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_CompareEqual3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 = 5 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareEqual4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		// + is not acceptable for results of comparators
		jsUnity.assertions.assertException(Pseudo.StartUnitTest.App.Run, "",
			"KI: 4 \n" +
			"I <- (5 = 5) + 1 \n" +
			"Ki: I",
			"");
	};
	
	function test_CompareEqual5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- (5 = 7) \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 0, "");
	};
	
	function test_CompareEqual6()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 \n" +
			"IF 21+I*4 = 20*2+1 \n" +
			"  KI: 10 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_CompareLess1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1<2 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareLess2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1<1 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_CompareLess3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 < 6 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareLess4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 \n" +
			"IF I*4 < 20*2+1 \n" +
			"  KI: 10 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_CompareNotEqual1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1<>2 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareNotEqual2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1<>1 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_CompareNotEqual3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 <> 6 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareNotEqual4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 \n" +
			"IF I*4 <> 20*2+1 \n" +
			"  KI: 10 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_CompareLessOrEqual1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1<=2 )\n" + 
			"  Ki:1",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareLessOrEqual2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1<=1 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareLessOrEqual3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1<=0 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_CompareLessOrEqual4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 <= 6 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareLessOrEqual5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 \n" +
			"IF 34 <= 4 + (I + I) * 3   \n" +
			"  KI: 10 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_CompareGreater1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1>2 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_CompareGreater2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1>1 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_CompareGreater3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1>0 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareGreater4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 7 > 6 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareGreater5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 \n" +
			"IF I*4 > 2*2+1 \n" +
			"  KI: 10 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_CompareGreaterOrEqual1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1>=2 )\n" + 
			"  Ki:1",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_CompareGreaterOrEqual2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1>=1 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareGreaterOrEqual3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"IF ( 1>=0 )\n" + 
			"  Ki:1",
			"");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	};
	
	function test_CompareGreaterOrEqual4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 >= 6 \n" +
			"Ki: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 0, "");
	};
	
	function test_CompareGreaterOrEqual5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		jsUnity.assertions.assertException(Pseudo.StartUnitTest.App.Run, "", 
			"KI: 4 \n" +
			"I <- 5 \n" +
			"IF 35 >= 4 + (I + I) * 3   \n" +
			"  KI: 10 \n",
			"");
	};
	
	
	function test_RepeatCycle1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 0 \n" +
			"Repeat \n" +
			"  I <- I + 2 \n" +
			"Until ( I >= 10 ) \n" +
			"KI: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_RepeatCycle2()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 0 \n" +
			"Repeat \n" +
			"  I <- I - 2 \n" +
			"Until ( I < -8 ) \n" +
			"KI: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -10, "");
	};
	
	function test_RepeatCycle2()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 0 \n" +
			"K <- 0 \n" +
			"Repeat \n" +
			"  I <- I - 2 \n" +
			"  J <- I \n" +
			"  Repeat \n" +
			"    J <- J + 1 \n" +
			"    K <- K + 1 \n" +
			"  Until J >= 0 \n" +
			"Until ( I < -8 ) \n" +
			"KI: K",
			""); // ( 2 + 4 + 6 + 8 + 10)
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 30, "");
	};
	
	function test_RepeatCycle3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 0 \n" +
			"J <- 0 \n" +
			"Repeat \n" +
			"  I <- I + 2 \n" +
			"  J <- J + 3 \n" +
			"Until ( I > 8 and J > 20 ) \n" +
			"KI: I+J",
			""); // 7 step -> J = 21, I = 14
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 35, "");
	};
	
	function test_RepeatCycle4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"I <- 5 \n" +
			"Repeat \n" +
			"Until ( I = 5 ) \n" +
			"KI: I",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_Expressions1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"IF 23 \n" +
			"  KI: 5",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_Expressions2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"IF 1 \n" +
			"  KI: 6",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_Expressions3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"IF 0 \n" +
			"  KI: 6",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_Expressions4()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 4 \n" +
			"IF -1 \n" +
			"  KI: 7",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 7, "");
	};
	
	function test_Expressions5()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 10 \n" +
			"IF 2 * -5 \n" +
			"  KI: 7",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 7, "");
	};
	
	function test_Expressions6()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 10 \n" +
			"IF 2 * 0 \n" +
			"  KI: 9",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_Expressions7()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 53 \n" +
			"I <- -2 \n" +
			"IF 2 * I \n" +
			"  KI: 52",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 52, "");
	};
	
	function test_Expressions8()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 53 \n" +
			"I <- 0 \n" +
			"IF 2 * I \n" +
			"  KI: 52",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 53, "");
	};
	
	function test_Expressions9()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 5 \n" +
			"K <- 0 \n" +
			"While (I) \n" +
			"  K <- K + 1 \n" +
			"  IF I > 7 \n" +
			"    I <- 0 \n" +
		    "  Else \n" +
			"    I <- I + 1 \n" +
			"Ki: K",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_Expressions10()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- -5 \n" +
			"K <- 0 \n" +
			"While (I) \n" +
			"  K <- K + 1 \n" +
			"  IF I < -8 \n" +
			"    I <- 0 \n" +
		    "  Else \n" +
			"    I <- I - 1 \n" +
			"Ki: K",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_Expressions11()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 0 \n" +
			"K <- 0 \n" +
			"Repeat \n" +
			"  K <- K + 1 \n" +
			"  IF K > 7 \n" +
			"    I <- 1 \n" +
			"Until (I) \n" +
			"Ki: K",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_Expressions12()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("k","k","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 0 \n" +
			"K <- 0 \n" +
			"Repeat \n" +
			"  K <- K + 1 \n" +
			"  IF K > 8 \n" +
			"    I <- -1 \n" +
			"Until (I) \n" +
			"Ki: K",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 9, "");
	};
	
	function test_If1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 2 \n" +
			"If (12 + I < 20) \n" +
			"  Ki: 4 \n" +
			"Else If (12 + I < 25) \n" +
			"  Ki: 5 \n" +
			"Else If (12 + I < 30) \n" +
			"  Ki: 6 \n" +
			"Else \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_If2()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 9 \n" +
			"If (12 + I < 20) \n" +
			"  Ki: 4 \n" +
			"Else If (12 + I < 25) \n" +
			"  Ki: 5 \n" +
			"Else If (12 + I < 30) \n" +
			"  Ki: 6 \n" +
			"Else \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_If3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 16 \n" +
			"If (12 + I < 20) \n" +
			"  Ki: 4 \n" +
			"Else If (12 + I < 25) \n" +
			"  Ki: 5 \n" +
			"Else If (12 + I < 30) \n" +
			"  Ki: 6 \n" +
			"Else \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_If4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 26 \n" +
			"If (12 + I < 20) \n" +
			"  Ki: 4 \n" +
			"Else If (12 + I < 25) \n" +
			"  Ki: 5 \n" +
			"Else If (12 + I < 30) \n" +
			"  Ki: 6 \n" +
			"Else \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 7, "");
	};
	
	function test_If5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 9 \n" +
			"If (12 + I < 20) \n" +
			"  Ki: 4 \n" +
			"Else If (12 + I < 25) \n" +
			"  If (12 + I < 22) \n" +
			"    Ki: 54 \n" +
			"  Else \n" +
			"    Ki: 23 \n",
			"Else If (12 + I < 30) \n" +
			"  Ki: 6 \n" +
			"Else \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 54, "");
	};
	
	function test_If6()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 11 \n" +
			"If (12 + I < 20) \n" +
			"  Ki: 4 \n" +
			"Else If (12 + I < 25) \n" +
			"  If (12 + I < 22) \n" +
			"    Ki: 54 \n" +
			"  Else \n" +
			"    Ki: 23 \n",
			"Else If (12 + I < 30) \n" +
			"  Ki: 6 \n" +
			"Else \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 23, "");
	};
	
	function test_Not1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 11 \n" +
			"If ( 3=5 or not(2 < 1) ) \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 7, "");
	};
	
	function test_Not2()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 1 \n" +
			"If ( 3=3 and not (I < 0) and 2<4 ) \n" +
			"  Ki: 3 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");
	};
	
	function test_Not3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"If ( 3=3 and not (I) and 2<4 ) \n" +
			"  Ki: 4 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_Not4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- igaz \n" +
			"If ( 3=3 and  not not (I) and 2<4 ) \n" +
			"  Ki: 5 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_Not5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		jsUnity.assertions.assertException(Pseudo.StartUnitTest.App.Run, "",
			"I <- igaz \n" +
			"If ( 3=3 and  not not (I) and 2<4 ) \n" +
			"  Ki: 5 \n",
			"");
	};
	
	function test_Not6()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"If ( 3=3 and not not not (I) and 2<4 ) \n" +
			"  Ki: 8 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_Not7()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"J <- igaz \n" +
			"If ( 3=3 and not( not not not (I) and not J) and 2<4 ) \n" +
			"  Ki: 35 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 35, "");
	};
	
	function test_Not8()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 3 \n" +
			"I <- hamis \n" +
			"J <- igaz \n" +
			"If ( 3=3 and not( not not not (I) and not not J) and 2<4 ) \n" +
			"  Ki: 35 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");
	};
	
	function test_Not9()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"KI: 8 \n" +
			"I <- hamis \n" +
			"J <- igaz \n" +
			"If ( 3=3 and not( not not (I <> igaz) and not not J) and 2<4 ) \n" +
			"  Ki: 35 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_Not10()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 9 \n" +
			"If ( not( not not not(igaz) and not(hamis)) ) \n" +
			"  Ki: 56 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 56, "");
	};
	
	function test_Not11()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 10 \n" +
			"If ( not(not(hamis) and not not not(hamis)) ) \n" +
			"  Ki: 23 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 10, "");
	};
	
	function test_Not12()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 59 \n" +
			"If ( not( not not not(igaz) and not not not(igaz)) ) \n" +
			"  Ki: 23 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 23, "");
	};
	
	function test_Not13()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 24 \n" +
			"If ( not( not not not(hamis) and not not not(igaz)) ) \n" +
			"  Ki: 95 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 95, "");
	};
	
	function test_Not14()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		jsUnity.assertions.assertException(Pseudo.StartUnitTest.App.Run, "",
			"KI: 24 \n" +
			"If ( not( not not not(hamis) and not not not(1+0)) ) \n" +
			"  Ki: 21 \n",
			"");
	};
	
	function test_ConvertBool1()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 0 \n" +
			"Ki: 5 \n" +
			"If ( 3=3 and not not not (I) and 2<4 ) \n" +
			"  Ki: 18 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 18, "");
	};
	
	function test_ConvertBool2()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 1 \n" +
			"Ki: 5 \n" +
			"If ( 3=3 and not not not (I) and 2<4 ) \n" +
			"  Ki: 18 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_Constants1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"If ( 3=3 and  not not (igaz) and 2<4 ) \n" +
			"  Ki: 6 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 6, "");
	};
	
	function test_Constants2()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"If ( 3=3 and  not (HaMis) and 2<4 ) \n" +
			"  Ki: 7 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 7, "");
	};
	
	function test_Constants3()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"If ( (3=3) <> hamis and  not (HaMis) and 2<4 ) \n" +
			"  Ki: 8 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_Constants4()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"If ( (3=3) <> IGaz and  not (HaMis) and 2<4 ) \n" +
			"  Ki: 8 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");
	};
	
	function test_Constants5()
	{
		//Pseudo.Options.Log.EnableAll();
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 4 \n" +
			"If ( (3=3) <> not IGaz and  not (HaMis) and 2<4 ) \n" +
			"  Ki: 8 \n",
			"");
		Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 8, "");
	};
	
	function test_Bool1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"J <- I \n" +
			"If ( not( not not not(J) and not not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 22, "");
	};
	
	function test_Bool2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"J <- I or igaz\n" +
			"If ( not( not not not(J) and  not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 21, "");
	};
	
	function test_Bool3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"J <- igaz\n" +
			"If ( I < J) \n" +
			"  Ki: 53 \n" +
			"Else \n" +
			"  Ki: 212 ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 53, "");
	};
	
	function test_Bool4()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"J <- igaz\n" +
			"If ( I = J) \n" +
			"  Ki: 53 \n" +
			"Else \n" +
			"  Ki: 212 ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 212, "");
	};
	
	function test_Bool5()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.AddVariable("j","j","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"J <- hamis \n" +
			"If ( I = J) \n" +
			"  Ki: 97 \n" +
			"Else \n" +
			"  Ki: 212 ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 97, "");
	};
	
	function test_Bool6()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"Ki: I ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "Hamis", "");
	};
	
	function test_Bool7()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- igaz \n" +
			"Ki: I ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "Igaz", "");
	};
	
	function test_Bool8()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Boolean",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- hamis \n" +
			"Ki: igaz ", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "Igaz", "");
	};
	
	function test_Float1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 012 + 033", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 45, "");
	};
	
	function test_Float2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 012.5 + 033.8", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 46.3, "");
	};
	
	function test_Float3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 11 / 4", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");
	};
	
	function test_Float4()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 11 / 4.0", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2.75, "");
	};
	function test_Float5()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 11.0 / 4", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2.75, "");
	};
	function test_Float6()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"Ki: 12.1 / 4.4", "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result.toFixed(2), 2.75, "");
	};
	
	function test_Float7()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 12.1 / 4.4 \n" +
			"KI: I"
			, "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");
	};
	
	function test_Float8()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Float",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 12.1 / 4.4 \n" +
			"KI: I"
			, "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result.toFixed(2), 2.75, "");
	};
	
	function test_Float9()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Float",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 12 / 4 \n" +
			"KI: I"
			, "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");
	};
	
	function test_Float10()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Float",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 15 / 4 + 2 \n" +
			"KI: I"
			, "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5, "");
	};
	
	function test_Float11()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Float",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 15 / 4.0 + 2 \n" +
			"KI: I"
			, "");
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 5.75, "");
	};
	
	function test_Float12()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		jsUnity.assertions.assertException(Pseudo.StartUnitTest.App.Run,"",
			"I <- 12.1 // 4.4 \n" +
			"KI: I"
			, "");
	};
	
	function test_Float13()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		jsUnity.assertions.assertException(Pseudo.StartUnitTest.App.Run,"",
			"I <- 12..1 / 4.4 \n" +
			"KI: I"
			, "");
	};
	
	function test_Float14()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Integer",{i: false, m:true, o: false});
		jsUnity.assertions.assertException(Pseudo.StartUnitTest.App.Run,"",
			"I <- .1 / 4.4 \n" +
			"KI: I"
			, "");
	};
	
	function test_Float15()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Float",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 10. / 4 \n" +
			"KI: I"
			, "");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2.5, "");
	};
	
	function test_Char1()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Char",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 'D' \n" +
			"KI: I"
			, "");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "D", "");
	};
	
	function test_Char2()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Char",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 'D' \n" +
			"KI: 'N'"
			, "");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "N", "");
	};
	
	function test_Char3()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.AddVariable("i","i","Char",{i: false, m:true, o: false});
		Pseudo.StartUnitTest.App.Run(
			"I <- 'D' \n" +
			"KI: 'n'"
			, "");
		jsUnity.assertions.assertNotEqual(Pseudo.StartUnitTest.Result, "N", "");
	};
	
	function test_Char4()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 'a' < 'b'"
			, "");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "Igaz", "");
	};
	
	function test_Char5()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 'a' <> 'b'"
			, "");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "Igaz", "");
	};
	
	function test_Char6()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 'a' = 'a'"
			, "");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "Igaz", "");
	};
	
	function test_Char7()
	{
		Pseudo.StartUnitTest.App.ClearVariables();
		Pseudo.StartUnitTest.App.Run(
			"KI: 'a' = 'b'"
			, "");
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "Hamis", "");
	};
}