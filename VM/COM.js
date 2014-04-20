/*
 * Compiler
 *
 * Meta-syntax:
 *
 *    <program> = <statement>, {<terminator>, <statement>};
 *
 * <terminator> = "\n";
 *
 *      <begin> = ? padding every next row with plus two spaces ?;
 *
 *        <end> = ? padding every next row with minus two spaces ?;
 *
 *     <assign> = <ident>, "<-", <exp>;
 *
 *  <statement> = <assign>
 *              | "FOR ", <assign>, ",", <exp>, [<begin>, <statement>, {<terminator>, <statement>}, <end>]
 *              | "IF ", <exp>, [<begin>, <statement>, {<terminator>, <statement>}, <end>]
 *                ["ELSE IF ", <exp>, [<begin>, <statement>, {<terminator>, <statement>}, <end>]]
 *                ["ELSE , [<begin>, <statement>, {<terminator>, <statement>}, <end>]];
 *
 *      <ident> = ^[A-Za-z][A-Za-z0-9]*;
 * 
 *        <exp> = <number> | <ident> | <op>;
 *
 *     <number> = ^[0-9]+$;
 *
 *         <op> = <exp> <operator> <exp>;
 *
 *  <operatror> = "-" | "+" | "*" | "<" | "=" | ">" | "and" | "or";
 *
 * @author Edem
 * @version 1.0
 */

Pseudo.COM = { 

	name: "Compiler",
	
	// settings - DO NOT MODIFY
	CASE_SENS: false,
	PADDING: true,
	TERMINATOR: "\n"
};

// Constructor method for initialize the compiler object
Pseudo.COM.Init = function(){

	// private scope

	// log
	var _log = function(mit){
		if (Pseudo.Options.Log.Compiler){
			console.log( Pseudo.COM.name + ": " + mit ); 
		}
	};
	_log("Compiler Init started");
	
	// array for tokens
	var tokens = [];
	
	// number of tokens
	//var tokenCount = 0;
	
	// root element of the abstract syntax tree
	var ast_root = null;
	
	// array for the defined variables
	var variables = [];
	
	// Create scanner object
	var scanner = Pseudo.COM.Scanner.Init();
	
	// Crate parser object
	var parser = Pseudo.COM.Parser.Init();
	
	// Create code generator object
	var generator = Pseudo.COM.CodeGenerator.Init();
	
	// Private compiler method
	var _compile = function(memory, code){
		try{
			// Allocate memory space for variables
			_varsToMem(memory);
			
			// Scan the given code for syntax errors
			tokens = scanner.Scan(code);
			
			// Write tokens into the console
			var eredmeny = "";
			for (var token in tokens){
			  eredmeny += "["+tokens[token]+"] ";
				if (tokens[token] == "\n" || tokens[token] == "{"){
				  eredmeny += "<br>";
				}
			}
			_log("Tokens: " + eredmeny);
			
			// Parse the code, create a tree structure
			ast_root = parser.Parse(tokens, variables);
	    
			// Recursive call to generate new code into memory 
			generator.Generate(memory, variables, ast_root);
			
			return true;
		}catch(e){
			_log(e.message);
			throw e;
		};
	};
	
	// Private method for define new variable
	var _addVariable = function(name, funct, type, mods, size){
		if ((Pseudo.COM.CASE_SENS && variables[name] != null) ||
			(!Pseudo.COM.CASE_SENS && variables[name.toLowerCase()])){
			return false;
		}else{
			
			//check the type of the variable
			if ( type == "Integer" || type == "Boolean" ||
				 type == "Float" || type == "Char")
			{
				if (size != undefined)
				{
					if (size < 1 || (type == "Char" && size > 255))
						throw { message: "Nem megfelelő tömbméret: "+size };
						
					if (type == "Char") size++;
				}
			
				_log("Variable " + name + " is added");
				if (!Pseudo.COM.CASE_SENS) name = name.toLowerCase();
				variables[name] = {
					name: name,
					funct: funct,
					type: type,
					mods: mods,
					size: size
				};
				return true;
			}
			else
			{
				return false;
			}
		}
	};
	
	// Private method for remove every defined variable
	var _clearVariables = function(){
		variables = [];
	};
	
	// Private method for allocation memory space for the defined variables
	var _varsToMem = function(memory){
		var address = memory.Read(0);
		for (var variable in variables){
			variables[variable].address = address;
			if (variables[variable].size != undefined)
			{
				address += parseInt(variables[variable].size);
			}
			else{
				address++;
			}
		}
		// TODO: variable start value maybe should be a random value
		memory.Write(0,address);
	};
	
	// End of private scope
	
	return {
		// Public scope
		AddVariable: function(name, funct, type, mods, size) { return _addVariable(name, funct, type, mods, size); },
		ClearVariables: function() { _clearVariables(); },
		RemoveVariable: function() {},
		Compile: function(memory, code){ return _compile(memory, code); }
		// End of public scope
	};
};

