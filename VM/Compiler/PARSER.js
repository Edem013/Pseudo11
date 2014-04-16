/*
 * Parser
 *
 * @author Edem
 * @version 1.0
 */
 
// Name-space for parser object
Pseudo.COM.Parser = {

	name: "Parser"
	
};

// Constructor method for initializing the parser object
Pseudo.COM.Parser.Init = function(){
	
	// private scope
	
	var index = 0;		// token index
	var id = 0;			// id counter for tree elements
	var ops = ["not","*","+","<","and","("];	// operators for priority check
	var tokens = [];	// tokens created by scanner
	var variables = [];	// defined variables
	
	//constants
	var CONST_TRUE = "igaz";
	var CONST_FALSE = "hamis";
	
	
	// Parse a statement
	var _parseStm = function(startIndex){
		if (typeof(startIndex) != "undefined"){
			index = startIndex;
			id = 0;
		}
		
		// Root of the current tree
		var result = null;
		
		if (_isMoreToken(index)){
		  
			// Search for FOR statement
			// FOR <varIdent> <- <start>, <end> [, <step>]
			if ((!Pseudo.COM.CASE_SENS && tokens[index] == "for") ||
				(Pseudo.COM.CASE_SENS && tokens[index] == "For")){
				
				// Create a FOR element as root of the result tree
				result = { name: "for" };
				result.id = ++id;
								 
				// <varIdent>
				index++;
				if (_isValidVar(tokens[index])){
					// Add the variable to the FOR element in the tree
					result.identVar = { name: "identVar" };
					result.identVar.id = ++id;
					result.identVar.value = tokens[index];
					index++;
				}else{
					throw { message: "Ismeretlen azonosító: " + tokens[index] };
				}
				
				// "<-"
				if (tokens[index] != "<-") throw { message: "Hiányzó \"<-\" jel!" };
				
				// <exp> as start value
				index++;
				result.start = _parseExp(",");
				
				// "," 
				if (tokens[index] != ",") throw { message: "Hiányzó \",\" jel!"};
				
				// <exp> as limit value
				index++;
				var actIndex = index;
				try{
					result.end = _parseExp(',');
					
					// read step value
					index++;
					result.step = _parseExp(Pseudo.COM.TERMINATOR)
					
				}catch(e){
					index = actIndex;
					result.end = _parseExp(Pseudo.COM.TERMINATOR)
				}
				
				// <core> \n{  }
				if (Pseudo.COM.PADDING){
					if (_isMoreToken(index) && tokens[index] != "\n"){
						throw { message: "Hiányzó soremelés!" };
					}else{
						index++;
					}
				}
				if (tokens[index] == "{"){
					index++;
					// Parse the core
					result.core = _parseStm();
				}else{
					result.core = null;
				}	
			}
			
			// Search for REPEAT statement
			else if((!Pseudo.COM.CASE_SENS && (tokens[index] == "repeat")) ||
		            (Pseudo.COM.CASE_SENS && (tokens[index] == "Repeat"))){
			
				// Create REPEAT element as root of the result tree
				result = { name: "repeat" };
				result.id = ++id;
				index++;
				
				// Check terminator before core
				if (Pseudo.COM.PADDING){
					if (_isMoreToken(index) && tokens[index] != "\n"){
						throw { message: "Hiányzó soremelés!" };
					}else{
						index++;
					}
				}
				
				// Add core
				if (tokens[index] == "{"){
					index++;
					result.core = _parseStm();
				}else{
					result.core = null;
				}
				
				// Search for until keyword
				if((!Pseudo.COM.CASE_SENS && (tokens[index] == "until")) ||
		            (Pseudo.COM.CASE_SENS && (tokens[index] == "Until"))){
					index++;
				}else{
					throw { message: "Hiányzó kulcsszó!" };
				}
				
				// Add condition expression
				result.exp = _parseExp(Pseudo.COM.TERMINATOR);
				index++;
			}
			
			// Search for WHILE statement
			else if((!Pseudo.COM.CASE_SENS && (tokens[index] == "while")) ||
		            (Pseudo.COM.CASE_SENS && (tokens[index] == "While"))){
				
				// Create WHILE element as root of the result tree
				result = { name: "while" };
				result.id = ++id;
				
				// Add condition expression
				index++;
				result.exp = _parseExp(Pseudo.COM.TERMINATOR);
				
				// Check padding before core
				if (Pseudo.COM.PADDING){
					if (_isMoreToken(index) && tokens[index] != "\n"){
						throw { message: "Hiányzó soremelés!" };
					}else{
						index++;
					}
				}
				
				// Add core
				if (tokens[index] == "{"){
					index++;
					result.core = _parseStm();
				}else{
					result.core = null;
				}
				
			}
				
			// Search for IF conditional branch
			else if((!Pseudo.COM.CASE_SENS && (tokens[index] == "if")) ||
		            (Pseudo.COM.CASE_SENS && (tokens[index] == "If"))){
				
				// Create IF element as root of the result tree
				result = { name: "if" };
				result.id = ++id;
				
				// Add condition expression
				index++;
				result.exp = _parseExp(Pseudo.COM.TERMINATOR);
				
				// Check padding before core
				if (Pseudo.COM.PADDING){
					if (_isMoreToken(index) && tokens[index] != "\n"){
						throw { message: "Hiányzó soremelés!" };
					}else{
						index++;
					}
				}
				
				// Add core
				if (tokens[index] == "{"){
					index++;
					result.core = _parseStm();
				}else{
					result.core = null;
				}
					
				// Add else branch
				if ((!Pseudo.COM.CASE_SENS && (tokens[index] == "else")) ||
		            (Pseudo.COM.CASE_SENS && (tokens[index] == "Else"))){
					index++;
					if (tokens[index]=="\n"){
						index++;
						if (tokens[index] == "{"){
							index++;
							result.elseCore = _parseStm();
						}else{
							result.elseCore = null;
						}
					// Add else if branch as it was in the core of the else branch
					}else if ((!Pseudo.COM.CASE_SENS && (tokens[index] == "if")) ||
							  (Pseudo.COM.CASE_SENS && (tokens[index] == "If"))){
						result.elseCore = _parseStm();
					}
				}
			}
				
			// Search for Print statement
			else if ((!Pseudo.COM.CASE_SENS && (tokens[index] == "ki")) ||
		             (Pseudo.COM.CASE_SENS && (tokens[index] == "Ki"))){
				result = { name: "print" };
				result.id = ++id;
				index++;
				
				// ":"
				if (tokens[index] != ":") throw { message: "Hiányzó \":\" jel!" };
				
				// Add <exp> as output value
				index++;
				result.value = _parseExp(Pseudo.COM.TERMINATOR);
					
				// "/n"
				if (Pseudo.COM.PADDING){
					if (_isMoreToken(index) && tokens[index] != Pseudo.COM.TERMINATOR){
						throw { message: "Hiányzó lezárás!"+index };
					}else{
						index++;
					}
				}
			}
			
			// Check the token as Variable
			else{
				// Is it a defined variable?
				if (_isValidVar(tokens[index])){
					result = { name: "identVar" };
					result.id = ++id;
					result.value = tokens[index];
					result.resultType = variables[result.value].type;	
					index++;
					
					// "<-" (assignment)
					if ( tokens[index] == "<-" ){
						var assign = { name: "assign" };
						assign.id = ++id;
						assign.identVar = result;
						index++;
						
						// Add expression
						assign.exp = _parseExp(Pseudo.COM.TERMINATOR);
						
						// Check that result of the expression is
						// acceptable for the variable
						if (assign.exp != null && 
							variables[assign.identVar.value].type != assign.exp.resultType &&
							!(((variables[assign.identVar.value].type == "Integer" ||
								variables[assign.identVar.value].type == "Float") && assign.exp.resultType == "Boolean")
							  ||
							  (variables[assign.identVar.value].type == "Boolean" &&
								 assign.exp.resultType == "Integer" &&
								(assign.exp.value == 0 || assign.exp.value == 1))
							  ||
							  (variables[assign.identVar.value].type == "Integer" && assign.exp.resultType == "Float")
							  ||
							  (variables[assign.identVar.value].type == "Float" && assign.exp.resultType == "Integer")
							  ||
							  (variables[assign.identVar.value].type == "String" && assign.exp.resultType == "Char")
							  ))
						{
							throw { message: "Nem "+variables[assign.identVar.value].type+" típus: " + assign.exp.resultType };
						}

						// Save assignment as result
						result = assign;
						
						// "\n"
						if (Pseudo.COM.PADDING){
							if (_isMoreToken(index) && tokens[index] != Pseudo.COM.TERMINATOR){
								throw { message: "Hiányzó lezárás!" };
							}else{
								index++;
							}
						}
					}
				}else{
					// If current token is not a variable either
					throw { message: "Ismeretlen azonosító!" };
				}
			}
			
			// Is there a next statement?
			if (index < tokens.length && result.name != "identVar"){
				if (tokens[index] != "}"){
					var seq = { name: "sequence" };
					seq.id = ++id;
					seq.left = result;
					seq.right = _parseStm();
					result = seq;
				}else{
					index++;
				}
			}
			return result;
		}
		// There is no more token
		else{
			return null; 
		}
	};
	
	// Parse an expressions
	var _parseExp = function(stop){
		// Convert expression into a postfix form
		
		var postfix = new Array();	// Array for the postfix form
		var stack = new Array();	// Stack array for re-form
		var lastOp;					// Last saved operator 
		var op;						// Current operator
		
		while ( _isMoreToken(index) && tokens[index] != stop){
			
			//Search for possible keywords
		
			// Minus number value
			if (tokens[index] == "-"){
				if (tokens[index+1] == "-")
					throw { message: "hibás kifejezés" };
				
				op = { name: "number" };
				op.id = ++id;
				op.value = -1;
				op.resultType = "Integer";
				postfix.push(op);
				tokens[index] = "*";
			}
			
			else if (tokens[index] == "not"){
				op = { name: "not" };
				op.id = ++id;
				op.resultType = "Boolean";
				stack.push(op);
				index++;
			}
			
			// Open branch "("
			else if (tokens[index] == "("){
				op = { name: "(" };
				op.id = ++id;
				stack.push(op);
				index++;
			}
			
			// Close branch ")"
			else if (tokens[index] == ")"){
				// Move everything into postfix form until open branch
				lastOp = stack.pop();
				while( typeof(lastOp) != "undefined" && lastOp.name != "(" ){
					/* kivesz */
					postfix.push(lastOp);
					lastOp = stack.pop();
				}
				// There is no open branch
				if (typeof(lastOp) == "undefined")
					throw { message: "túl sok zárójel lezárás" };
					
				//test start
				/*lastOp = stack.pop();
				if (typeof(lastOp) != "undefined")
					if (lastOp.name == "not")
						postfix.push(lastOp);
					else
						stack.push(lastOp);*/
				//test end
					
				index++;
			}
			
			// Positive number value
			else if (_tokenIsDigit(tokens[index])){
				if (/^[0-9]+$/.test(tokens[index]))
				{
					op = { name : "number" };
					op.id = ++id;
					op.value = tokens[index];
					op.constant = false;
					op.resultType = "Integer";
					postfix.push(op);
					index++;
				}
				else
				{
					op = { name : "float" };
					op.id = ++id;
					op.value = tokens[index];
					op.constant = false;
					op.resultType = "Float";
					postfix.push(op);
					index++;
				}
			}
			
			// Constans
			else if (tokens[index] == CONST_TRUE || tokens[index] == CONST_FALSE)
			{
				op = { name : "number" };
				op.id = ++id;
				op.value = tokens[index] == CONST_TRUE ? 1 : 0;
				op.constant = true;
				op.resultType = "Boolean";
				postfix.push(op);
				index++;
			}
			
			// Char
			else if (/^'.'$/.test(tokens[index]))
			{
				op = { name : "char" };
				op.id = ++id;
				op.value = tokens[index].charAt(1);
				op.resultType = "Char";
				postfix.push(op);
				index++;
			}
			
			// Variable
			else if( _isValidVar(tokens[index])){
				op = { name: "identVar" };
				op.id = ++id;
				op.value = tokens[index];
				op.resultType = variables[op.value].type;		
				postfix.push(op);
				index++;
			}
			
			// Anything else in the expression
			else{
				// Unknown keyword
				if ( tokens[index] == "+" || tokens[index] == "*"){
					throw { message: "Nem várt kifejezés!" };
				}else{
					throw { message: "Ismeretlen kifejezés! (" + tokens[index] + ")"};
				}
			}
			
			// Next token is an operator?
			if (op.name != "(" && (
			    tokens[index] == "+"  || tokens[index] == "-"  || tokens[index] == "*"  ||
				tokens[index] == "/"  || tokens[index] == "%"  ||
				((!Pseudo.COM.CASE_SENS && (tokens[index] == "mod")) || (Pseudo.COM.CASE_SENS && (tokens[index] == "MOD"))) ||
				((!Pseudo.COM.CASE_SENS && (tokens[index] == "div"))  || (Pseudo.COM.CASE_SENS && (tokens[index] == "DIV")))  ||
			    tokens[index] == "<"  || tokens[index] == "<=" || tokens[index] == "="  ||
				tokens[index] == ">"  || tokens[index] == ">=" || tokens[index] == "<>" ||
				((!Pseudo.COM.CASE_SENS && (tokens[index] == "and")) || (Pseudo.COM.CASE_SENS && (tokens[index] == "AND"))) ||
				((!Pseudo.COM.CASE_SENS && (tokens[index] == "or"))  || (Pseudo.COM.CASE_SENS && (tokens[index] == "OR")))  ||
				tokens[index] == "&&" || tokens[index] == "||" )){
					
				if ((!Pseudo.COM.CASE_SENS && (tokens[index] == "and")) || (Pseudo.COM.CASE_SENS && (tokens[index] == "AND")))
					tokens[index] = "&&";
					
				if ((!Pseudo.COM.CASE_SENS && (tokens[index] == "or"))  || (Pseudo.COM.CASE_SENS && (tokens[index] == "OR")))
					tokens[index] = "||";
			  
				if (stack.length == 0){
					op = { name: "op" };
					op.type = tokens[index];
					op.id = ++id;
					stack.push(op);
				}else{
					// Check the priority of this operator
					lastOp = stack.pop();
					while (typeof(lastOp) != "undefined" && lastOp.name != "(" && !_opIsFirst(tokens[index], lastOp.type)){
						postfix.push(lastOp);
						lastOp = stack.pop();
					}
					if (typeof(lastOp) != "undefined")
						stack.push(lastOp);
					op = { name: "op" };
					op.type = tokens[index];
					op.id = ++id;
					stack.push(op);
				}
				index++;
			}
		}
		
		// Missing close branch "("
		while (stack.length > 0){
			lastOp = stack.pop();
			if (lastOp == "(") throw { message: "Hiányzó zárójel lezárás!" };
			postfix.push(lastOp);
		}
		
		// Empty expression
		if (postfix.length == 0) throw { message: "Hiányzó kifejezés!" };
		
		// Create tree
		for ( var i=0; i<postfix.length; i++){
			
			// NOT
			if (postfix[i].name == "not")
			{
				postfix[i].item = stack.pop();
				if (postfix[i].item == null)
					throw { message: "Hibás kifejezés!" };
				
				// not is acceptable only after true or false constants,
				// boolean variables, compare operations or after another not
				/*if (!((postfix[i].item.name == "number" &&
					(postfix[i].item.value == 0 || postfix[i].item.value == 1))
					||
					(postfix[i].item.name == "identVar" &&
					variables[postfix[i].item.value].type == "Boolean")
					||
					(postfix[i].item.name == "op" && 
						(postfix[i].item.type == '=' ||
						postfix[i].item.type == '<>' ||
						postfix[i].item.type == '<' ||
						postfix[i].item.type == '<=' ||
						postfix[i].item.type == '>' ||
						postfix[i].item.type == '>=' ||
						postfix[i].item.type == '&&' ||
						postfix[i].item.type == '||'))
					||
					(postfix[i].item.name == "not")))*/
				// TODO: replace with checking the resultType property
				if (!_isNodeBoolean(postfix[i].item, true))
				{
					throw { message: "Nem logikai érték!" };
				}
				stack.push(postfix[i]);
			}
			
			// OP
			else if (postfix[i].name == "op"){
				postfix[i].right= stack.pop();
				postfix[i].left = stack.pop();
				if (postfix[i].right == null || postfix[i].left == null)
				{
					throw { message: "Hibás kifejezés!" };
				}
				
				// Determine the result type of this operator
				// Catch unacceptable operation-value pairs
				/*	Integer:
						+, -, *, /, % -> integer
						<, <=, =...   -> boolean
					Char:
						+             -> string
						<, <=, =...	  -> boolean
					Bool:
						not, and, or  -> boolean
						<, <=, =...	  -> boolean
					Float:
						+, -, *, /	  -> float
						<, <=, =...	  -> boolean
					String:
						+             -> string
						<, <=, =...	  -> bool
						
					+:            Int, Char,       Float, String
					-:            Int,             Float
					*:            Int,             Float
					/:            Int,             Float
					%, DIV, MOD:  Int
					not, and, or:            Bool
					<, <=, =...:  Int, Char, Bool, Float, String
				*/
				if (postfix[i].type == "+")
				{
					if ((postfix[i].left.resultType == "Char" || postfix[i].left.resultType == "String") &&
						(postfix[i].right.resultType == "Char" || postfix[i].right.resultType == "String"))
					{
						// Result will be string always
						throw { message: "String is not implemented yet" };
					}
					else if (postfix[i].left.resultType == "Integer" && postfix[i].right.resultType == "Integer")
					{
						postfix[i].resultType = "Integer";
					}
					else if((postfix[i].left.resultType == "Integer" || postfix[i].left.resultType == "Float") &&
						(postfix[i].right.resultType == "Integer" || postfix[i].right.resultType == "Float"))
					{
						postfix[i].resultType = "Float";
					}
					else
					{
						throw { message: "Nem várt típus!" };
					}
				}
				else if (postfix[i].type == "-" ||
						 postfix[i].type == "*" ||
						 postfix[i].type == "/")
				{
					if (postfix[i].left.resultType == "Integer" && postfix[i].right.resultType == "Integer")
					{
						postfix[i].resultType = "Integer";
					}
					else if((postfix[i].left.resultType == "Integer" || postfix[i].left.resultType == "Float") &&
						(postfix[i].right.resultType == "Integer" || postfix[i].right.resultType == "Float"))
					{
						postfix[i].resultType = "Float";
					}
					else
					{
						throw { message: "Nem várt típus!" };
					}
				}
				else if(postfix[i].type == '%' ||
						postfix[i].type == 'mod' ||
						postfix[i].type == 'div' )
				{
					if (postfix[i].left.resultType == "Integer" && postfix[i].right.resultType == "Integer")
					{
						postfix[i].resultType = "Integer";
					}
					else
					{
						throw { message: "Nem várt típus!" };
					}
				}
				else if(postfix[i].type == '&&' ||
						postfix[i].type == '||')
				{
					if (postfix[i].left.resultType == "Boolean" && postfix[i].right.resultType == "Boolean")
					{
						postfix[i].resultType = "Boolean";
					}
					else
					{
						throw { message: "Nem várt típus!" };
					}
				}
				else if(postfix[i].type == '=' ||
						postfix[i].type == '<>' ||
						postfix[i].type == '<' ||
						postfix[i].type == '<=' ||
						postfix[i].type == '>' ||
						postfix[i].type == '>=' )
				{
					postfix[i].resultType = "Boolean";
				}
				else
				{
					throw { message: "Unhandled operation result type!" };
				}
					
				stack.push(postfix[i]);
			}else{
				stack.push(postfix[i]);
			}
		}
		
		// At this point stack should contain only one object:
		// the root of the expression.
		if (stack.length > 1)
			throw { message: "Hibás kifejezés" };
		
		return stack.pop();
	};
	
	// Is the given variable defined?
	var _isValidVar = function(varIdent){
		if (variables[varIdent] != null) return true;	
		return false;
	};
	
	// Is there any more token?
	var _isMoreToken = function(i){
		if (i < tokens.length){
			return true;
		}else{
			return false;
		}
	};
	
	// Is the given token a number?
	var _tokenIsDigit = function(token){
		return !isNaN(token);
	};
	
	// Has op1 higher priority than op2?
	var _opIsFirst = function(op1, op2){
	
		var indexOp1, indexOp2;
		
		if ( op1 == "not"){
			indexOp1 = ops.indexOf("not");
		}
		else if ( op1 == "+" || op1 == "-"){
			indexOp1 = ops.indexOf("+");
		}
		else if ( op1 == "*" || op1 == "/" || op1 == "%" ||
				  op1 == "div" || op1 == "mod"){
			indexOp1 = ops.indexOf("*");
		}
		else if ( op1 == "<" || op1 == "<=" || op1 == "=" || op1 == "=>" || op1 == ">" || op1 == "<>"){
			indexOp1 = ops.indexOf("<");
		}
		else if ( op1 == "and" || op1 == "or" || op1 == "&&" || op1 == "||"){
			indexOp1 = ops.indexOf("and");
		}
		else if ( op1 == "("){
			indexOp1 = ops.indexOf("(");
		}
		
		if ( op2 == "not"){
			indexOp2 = ops.indexOf("not");
		}
		else if ( op2 == "+" || op2 == "-"){
			indexOp2 = ops.indexOf("+");
		}
		else if ( op2 == "*" || op2 == "/" || op2 == "%" ||
				  op2 == "div" || op2 == "mod"){
			indexOp2 = ops.indexOf("*");
		}
		else if ( op2 == "<" || op2 == "<=" || op2 == "=" || op2 == "=>" || op2 == ">" || op2 == "<>"){
			indexOp2 = ops.indexOf("<");
		}
		else if ( op2 == "and" || op2 == "or" || op2 == "&&" || op2 == "||"){
			indexOp2 = ops.indexOf("and");
		}
		else if ( op2 == "("){
			indexOp2 = ops.indexOf("(");
		}
		
		if ( indexOp1 < indexOp2 ){
			return true;
		}else{
			return false;
		} 
	};
	
	// Is node a boolean type node?
	// If acceptInt = false, then number nodes must come from a constant.
	var _isNodeBoolean = function(node, acceptInt)
	{
		return ((node.name == "number" && (acceptInt || node.constant) &&
				(node.value == 0 || node.value == 1))
				||
				(node.name == "identVar" &&
				variables[node.value].type == "Boolean")
				||
				(node.name == "op" && 
					(node.type == '=' ||
					node.type == '<>' ||
					node.type == '<' ||
					node.type == '<=' ||
					node.type == '>' ||
					node.type == '>=' ||
					node.type == '&&' ||
					node.type == '||'))
				||
				(node.name == "not"));
	};

	// end of private scope
		
	return {
		// Public scope
		Parse: function(_tokens, _variables) { tokens = _tokens; variables = _variables; return _parseStm(0); }
		// End of public scope
	};
};