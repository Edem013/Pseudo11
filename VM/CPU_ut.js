// Method for containing automatic test cases
Pseudo.CPU.StartUnitTest = function CPUTestCase()
{

	function runInstructions(instructions){
		for (inst in instructions)
		{
			var callback = this.testCPU.Execute(instructions[inst]);
			if (callback != null && typeof(callback) === "function")
				callback(this.testMemory);
		}
	};

	function setUp(){
		if (!this.scope.testCPU)
			this.scope.testCPU = Pseudo.CPU.Init(
				function(e){Pseudo.StartUnitTest.Result = e;});
		if (!this.scope.testMemory)
			this.scope.testMemory = Pseudo.Memory.Init();
		this.scope.testMemory.Clear();
	};

	function test_InstructionPointer1()
	{
		this.testCPU.SetInstructionPointer(100);
		var ip = this.testCPU.GetInstructionPointer();
		jsUnity.assertions.assertEqual(ip, 100, "");
	};
	
	function test_InstructionPointer2()
	{
		this.testCPU.SetInstructionPointer(50);
		var ip = this.testCPU.GetInstructionPointer();
		jsUnity.assertions.assertEqual(ip, 50, "");
	};
	
	function test_ExecuteLDA1()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 33);
		
		this.runInstructions(
			['LDA',
			'PRINTA_I']);
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 33, "");
		
	};
	
	function test_ExecuteLDA2()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 124);
		
		this.runInstructions(
			['LDA',
			'STACKA',
			'LDA_STACK',
			'PRINTA_I']);
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 124, "");
		
	};
	
	function test_ExecuteLDB1()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 25);
		
		this.runInstructions(
			['LDB',
			'STACKB',
			'LDA_STACK',
			'PRINTA_I']);
					
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 25, "");
		
	};
	
	function test_ExecuteLDB2()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 329);
		this.testMemory.Write(ip+4, 7);
		
		this.runInstructions(
			['LDB', 
			'STACKB',
			'LDB',
			'LDB_STACK',
			'STACKB',
			'LDA_STACK',
			'PRINTA_I']);	
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 329, "");
		
	};
	
	function test_ExecuteLDA_H1()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip, 86);
		this.testCPU.SetInstructionPointer(ip+1);
		this.testMemory.Write(ip+2, ip);
		
		this.runInstructions(
			['LDH',
			'LDA_H',
			'PRINTA_I']);	
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 86, "");
		
	};
	
	function test_ExecuteSTRA_H1()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip, 199);
		this.testCPU.SetInstructionPointer(ip+1);
		this.testMemory.Write(ip+2, ip);
		this.testMemory.Write(ip+4, 21);
		this.testMemory.Write(ip+7, 67);
		
		this.runInstructions(
			['LDH',
			'LDA',
			'STRA_H',
			'LDA',
			'LDA_H',
			'PRINTA_I']);	
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 21, "");
		
	};
	
	function test_ExecuteADDA_B1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 23);
		this.testMemory.Write(ip+3, 22);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'ADDA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 45, "");	
	};
	
	function test_ExecuteADDA_B2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 23);
		this.testMemory.Write(ip+3, -20);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'ADDA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 3, "");	
	};
	
	function test_ExecuteADDA_B3()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 23);
		this.testMemory.Write(ip+3, -30);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'ADDA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -7, "");	
	};
	
	function test_ExecuteADDA_B4()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -3);
		this.testMemory.Write(ip+3, -7);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'ADDA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -10, "");	
	};
	
	function test_ExecuteADDA_B5()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -7);
		this.testMemory.Write(ip+3, 20);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'ADDA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 13, "");
	};
	
	function test_ExecuteADDA_B6()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -17);
		this.testMemory.Write(ip+3, 3);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'ADDA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	

		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -14, "");
	};
	
	function test_ExecuteSUBA_B1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 34);
		this.testMemory.Write(ip+3, 22);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'SUBA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 12, "");	
	};
	
	function test_ExecuteSUBA_B2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 74);
		this.testMemory.Write(ip+3, -24);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'SUBA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 98, "");	
	};
	
	function test_ExecuteSUBA_B3()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 21);
		this.testMemory.Write(ip+3, 48);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'SUBA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -27, "");	
	};
	
	function test_ExecuteSUBA_B4()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -3);
		this.testMemory.Write(ip+3, -7);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'SUBA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");	
	};
	
	function test_ExecuteSUBA_B5()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -72);
		this.testMemory.Write(ip+3, 20);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'SUBA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -92, "");
	};
	
	function test_ExecuteSUBA_B6()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -17);
		this.testMemory.Write(ip+3, -30);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'SUBA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	

		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 13, "");
	};
	
	function test_ExecuteMULA_B1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 3);
		this.testMemory.Write(ip+3, 4);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'MULA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 12, "");	
	};
	
	function test_ExecuteMULA_B2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 5);
		this.testMemory.Write(ip+3, -2);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'MULA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -10, "");	
	};
	
	function test_ExecuteMULA_B3()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -10);
		this.testMemory.Write(ip+3, 4);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'MULA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, -40, "");	
	};
	
	function test_ExecuteMULA_B4()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -3);
		this.testMemory.Write(ip+3, -7);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'MULA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 21, "");	
	};
	
	function test_ExecuteCMP_EQ1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 43);
		this.testMemory.Write(ip+3, 43);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_EQ',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	}
	
	function test_ExecuteCMP_EQ2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -4);
		this.testMemory.Write(ip+3, -4);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_EQ',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	}
	
	function test_ExecuteCMP_EQ3()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 6);
		this.testMemory.Write(ip+3, 8);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_EQ',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 0, "");
	}
	
	function test_ExecuteCMP_L1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 6);
		this.testMemory.Write(ip+3, 8);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_L',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	}
	
	function test_ExecuteCMP_L2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 6);
		this.testMemory.Write(ip+3, -8);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_L',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 0, "");
	}
	
	function test_ExecuteCMP_L3()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -6);
		this.testMemory.Write(ip+3, 8);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_L',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	}
	
	function test_ExecuteCMP_L4()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -6);
		this.testMemory.Write(ip+3, -8);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_L',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 0, "");
	}
	
	function test_ExecuteCMP_L5()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, -16);
		this.testMemory.Write(ip+3, -8);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_L',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");
	}
	
	function test_ExecuteJMP1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 5);
		this.testMemory.Write(ip+3, 6);
		this.testMemory.Write(ip+6, ip);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_EQ',
			'JMP']);	
			
		var newIp = this.testCPU.GetInstructionPointer();
		
		jsUnity.assertions.assertEqual(ip, newIp, "");
	}
	
	function test_ExecuteJMP2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 12);
		this.testMemory.Write(ip+3, 12);
		this.testMemory.Write(ip+6, ip);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'CMP_EQ',
			'JMP']);	
			
		var newIp = this.testCPU.GetInstructionPointer();
		
		jsUnity.assertions.assertEqual(ip+7, newIp, "");
	}
	
	function test_ExecuteNOP()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 12);
		this.testMemory.Write(ip+3, 45);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'NOP',
			'NOP',
			'NOP',
			'PRINTA_I',
			'NOP']);
		
		var res = 0;
		if (Pseudo.StartUnitTest.Result == 12) res++;
			
		this.runInstructions(
			['NOP',
			'NOP',
			'NOP',
			'STACKB',
			'LDA_STACK',
			'PRINTA_I',
			'NOP']);
			
		if (Pseudo.StartUnitTest.Result == 45) res++;
		
		jsUnity.assertions.assertEqual(res, 2, "");
	};
	
	function test_ExecuteDIVA_B_I1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 4.5);
		this.testMemory.Write(ip+3, 2);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'DIVA_B_I',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 2, "");	
	};
	
	function test_ExecuteDIVA_B_I2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 9.5);
		this.testMemory.Write(ip+3, 2);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'DIVA_B_I',
			'STACKC',
			'LDA_STACK',
			'PRINTA_F']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4, "");	
	};
	
	function test_ExecuteDIVA_B_I3()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 5);
		this.testMemory.Write(ip+3, 0);
		
		jsUnity.assertions.assertException(this.runInstructions, "",
			['LDA',
			'LDB',
			'DIVA_B_I',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
			
	};
	
	function test_ExecuteDIVA_B_F1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 9.5);
		this.testMemory.Write(ip+3, 2);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'DIVA_B_F',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4.75, "");	
	};
	
	function test_ExecuteDIVA_B_F2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 9.5);
		this.testMemory.Write(ip+3, 2);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'DIVA_B_F',
			'STACKC',
			'LDA_STACK',
			'PRINTA_F']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 4.75, "");	
	};
	
	function test_ExecuteDIVA_B_F3()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 5);
		this.testMemory.Write(ip+3, 0);
		
		jsUnity.assertions.assertException(this.runInstructions, "",
			['LDA',
			'LDB',
			'DIVA_B_F',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
			
	};
	
	function test_ExecuteMODA_B1()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 5);
		this.testMemory.Write(ip+3, 2);
		
		this.runInstructions(
			['LDA',
			'LDB',
			'MODA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
		
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 1, "");	
	};
	
	function test_ExecuteMODA_B2()
	{
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip+1, 5);
		this.testMemory.Write(ip+3, 0);
		
		jsUnity.assertions.assertException(this.runInstructions, "",
			['LDA',
			'LDB',
			'MODA_B',
			'STACKC',
			'LDA_STACK',
			'PRINTA_I']);	
			
	};
	
	function test_ExecuteLDH_STACK1()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		this.testMemory.Write(ip, ip+1);
		this.testMemory.Write(ip+1, 83);
		this.testCPU.SetInstructionPointer(ip+2);
		this.testMemory.Write(ip+3, ip);
		
		this.runInstructions(
			['LDH',
			'LDA_H',
			'STACKA',
			'LDH_STACK',
			'LDA_H',
			'PRINTA_I']);	
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, 83, "");
		
	};
	
	function test_ExecuteOUTB1()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		jsUnity.assertions.assertException(this.runInstructions, "",
			['OUTB'], "");	
	};
	
	function test_ExecutePRINTA_C1()
	{
		//Pseudo.Options.Log.EnableAll();
		var ip = this.testCPU.GetInstructionPointer();
		
		var str = "a";
		this.testMemory.Write(ip+1, str.charCodeAt(0));
		
		this.runInstructions(
			['LDA',
			'PRINTA_C']);	
		
		//Pseudo.Options.Log.DisableAll();
		jsUnity.assertions.assertEqual(Pseudo.StartUnitTest.Result, "a", "");
		
	};
}