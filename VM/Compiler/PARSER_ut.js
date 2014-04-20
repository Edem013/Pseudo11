// Method for containing automatic test cases
Pseudo.COM.Parser.StartUnitTest = function ParserTestCase()
{
	function setUp(){
		Pseudo.Options.Log.DisableAll();
		if (!this.scope.testScanner)
			this.scope.testScanner = Pseudo.COM.Scanner.Init();
		if (!this.scope.testParser)
			this.scope.testParser = Pseudo.COM.Parser.Init();
		this.scope.testVariables = [];
	};
	
	function addVariable(name, funct, type, mods){
		this.testVariables[name] = {
					name: name,
					funct: funct,
					type: type,
					mods: mods
		};
	};
	
	function test_ConvertBool1()
	{
		var tokens = this.testScanner.Scan(
			"KI: 24 \n" +
			"If ( not( not not not(hamis) and not not not(1+0)) ) \n" +
			"  Ki: 21 \n");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_ConvertBool2()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- igaz \n" +
			"If ( not( not not not(I = 0) and not not(I = 0)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool3()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- igaz \n" +
			"If ( not( not not not(I) and not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_ConvertBool4()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- igaz \n" +
			"If ( not( not not not(I) and not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool5()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 3 < 5 \n" +
			"If ( not( not not not(I < 2) and not not(I < 5)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");

	};
	
	function test_ConvertBool6()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 3 < 5 \n" +
			"If ( not( not not not(I) and not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool7()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 2 \n" +
			"If ( not( not not not(I) and not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_ConvertBool8()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- -1 \n" +
			"If ( not( not not not(I) and not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_ConvertBool9()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 1 \n" +
			"If ( not( not not not(I) and not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool10()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 1 \n" +
			"If ( not( not not not(I) and not not(I)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool11()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- hamis \n" +
			"If ( not( not not not(I = 0) and not not(I = 0)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool12()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		this.addVariable("j","j","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- hamis \n" +
			"J <- I \n" +
			"If ( not( not not not(J = 0) and not not(I = 0)) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool13()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- hamis \n" +
			"If ( (2<3) + (3<4) > 1 ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_ConvertBool14()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- hamis \n" +
			"If ( (I<3) and (3<4) ) \n" +
			"  Ki: 21 \n" +
			"Else \n" +
			"  Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_ConvertBool15()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- igaz \n" +
			"Ki: I ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Float1()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 0134 + 0023 \n");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Float2()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 0134.34 + 0023.23 \n");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Float3()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 3.14 \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Float4()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 3 \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Float5()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 3.14 \n" +
			"J <- I \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Float6()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 5 \n" +
			"J <- I \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Float7()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		this.addVariable("j","j","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 5 \n" +
			"J <- I \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Float8()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 7.23 \n" +
			"J <- I \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Float9()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		this.addVariable("j","j","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 5 \n" +
			"J <- 34 \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Float10()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 7.23 \n" +
			"J <- 34.46 \n" +
			"Ki: 22 ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Converts1()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		this.addVariable("j","j","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 5 * 4 + 2 / 1 \n" +
			"J <- 46 \n" +
			"Ki: I + J ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Converts2()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Integer",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 5.3 + 4 * 2.4 - 3 / 3 \n" +
			"J <- 46 \n" +
			"Ki: I + J ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Converts3()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 5 + 4.2 * 4 - 6.4 / 2.3 \n" +
			"J <- 46.34 \n" +
			"Ki: I + J ");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Converts4()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 7.23 \n" +
			"J <- 34.46 \n" +
			"Ki: I or J ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Converts5()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Boolean",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 7 and 94 \n" +
			"J <- 34.46 \n" +
			"Ki: I + J ");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Char1()
	{
		this.addVariable("i","i","Char",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'd' \n" +
			"J <- 46.34 \n" +
			"Ki: I");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Char2()
	{
		this.addVariable("i","i","Integer",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'd' \n" +
			"J <- 46.34 \n" +
			"Ki: I");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Char3()
	{
		this.addVariable("i","i","Float",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'd' \n" +
			"J <- 46.34 \n" +
			"Ki: I");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Char4()
	{
		this.addVariable("i","i","Boolean",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'd' \n" +
			"J <- 46.34 \n" +
			"Ki: I");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Char5()
	{
		this.addVariable("i","i","Char",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- ''' \n" +
			"J <- 46.34 \n" +
			"Ki: I");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Char6()
	{
		this.addVariable("i","i","Char",{i: false, m:true, o: false});
		this.addVariable("j","j","Float",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'a' \n" +
			"J <- 46.34 \n" +
			"Ki: I + 'b'");
		
		/*jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);*/
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");	
	};
	
	function test_Char7()
	{
		this.addVariable("i","i","Char",{i: false, m:true, o: false});
		this.addVariable("j","j","Char",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'a' \n" +
			"J <- 'b' \n" +
			"Ki: I + J");
		
		/*jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);*/
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
		};
	
	function test_Char8()
	{
		this.addVariable("i","i","Char",{i: false, m:true, o: false});
		this.addVariable("j","j","Char",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'a' \n" +
			"J <- 'b' \n" +
			"Ki: 'c' + 'd'");
		
		/*jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);*/
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Char9()
	{
		this.addVariable("i","i","Char",{i: false, m:true, o: false});
		this.addVariable("j","j","Char",{i: false, m:true, o: false});
		var tokens = this.testScanner.Scan(
			"I <- 'a' \n" +
			"J <- 'b' \n" +
			"Ki: 'c' + 23");
		
		/*jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);*/
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	
	};
	
	function test_Mod1()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 13 % 4");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Mod2()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 13 % 4.5");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Mod3()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 13 mod 4");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
	
	function test_Mod4()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 13 mod 4.5");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Div1()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 13 div 4.5");
		
		jsUnity.assertions.assertException(this.testParser.Parse, "",
			tokens,
			this.testVariables);
	};
	
	function test_Div2()
	{
		var tokens = this.testScanner.Scan(
			"Ki: 13 diV 4");
		
		jsUnity.assertions.assertNotNull(this.testParser.Parse(tokens, this.testVariables), "");
	};
}