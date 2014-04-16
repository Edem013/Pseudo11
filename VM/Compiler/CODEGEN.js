/*
 * Code Generator
 *
 * @author Edem
 * @version 1.0
 */
 
// Name-space for code generator
Pseudo.COM.CodeGenerator = {

	name: "Code Generator"

};

// Constructor method for initialising the code generator object
Pseudo.COM.CodeGenerator.Init = function(){

	// private scope
	
	var address = 0;			// actual memory address
	var memory = null;		// memory object
	var variables = null;	// defined variables
  
	// Private method for step on every node in the given tree
	// and write the appropriate instructions into the memory
	var _generate = function(root){
	
		// generated code starting address
		address = memory.Read(0);
		
		// start the generation
		_walk(root);
		
		// Save the last address of the generated code
		memory.Write(1,address-1);
	};
	
	// Private method for writing instructions into the memory and
	// repeat method on every child node.
	var _walk = function(root){
		if (root != null){
		
			// What is the type of the given root node
			switch (root.name){
				
				// Sequence
				case "sequence":
					// repeat method on both child node
					_walk(root.left);
					_walk(root.right);
					break;
				
				// For cycle
				case "for":
					// Generate code of the start value expression
					_walk(root.start);
					// Generate code for the variable part
					_walk(root.identVar);
					_insert("LDA_STACK"); // remove actual value from stack
					_insert("LDA_STACK");
					_insert("STRA_H");
					var endValueAddr = address;
					// Generate code of the end value expression
					_walk(root.end);
					
					// Determine step value if it exists
					if (root.step)
					{
						// Is step number positive or negative?
						_walk(root.step);
						_insert("LDB_STACK");
						_insert("STACKB");
						_insert("LDA");
						memory.Write(address, 0);
						address += 1;
						_insert("CMP_L");
						_insert("JMP");
						var negAddr = address;
						address += 1;
						
						// move end value after step value
						_insert("LDA_STACK");
						_insert("LDB_STACK");
						_insert("STACKA");
						_insert("STACKB");
						
						// positive branch
						// compare end value to cycle variable
						_walk(root.identVar);
						_insert("LDA_STACK");
						_insert("LDB_STACK");
						_insert("CMP_L");
						_insert("STACKC");
						_insert("CMP_EQ");
						_insert("STACKC");
						_insert("LDA_STACK");
						_insert("LDB_STACK");
						_insert("ADDA_B");
						_insert("STACKC");
						_insert("LDB_STACK");
						_insert("LDA");
						memory.Write(address, 0);
						address += 1;
						_insert("CMP_L");
						_insert("JMP");
						var coreEndAddr = [];
						coreEndAddr.push(address);
						address += 1;
						
						//jump over the negative branch
						_insert("LDA");
						memory.Write(address, 0);
						address += 1;
						_insert("LDB");
						memory.Write(address, 1);
						address += 1;
						_insert("CMP_EQ");
						
						_insert("JMP");
						var endOfNegAddr = address;
						address+=1;
						
						// negative branch
						memory.Write(negAddr, address);
						
						// move end value after step value
						_insert("LDB_STACK");
						_insert("LDA_STACK");
						_insert("STACKB");
						_insert("STACKA");
						
						// compare end value to cycle variable
						_walk(root.identVar);
						_insert("LDB_STACK");
						_insert("LDA_STACK");
						_insert("CMP_L");
						_insert("STACKC");
						_insert("CMP_EQ");
						_insert("STACKC");
						_insert("LDA_STACK");
						_insert("LDB_STACK");
						_insert("ADDA_B");
						_insert("STACKC");
						_insert("LDB_STACK");
						_insert("LDA");
						memory.Write(address, 0);
						address += 1;
						_insert("CMP_L");
						_insert("JMP");
						coreEndAddr.push(address);
						address += 1;
						memory.Write(endOfNegAddr, address);
						
					}else{
						
						// Set step value  to 1
						_insert("LDA_STACK");
						_insert("LDB");
						memory.Write(address, 1);
						address += 1;
						_insert("STACKB");
						_insert("STACKA");
						
						// Compare end value to cycle variable
						_walk(root.identVar);
						_insert("LDA_STACK");
						_insert("LDB_STACK");
						_insert("CMP_L");
						_insert("STACKC");
						_insert("CMP_EQ");
						_insert("STACKC");
						_insert("LDA_STACK");
						_insert("LDB_STACK");
						_insert("ADDA_B");
						_insert("STACKC");
						_insert("LDB_STACK");
						_insert("LDA");
						memory.Write(address, 0);
						address += 1;
						_insert("CMP_L");
						_insert("JMP");
						var coreEndAddr = [];
						coreEndAddr.push(address);
						address += 1;
					}
					
					// Generate code of the core statements
					_walk(root.core);
					
					// Increment cycle variable
					_walk(root.identVar);
					_insert("LDA_STACK");
					_insert("LDB_STACK");
					_insert("ADDA_B");
					_insert("STACKC");
					_insert("LDA_STACK");
					_insert("STRA_H");
					
					// Jump back to start of the cycle
					_insert("LDA");
					memory.Write(address, 0);
					address += 1;
					_insert("LDB");
					memory.Write(address, 1);
					address += 1;
					_insert("CMP_EQ");
					_insert("JMP");
					memory.Write(address, endValueAddr);
					address+=1;
					
					while( coreEndAddr.length > 0 ){
						var curAddr = coreEndAddr.pop();
						memory.Write(curAddr, address);
					}
					
					// Remove step value from stack
					_insert("LDA_STACK");
					
					break;
				
				// Repeat cycle
				case "repeat":
					var startCoreAddr = address;
					// Generate code of the core statements
					_walk(root.core);
					// Generate code of condition expression
					var startExpAddr = address;
					_walk(root.exp);
					_insert("LDA_STACK");
					// Load zero into register B and compare it with the
					// result of the condition
					_insert("LDB");
					memory.Write(address, 0);
					address += 1;
					_insert("CMP_EQ");
					// negate the result of CMP_EQ
					_insert("STACKC");
					_negate();
					// Jump back to the start of the expression
					// if expression returns with false
					_insert("JMP");
					memory.Write(address, startCoreAddr);
					address += 1;
					break;
				
				// While cycle
				case "while":
					// Generate code of condition expression
					var startExpAddr = address;
					_walk(root.exp);
					_insert("LDA_STACK");
					// Load zero into register B and compare it with the
					// result of the condition
					_insert("LDB");
					memory.Write(address, 0);
					address += 1;
					_insert("CMP_EQ");
					// negate the result of CMP_EQ
					_insert("STACKC");
					_negate();
					// Jump into the end of the core if compare returns with false
					_insert("JMP");
					var coreEndAddr = address;
					address += 1;
					
					// Generate code of the core statements
					_walk(root.core);
					
					// Jump back to the start of the expression
					_insert("LDA");
					memory.Write(address, 0);
					address += 1;
					_insert("LDB");
					memory.Write(address, 1);
					address += 1;
					_insert("CMP_EQ");
					_insert("JMP");
					memory.Write(address, startExpAddr);
					address+=1;

					memory.Write(coreEndAddr, address);
				
					break;
					
				// Variable assignment
				case "assign":
					// Generate code of the expression
					_walk(root.exp);
					// Save the address of the variable
					_insert("LDH");
					memory.Write(address, variables[root.identVar.value].address);
					address++;
					// Load value of the expression into the variable
					_insert("LDA_STACK");
					if (root.identVar.resultType == "Integer")
						_insert("STRA_H");
					else
						_insert("STRA_H_F");
					break;
					
					
					
				// If condition
				case "if":
					// Generate code of condition expression
					// and return the addresses used by jump instructions
					_walk(root.exp);
					_insert("LDA_STACK");
					// Load zero into register B and compare it with the
					// result of the condition
					_insert("LDB");
					memory.Write(address, 0);
					address += 1;
					_insert("CMP_EQ");
					// negate the result of CMP_EQ
					_insert("STACKC");
					_negate();
					// Jump into the end of the core if compare returns with false
					_insert("JMP");
					var coreEndAddr = address;
					
					address += 1;
					// Generate code of the core statements
					_walk(root.core);
					
					// Another jump instruction to skip the else branch
					_insert("LDA");
					memory.Write(address, 0);
					address += 1;
					_insert("LDB");
					memory.Write(address, 1);
					address += 1;
					_insert("CMP_EQ");
					_insert("JMP");
					var endElseAddr = address;
					address+=1;
					memory.Write(coreEndAddr, address);
					
					// Generate code of the else branch
					_walk(root.elseCore);
					// Set this address to the previous jump instruction
					memory.Write(endElseAddr, address);
					break;
					
				// Print statement
				case "print":
					// Generate code of the expression
					_walk(root.value);
					_insert("LDA_STACK");
					// Print
					switch(root.value.resultType)
					{
						case "Integer" : _insert("PRINTA_I"); break;
						case "Boolean" : _insert("PRINTA_B"); break;
						case "Float"   : _insert("PRINTA_F"); break;
						case "Char"    : _insert("PRINTA_C"); break;
						default: throw { message: "Ismeretlen változó típus!" + root.resultType };
					}
					break;
					
				// Variable
				case "identVar":
					// Load address of the variable
					_insert("LDH");
					memory.Write(address, variables[root.value].address);
					address++;
					// Load value from the address
					_insert("LDA_H");
					_insert("STACKA");
					break;
					
				// Number constant
				case "number":
					// Load value
					_insert("LDA");
					memory.Write(address, Number(root.value));
					address++;
					_insert("STACKA");
					break;
					
				// Float constant
				case "float":
					// Load value
					_insert("LDA");
					memory.Write(address, Number(root.value));
					address++;
					_insert("STACKA");
					break;
					
				// Char
				case "char":
					// Load value
					_insert("LDA");
					memory.Write(address, root.value);
					address++;
					_insert("STACKA");
					break;
					
				// Not
				case "not":
					_walk(root.item);
					_negate();
					_insert("STACKC");
					break;
				
				// Operator
				case "op":
					// Generate code of the first part of the expression
					_walk(root.left);
					
					// If the operator is and AND operator
					if ( root.type == "&&" ){
						/*	If left part is false
								put zero into the stack
								jump over the right part
								keep zero in the stack
							If left part is true
								Put the result of right part into the stack */
					
						// Save zero into register B and compare it with
						// the result of the expression part
						_insert("LDB");
						memory.Write(address, 0);
						address++;
						_insert("LDA_STACK");
						_insert("STACKA");
						_insert("CMP_EQ");
						// negate the result of CMP_EQ
						_insert("STACKC");
						_negate();
						// If the first part of the expression is false,
						// then skip the second part and return with false
						_insert("JMP");
						var addrAnd = address;
						address+=1;
						_insert("LDA_STACK");
						// Generate code of the second part of the expression
						_walk(root.right);
						
						memory.Write(addrAnd, address);
						
					// OR operator
					} else if ( root.type == "||" ){
						/*	If left part is true
								put one into the stack
								jump over the right part
								keep one in the stack
							If left part is false
								Put the result of right part into the stack */
						_insert("LDB");
						memory.Write(address, 1);
						address++;
						_insert("LDA_STACK");
						_insert("STACKB");
						_insert("CMP_EQ");
						// negate the result of CMP_EQ
						_insert("STACKC");
						_negate();
						// left part is true, skip the right one
						_insert("JMP");
						// save this address
						var addrOr = address;
						address+=1;
						_insert("LDA_STACK");
						_walk(root.right);
						// add this address as parameter of jump stm
						memory.Write(addrOr, address);
					}else{
						_walk(root.right);
						_insert("LDB_STACK");
						_insert("LDA_STACK");
						switch (root.type){
							case "+":
								_insert("ADDA_B");
								break;
							case "-": _insert("SUBA_B");break;
							case "*": _insert("MULA_B");break;
							case "/":
								if (root.resultType == "Integer")
									_insert("DIVA_B_I");
								else
									_insert("DIVA_B_F");
								break;
						
							case "=": _insert("CMP_EQ");break;
							case "<": _insert("CMP_L");break;
							case "<>":
								// not =
								_insert("CMP_EQ");
								_insert("STACKC");
								_negate();
								break;
							case "<=":
								// < or =
								_insert("CMP_L");
								_insert("STACKC");
								_insert("CMP_EQ");
								_insert("STACKC");
								_insert("LDA_STACK");
								_insert("LDB_STACK");
								_insert("ADDA_B");
								_insert("STACKC");
								_insert("LDB_STACK");
								_insert("LDA");
								memory.Write(address, 0);
								address += 1;
								_insert("CMP_L");
								break;
							case ">":
								// not <=
								_insert("CMP_L");
								_insert("STACKC");
								_insert("CMP_EQ");
								_insert("STACKC");
								_insert("LDA_STACK");
								_insert("LDB_STACK");
								_insert("ADDA_B");
								_insert("STACKC");
								_insert("LDB_STACK");
								_insert("LDA");
								memory.Write(address, 0);
								address += 1;
								_insert("CMP_L");
								_insert("STACKC");
								_negate();
								break;
							case ">=":
								// not <
								_insert("CMP_L");
								_insert("STACKC");
								_negate();
								break;
							default:
								throw { message: "Nem támogatott elem" };
						}
						_insert("STACKC");
					}
					break;
					
				default:
					// Cannot recognize node
					throw { message: "Ismeretlen elem a fában!" };
			}
		}else{
		  // null node
		}
	};
	
	// Private method for writing an instruction to the
	// memory and increment the actual address counter
	var _insert = function(utasitas){
		memory.Write(address, utasitas);
		address++;
	};
	
	// Negate the result of a logical expression.
	// It is important to use a compare instruction before the
	// call of this method.
	var _negate = function(){
		// load result of the expression into register A
		//_insert("STACKC");
		_insert("LDA_STACK");
		// subtract the result with 1
		_insert("LDB");
		memory.Write(address, 1);
		address += 1;
		_insert("SUBA_B");
		_insert("STACKC");
		// multiply the result with -1
		_insert("LDA_STACK");
		_insert("LDB");
		memory.Write(address, -1);
		address += 1;
		_insert("MULA_B");
		_insert("STACKC");
		// result is inverted
		//compare it to 1 to fill the flag
		_insert("LDA_STACK");
		_insert("LDB");
		memory.Write(address, 1);
		address += 1;
		_insert("CMP_EQ");
	}
	
	// End of private scope
	
	return {
		// Public scope
		Generate: function(_memory, _variables, root) { memory = _memory; variables = _variables; return _generate(root); }
		// End of public scope
	};
};