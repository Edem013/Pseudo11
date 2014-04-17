/*
 * CPU script for containing the instruction set
 */
 
// Add name-space for the CPU
Pseudo.CPU = {

	name: "CPU"
	
};

// Constructor method for initializing the CPU object 
Pseudo.CPU.Init = function(_printMethodParam){
	// private scope
	
	// log method
	var _log = function(mit){
		if (Pseudo.Options.Log.CPU){
			console.log( Pseudo.CPU.name + ": " + mit ); 
		}
	};
	_log("CPU Init started");
	
	// print method
	var _printMethod = undefined;
	if (_printMethodParam && _printMethodParam instanceof Function)
	{
		_printMethod = _printMethodParam;
	}
	else
	{
		throw { message: "Print method has to be assigned!" };
	}
	
	// registers of the cpu
	// a, b, c - storing input values and result of computation
	//       h - storing memory address
	//       f - flag for comparing
	//      ip - instruction pointer
	var regs = {
		a: 0,
		b: 0,
		c: 0, 
		h: 0,
		f: 0,
		ip:0
	};
	
	
	// stack memory for computing
	// TODO: replace this with dynamic memory allocation
	var stack = [];
	
	
	// instruction set of the cpu
	var mnemonics = {
	 
		// Put value of register A into the stack
		STACKA: function(){
			_log("Store register A in Stack - " + regs.a);
			stack.push(regs.a);
			regs.ip++;
		},
		
		// Put value of register B into the stack 
		STACKB: function(){
			_log("Store register B in Stack - " + regs.b);
			stack.push(regs.b);
			regs.ip++;
		},
		
		// Put value of register C into the stack
		STACKC: function(){
			_log("Store register C in Stack - " + regs.c);
			stack.push(regs.c);
			regs.ip++;
		},
		
		// Load value into register H from memory address stored in register IP
		LDH: function(){
			regs.ip++;
			return function(memory){
				regs.h = memory.Read(regs.ip);
				_log("Load value into register H - " + regs.h);
				regs.ip++;
			};
		},
		
		// Load value from stack into register A
		LDA_STACK: function(){
			regs.a = stack.pop();
			_log("Load value into register A from Stack - " + regs.a);
			regs.ip++;
		},

		// Load value into register A from address stored in register IP
		LDA: function(){
			regs.ip++;
			return function(memory){
				regs.a = memory.Read(regs.ip);
				_log("Load value into register A - " + regs.a);
				regs.ip++;
			};
		},
		
		// Load value from stack into register B
		LDB_STACK: function(){
			regs.b = stack.pop();
			_log("Load value into register B from Stack - " + regs.b);
			regs.ip++;
		},
		
		// Load value into register B from address stored in register IP
		LDB:  function(){
			regs.ip++;
			return function(memory){
				regs.b = memory.Read(regs.ip);
				_log("Load value into register B - " + regs.b);
				regs.ip++;
			};
		},
		
		// Load value into register A from address stored in register H
		LDA_H: function(){
			regs.ip++;
			return function(memory){
				regs.a = memory.Read(regs.h);
				_log("Load value ("+ regs.a +") into register A from address H (" + regs.h + ")");
			};
		},
		
		// Store value of register A into address stored in register H
		STRA_H: function(){
			_log("Store value (" + regs.a + ") to address (" + regs.h + ") H from register A");
			regs.ip++;
			return function(memory){
				memory.Write(regs.h, parseInt(regs.a));
			};
		},
		
		// Store value of register A as float value into address stored in register H
		STRA_H_F: function(){
			_log("Store value (" + regs.a + ") to address (" + regs.h + ") H from register A");
			regs.ip++;
			return function(memory){
				memory.Write(regs.h, regs.a);
			};
		},
		
		// Add value of register A to the value of register B
		// and store the result into register C
		ADDA_B:  function(){
			_log("Add register A ("+regs.a+") to register B ("+regs.b+") and store the result into register C ("+regs.c+")");
			regs.c = regs.a + regs.b;
			regs.ip++;
		},
		
		// Subtract value of register B from value of register A
		// and store the result into register C
		SUBA_B:  function(){ 
			_log("Subtract register B ("+regs.b+") from register A ("+regs.a+") and store the result into register C ("+regs.c+")");
			regs.c = regs.a - regs.b;
			regs.ip++;
		},
		
		// Multiple value of register A with value of register B
		// and store the result into register C
		MULA_B: function() { 
			_log("Multiple register A ("+regs.a+") with register B ("+regs.b+") and store the result into register C ("+regs.c+")");
			regs.c = regs.a * regs.b;
			regs.ip++;
		},
		
		// Divide value of register A with value of register B
		// and store the result into register C as an integer value
		DIVA_B_I: function() { 
			_log("Divide register A ("+regs.a+") with register B ("+regs.b+") and store the result into register C ("+regs.c+")");
			if (regs.b == 0) throw { message: "Nullával történő osztás" };
			regs.c = parseInt(regs.a / regs.b);
			regs.ip++;
		},
		
		// Divide value of register A with value of register B
		// and store the result into register C as a float value
		DIVA_B_F: function() { 
			_log("Divide register A ("+regs.a+") with register B ("+regs.b+") and store the result into register C ("+regs.c+")");
			if (regs.b == 0) throw { message: "Nullával történő osztás" };
			regs.c = regs.a / regs.b;
			regs.ip++;
		},
		
		// Determine the remaining value after divide the value of
		// register A with value of register B
		MODA_B: function() { 
			_log("Mod register A ("+regs.a+") with register B ("+regs.b+") and store the result into register C ("+regs.c+")");
			if (regs.b == 0) throw { message: "Nullával történő osztás" };
			regs.c = regs.a % regs.b;
			regs.ip++;
		},
		
		// Compare value of register A to the value of register B
		// and set register F depends on the result (A == B)
		CMP_EQ: function(){
			_log("Compare (equal) register A ("+regs.a+") to register B ("+regs.b+")");
			if (regs.a == regs.b){
				regs.f = regs.c = 1;
			}else{
				regs.f = regs.c = 0;
			}
			regs.ip++;
		},
		
		// Compare value of register A to the value of register B
		// and set register F depends on the result (A < B)
		CMP_L: function(){
			_log("Compare (less than) register A ("+regs.a+") to register B ("+regs.b+")");
			if (regs.a < regs.b){
				regs.f = regs.c = 1;
			}else{
				regs.f = regs.c = 0;
			}
			regs.ip++;
		},
		
		// Set value of register IP to the value stored in the next address
		// after that is stored in register IP or step 2 address to skip the
		// address value depends on the value of register C
		// TODO: register F is required instead? should remove?
		JMP: function(){
			if ( regs.c == 0){
				regs.ip++;
				return function(memory){
					regs.ip = memory.Read(regs.ip);
					_log("Jump to address ("+regs.ip+")");
				};
			}else{
				regs.c = 0;
				regs.ip += 2;
			}
		},
		
		// Print value of register A to the screen
		// for boolean values
		PRINTA_B: function(){
			_log("Print register A to the screen: " + regs.a);
			if (regs.a == 0)
				_printMethod("Hamis");
			else
				_printMethod("Igaz");
			regs.ip++;
		},
		
		// Print value of register A to the screen
		// for integers
		PRINTA_I: function(){
			_log("Print register A to the screen: " + regs.a);
			_printMethod(regs.a);
			regs.ip++;
		},
		
		// Print value of register A to the screen
		// for floats
		PRINTA_F: function(){
			_log("Print register A to the screen: " + regs.a);
			_printMethod(regs.a);
			regs.ip++;
		},
		
		// Print value of register A to the screen
		// for chars
		PRINTA_C: function(){
			_log("Print register A to the screen: " + regs.a);
			_printMethod(regs.a);
			regs.ip++;
		},
		 
		// No Operation
		NOP : function(){
			_log("No Operation");
			regs.ip++;
		},
	};
	
	// Method for execute the given mnemonic
	var _execute = function(mnemonic){
		if ( mnemonics[mnemonic] != null && typeof(mnemonics[mnemonic]) === "function")
		{
			//run
			var stackString = "";
			for (var item in stack){
				stackString += stack[item] + " | ";
			}
			_log(stackString);
			return mnemonics[mnemonic]();
		}
		else
		{
			throw { message: "Mnemonic is not defined!"};
		}
	};
	
	//end of private scope
	
	return {
		//public scope
		Execute: function(mnemonic){ return _execute(mnemonic); },
		GetInstructionPointer: function() { return regs.ip; },
		SetInstructionPointer: function(address) { regs.ip = address; },
		//end of public scope
	};
}

// Add method for checking that the current browser-support
Pseudo.CPU.IsBrowserSupports = function()
{
	Pseudo._log("Checking browser support for CPU name-space");
	
	// Checking every critical method
	//throw { message: "CPU is not supported."};
	
	return true;
}