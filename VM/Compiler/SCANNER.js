/*
 * Scanner
 *
 * @author Edem
 * @version 1.0
 */

// Name-space for the scanner object
Pseudo.COM.Scanner = {
	name: "Scanner"
};

// Constructor method for initialising the scanner object
Pseudo.COM.Scanner.Init = function(){
	
	// private scope

	// log
	var _log = function(mit){
		if (Pseudo.Options.Log.Scanner){
			console.log( this.name + ": " + mit ); 
		}
	};
	_log("Scanner Init started");
	
	// Private method for scanning the given code for syntax errors
	var _scan = function(inputText){
		
		if (inputText.length == 0){
			// Empty code string was given
			throw { message: "A beviteli mező üres!"};
		}else{
			
			var padding = -1;	// padding counter variable
			var tokens = [];	// array for the tokens created from the given code
			var actPadding = 0;	// actual row padding value
			var i = 0;			// index of actual character in input code
			var row = 1;		// index of the actual row in input code
			var col = 0;		// index of the actual column in input code
			
			
			// Scan every character in input code one-by-one
			while (inputText.charAt(i) != ""){

				// Count row number for error messages
				if (inputText.charAt(i) == "\n"){ row++; col = i;}
					
				// Check beginning of the row for padding
				if (Pseudo.COM.PADDING){
					if (((i>0) && (inputText.charAt(i-1)=="\n")) || (i==0)){
						actPadding = 0;
						while( (inputText.charAt(i) != "") && (_isWhiteChar(inputText.charAt(i))) && (inputText.charAt(i) != "\n") ){
							actPadding++;
							i++;
						}
						// Skip empty rows
						if (inputText.charAt(i) == "\n" || inputText.charAt(i) == ""){
							actPadding = 0;
							row++;
							col = i;
						}else{
							if(actPadding%2 == 1 ){
								throw { message: "Érvénytelen behúzás! "+row+". sor, "+(i-col)+". oszlop"};
							}else{
								// Add token of core begin - except the first row
								if( (actPadding/2)-padding == 1){
									if (padding >= 0){
										tokens.push("{");
									}
									padding++;
								}else if((actPadding/2)-padding >= 1){
									throw { message: "Érvénytelen behúzás! "+row+". sor, "+(i-col)+". oszlop"};
								}
								// Add token of core end
								else if (padding > (actPadding/2)){
									for(var j=padding; j>(actPadding/2); j--){
										tokens.push("}");
										padding--;
									}
								}
							}
						}
					}
				}
					
				// Add statement terminator
				if (inputText.charAt(i)==Pseudo.COM.TERMINATOR && (Pseudo.COM.PADDING && tokens.length>0 && (tokens[tokens.length-1]!="\n"))){  
					tokens.push(Pseudo.COM.TERMINATOR);
				}
					
				// Add word
				else if (_isLetter(inputText.charAt(i))){
					var sztring = inputText.charAt(i);
	
					while ((inputText.charAt(i+1) != "") && (_isLetter(inputText.charAt(i+1)) || _isDigit(inputText.charAt(i+1))) ){
						sztring += inputText.charAt(i+1);
						i++;
					}
					if (!Pseudo.COM.CASE_SENS) sztring = sztring.toLowerCase();
					tokens.push(sztring);
				}
				
				// Add char constants
				else if (inputText.charAt(i) == "'")
				{
					if (inputText.charAt(i+1) != "" && 
						inputText.charAt(i+2) != "" && inputText.charAt(i+2) == "'")
					{
						var sztring = "" + inputText.charAt(i)+ inputText.charAt(i+1)+ inputText.charAt(i+2);
						i = i + 2;
						tokens.push(sztring);
					}
					else
					{
						throw { message: "Hibás karakter konstans" };
					}
				}
					
				// Skip white characters
				else if ( _isWhiteChar(inputText.charAt(i)) ){
					  
				}
				  
				// Add numbers
				else if ( _isDigit(inputText.charAt(i))){
					var sztring = inputText.charAt(i);
					while ((inputText.charAt(i+1) != "") && (_isDigit(inputText.charAt(i+1)) || (inputText.charAt(i+1) == '.')) ){
						sztring += inputText.charAt(i+1);
						i++;
					}
					tokens.push(sztring);
				}
					
				// Add bracer, commas, etc.
				// ( ) [ ] , :
				else if ( inputText.charAt(i)=="(" || inputText.charAt(i)==")" ||
						  inputText.charAt(i)=="," || inputText.charAt(i)==":" ||
						  inputText.charAt(i)=="[" || inputText.charAt(i)=="]" ){
					tokens.push(inputText.charAt(i));
				}
					
				// Add operators starting with character '<'
				// <- < <= <>
				else if (inputText.charAt(i)=="<"){
					if ( (inputText.charAt(i+1) != "") && (inputText.charAt(i+1)=="-") ){ tokens.push("<-"); i++;}
					else if ( (inputText.charAt(i+1) != "") && (inputText.charAt(i+1)=="=") ){ tokens.push("<="); i++;}
					else if ( (inputText.charAt(i+1) != "") && (inputText.charAt(i+1)==">") ){ tokens.push("<>"); i++;}
					else tokens.push("<"); 
				}
					
				// Add operators starting with character '>'
				// >= > 
				else if (inputText.charAt(i)==">"){
					if ( (inputText.charAt(i+1) != "") && (inputText.charAt(i+1)=="=") ){ tokens.push(">="); i++;}
					else tokens.push(">");
				}
				
				// Add operator =
				else if (inputText.charAt(i)=="="){
					tokens.push("=");
				}
				
				// Add arithmetic operators
				// + - / *
				else if (_isArithmetic(inputText.charAt(i))){
					tokens.push(inputText.charAt(i));
				}	
				
				// If padding check ends at the end of the current row
				else if(inputText.charAt(i)==""){}
				
				// Unknown character
				else{
					throw { message: "Ismeretlen karakter!"+row+". sor, "+(i-col)+". oszlop"};
				}
					
				i++;
			}
			if (padding > 0){
				if( Pseudo.COM.PADDING && tokens.length>0 && tokens[tokens.length-1]!="\n") tokens.push("\n");
				// Add core end token
				for(var j=padding; j>0; j--){
					tokens.push("}");
					padding--;
				}
			}
		}
		return tokens;
	};
	
	// Private method for determine is the given character white character
	var _isWhiteChar = function(charr){
	  var regexp = new RegExp("\\s");
		return regexp.test(charr);
	};
	
	// Private method for determine is the given character alpha character
	var _isLetter = function(charr){
	  var regexp = new RegExp("[A-Za-z]");
		return regexp.test(charr);
	};
	
	// Private method for determine is the given character numeric character
	var _isDigit = function(charr){
	  var regexp = new RegExp("[0-9]");
		return regexp.test(charr);
	};
	
	// Private method for determine is the given character arithmetic operator
	var _isArithmetic = function(charr){
	  var regexp = new RegExp("[+-/*]");
		return regexp.test(charr);
	};
	
	// End of private scope
	
	return {
		// Public scope
		Scan: function(input){ return _scan(input); }
		// End of public scope
	}
	
};