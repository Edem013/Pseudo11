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
				
					// If exp is operator -> resultType == string
					// if exp is variable -> resultType == Char && size == x
					// if exp is string constant -> resultType == string
					if (root.exp.resultType == "String" || root.exp.resultType == "Char")
					{
						/*
							1. Load start address of the variable (S)
							2. Load end address of the variable (E)
							3. Iterate for every string under exp
								3.1. If current string is a constant
									3.1.1. Write string into memory
								3.2. Load start address of the current string (C)
								3.3. Iterate if string[C] is not zero
									3.3.1. If S > E
										3.3.1.1 Exception
									3.3.2. Copy string[C] to address S
									3.3.3. Increment S and C
						*/
						
						// Jump over the variable part
						_insert("LDA");
						memory.Write(address, 0);
						address += 1;
						_insert("LDB");
						memory.Write(address, 1);
						address += 1;
						_insert("CMP_EQ");
						_insert("JMP");
						var varPart = address;
						address+=1;
						
						// start, end, and current variables
						var start = address;
						_insert(variables[root.identVar.value].address);
						var end = variables[root.identVar.value].address
								  + variables[root.identVar.value].size-1;
						var current = address;
						_insert(0);
						
						memory.Write(varPart, address);
								  
						_loadString(root.exp, start, end, current);
						
						// insert 0 as end char
						
						_insert("LDH");
						_insert(start);
						_insert("LDA_H"); // start address
						_insert("STACKA");
						_insert("LDB_STACK");
						_insert("LDA");
						_insert(end);
						_insert("CMP_L");
						_insert("JMP");
						var outOfBound = address;
						address+=1;
						_insert("OUTB");
						memory.Write(outOfBound, address);
						
						_insert("LDH");
						_insert(start);
						_insert("LDA_H");
						_insert("STACKA");
						_insert("LDH_STACK");
						_insert("LDA");
						_insert(0);
						_insert("STRA_H");
						
						break;
					}
				
					// Generate code of the expression
					_walk(root.exp);
					
					
					if(root.identVar.size != undefined)
					{
						_walk(root.identVar.indexExp);
						_insert("LDB_STACK");
						_insert("STACKB");
						// check that index is not out of bound
						_insert("LDA");
						memory.Write(address, root.identVar.size);
						address++;
						_insert("CMP_L"); // 10 < I
						_insert("STACKC");
						_insert("STACKB");
						_insert("LDA_STACK");
						_insert("LDB");
						memory.Write(address, 1);
						address++;
						_insert("CMP_L"); // I < 0
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
						memory.Write(address, address+2);
						address++;
						_insert("OUTB");
						
						_insert("LDA_STACK");
						_insert("LDB");
						memory.Write(address, variables[root.identVar.value].address);
						address++;
						_insert("ADDA_B");
						_insert("STACKC");
						_insert("LDA_STACK");
						_insert("LDB");
						memory.Write(address, 1);
						address++;
						_insert("SUBA_B");
						_insert("STACKC");
						_insert("LDH_STACK");
					}
					else
					{
						// Save the address of the variable
						_insert("LDH");
						memory.Write(address, variables[root.identVar.value].address);
						address++;
					}
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
				
					// If result is a string
					if (root.value.resultType == "String" ||
						(root.value.resultType == "Char" && root.value.indexExp == undefined))
					{
						// Load result into a specific memory space
						// Jump over the variable part
						_insert("LDA");
						memory.Write(address, 0);
						address += 1;
						_insert("LDB");
						memory.Write(address, 1);
						address += 1;
						_insert("CMP_EQ");
						_insert("JMP");
						var varPart = address;
						address+=1;
						
						// start, end, and current variables
						var start = address;
						_insert(0);
						var end = 2 + 255 ;
						var current = address;
						_insert(0);
						
						memory.Write(varPart, address);
						
						// set start value to 2
						_insert("LDH");
						_insert(start);
						_insert("LDA");
						_insert(2);
						_insert("STRA_H");
								  
						_loadString(root.value, start, end, current);
						
						// insert 0 as end char
						
						_insert("LDH");
						_insert(start);
						_insert("LDA_H"); // start address
						_insert("STACKA");
						_insert("LDB_STACK");
						_insert("LDA");
						_insert(end);
						_insert("CMP_L");
						_insert("JMP");
						var outOfBound = address;
						address+=1;
						_insert("OUTB");
						memory.Write(outOfBound, address);
						
						_insert("LDH");
						_insert(start);
						_insert("LDA_H");
						_insert("STACKA");
						_insert("LDH_STACK");
						_insert("LDA");
						_insert(0);
						_insert("STRA_H");
						
						// set back start
						_insert("LDH");
						_insert(start);
						_insert("LDA");
						_insert(2);
						_insert("STRA_H");
						
						var startExpAddr = address;
						
						// Start to print
						_insert("LDH");
						_insert(start);
						_insert("LDA_H");
						_insert("STACKA");
						_insert("LDH_STACK");
						_insert("LDA_H"); // actual char
						
						_insert("LDB");
						_insert(0);
						_insert("CMP_EQ");
						_insert("STACKC");
						_negate();
				
						// Jump into the end of the core if compare returns with false
						_insert("JMP");
						var printEndAddr = address;
						address += 1;
						
						// Check if start address is lower than the end address
						_insert("LDH");
						_insert(start);
						_insert("LDA_H"); // start address
						_insert("STACKA");
						_insert("LDB_STACK");
						_insert("LDA");
						_insert(end);
						_insert("CMP_L");
						_insert("JMP");
						var outOfBound = address;
						address+=1;
						_insert("OUTB");
						memory.Write(outOfBound, address);
						
						
						// Print Char
						_insert("LDH");
						_insert(start);
						_insert("LDA_H");
						_insert("STACKA");
						_insert("LDH_STACK");
						_insert("LDA_H"); // actual char
						_insert("PRINTA_C");
						
						//Increment address
						_incValOfAddr(start);
						
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
						
						memory.Write(printEndAddr, address);
						
						
						
						break;
					}
				
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
				
					// If variable is an array
					if(root.size != undefined)
					{
						_walk(root.indexExp);
						_insert("LDB_STACK");
						_insert("STACKB");
						// check that index is not out of bound
						_insert("LDA");
						memory.Write(address, root.size);
						address++;
						_insert("CMP_L"); // Limit < I
						_insert("STACKC");
						_insert("STACKB");
						_insert("LDA_STACK");
						_insert("LDB");
						memory.Write(address, 1);
						address++;
						_insert("CMP_L"); // I < 0
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
						memory.Write(address, address+2);
						address++;
						_insert("OUTB");
						
						_insert("LDA_STACK");
						_insert("LDB");
						memory.Write(address, variables[root.value].address);
						address++;
						_insert("ADDA_B");
						_insert("STACKC");
						_insert("LDA_STACK");
						_insert("LDB");
						memory.Write(address, 1);
						address++;
						_insert("SUBA_B");
						_insert("STACKC");
						_insert("LDH_STACK");
					}
					else{
						// Load address of the variable
						_insert("LDH");
						memory.Write(address, variables[root.value].address);
						address++;
					}
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
					memory.Write(address, root.value.charCodeAt(0));
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
							case "div":
							case "/":
								if (root.resultType == "Integer")
									_insert("DIVA_B_I");
								else
									_insert("DIVA_B_F");
								break;
							case "mod":
							case "%": _insert("MODA_B");break;
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
	};
	
	// Method for string expressions
	var _loadString = function(node, start, end, current){
		if (node.name == "op")
		{
			_loadString(node.left, start, end, current);
			_loadString(node.right, start, end, current);
		}
		else
		{
			if (node.name == "char" || node.name == "string" ||
				(node.name == "identVar" && node.size != undefined && node.indexExp == undefined) ||
				(node.name == "number" || node.name == "float"))
			{
				// Update current
				_insert("LDH");
				_insert(current);
				_insert("LDA");
				var currentAddr = address;
				address++;
				_insert("STRA_H");
			
				// Jump over the constant part
				_insert("LDA");
				memory.Write(address, 0);
				address += 1;
				_insert("LDB");
				memory.Write(address, 1);
				address += 1;
				_insert("CMP_EQ");
				_insert("JMP");
				var constantPart = address;
				address+=1;
				memory.Write(currentAddr, address);
				
				// Variable part
				if (node.name == "string")
				{
					for (var i = 0; i < node.value.length; i++)
					{
						_insert(node.value.charCodeAt(i));
					}	
					_insert(0);
				}
				else if ( node.name == "char" )
				{
					_insert(node.value.charCodeAt(i));
					_insert(0);
				}
				else if (node.name == "number" || node.name == "float" )
				{
					var numStr = node.value.toString();
					for(var i = 0; i< numStr.length; i++)
						_insert(numStr.charCodeAt(i));
					_insert(0);
				}else{
					memory.Write(currentAddr, variables[node.value].address);
				}
				
				// Generate code of condition expression
				var startExpAddr = address;
				
				memory.Write(constantPart, address);
				//_walk(root.exp); current is not 0
				_insert("LDH");
				_insert(current);
				_insert("LDA_H");
				_insert("STACKA");
				_insert("LDH_STACK");
				_insert("LDA_H"); // actual char
				
				_insert("LDB");
				_insert(0);
				_insert("CMP_EQ");
				_insert("STACKC");
				_negate();
				
				
				// Jump into the end of the core if compare returns with false
				_insert("JMP");
				var coreEndAddr = address;
				address += 1;
				
				// Check if start address is lower than the end address
				_insert("LDH");
				_insert(start);
				_insert("LDA_H"); // start address
				_insert("STACKA");
				_insert("LDB_STACK");
				_insert("LDA");
				_insert(end);
				_insert("CMP_L");
				_insert("JMP");
				var outOfBound = address;
				address+=1;
				_insert("OUTB");
				memory.Write(outOfBound, address);
				
				
				// Copy char
				_insert("LDH");
				_insert(current);
				_insert("LDA_H");
				_insert("STACKA");
				_insert("LDH_STACK");
				_insert("LDA_H"); // actual char
				_insert("STACKA");
				
				_insert("LDH");
				_insert(start);
				_insert("LDA_H");
				_insert("STACKA");
				_insert("LDH_STACK"); // start address
				
				_insert("LDA_STACK");
				_insert("STRA_H");
				
				//Increment addresses
				_incValOfAddr(current);
				_incValOfAddr(start);
				
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
			}
			else if (node.name == "identVar" &&
					(node.resultType == "Float" || node.resultType == "Integer"))
			{
				throw { message: "Nem megengedett egész vagy valós típusú változó!" };
			}
			else
			{
				// char identVars and char from string
				
				
				_insert("LDH");
				_insert(start);
				_insert("LDA_H"); // start address
				_insert("STACKA");
				_insert("LDB_STACK");
				_insert("LDA");
				_insert(end);
				_insert("CMP_L");
				_insert("JMP");
				var outOfBound = address;
				address+=1;
				_insert("OUTB");
				memory.Write(outOfBound, address);
				
				// Copy char
				
				if (node.indexExp != undefined){
					_walk(node);
				}
				else
				{
					_insert("LDH");
					_insert(variables[node.value].address);
					_insert("LDA_H");
					_insert("STACKA");
				}
				
				_insert("LDH");
				_insert(start);
				_insert("LDA_H");
				_insert("STACKA");
				_insert("LDH_STACK"); // start address
				
				_insert("LDA_STACK");
				_insert("STRA_H");
				
				//Increment addresses
				_incValOfAddr(start);
			}
		}
	};
	
	var _incValOfAddr = function(addr)
	{
		_insert("LDH");
		_insert(addr);
		_insert("LDA_H");
		_insert("LDB");
		_insert(1);
		_insert("ADDA_B");
		_insert("STACKC");
		_insert("LDA_STACK");
		_insert("STRA_H");
	};
	
	// End of private scope
	
	return {
		// Public scope
		Generate: function(_memory, _variables, root) { memory = _memory; variables = _variables; return _generate(root); }
		// End of public scope
	};
};