/*
 * Master script of Pseudo 1.0 application.
 */
 
// Generate the main namespace.
var Pseudo = {
	name: "Pseudo",
	
	// Options
	Options: {
		Log: {
			Main: true,
			CPU: true,
			Memory: true,
			Compiler: true,
			Scanner: true,
			Parser: true,
			CodeGenerator: true,
			EnableAll: function(){
				Pseudo.Options.Log.Main = Pseudo.Options.Log.CPU =
				Pseudo.Options.Log.Memory = Pseudo.Options.Log.Compiler =
				Pseudo.Options.Log.Scanner = Pseudo.Options.Log.Parser =
				Pseudo.Options.Log.CodeGenerator = true;
			},
			DisableAll: function(){
				Pseudo.Options.Log.Main = Pseudo.Options.Log.CPU =
				Pseudo.Options.Log.Memory = Pseudo.Options.Log.Compiler =
				Pseudo.Options.Log.Scanner = Pseudo.Options.Log.Parser =
				Pseudo.Options.Log.CodeGenerator = false;
			}
		}
	}
}

// Init method for initialising the main application object.
// This is the constructor of the application.
Pseudo.Init = function(_printMethod)
{
	Pseudo._log("Init started");
	
	// private scope
	
	// print method
	if (!_printMethod || !(_printMethod instanceof Function))
	{
		Pseudo._log("ERROR: Print method has to be assigned!");
		return;
	}
	
	try{
		var cpu = Pseudo.CPU.Init(_printMethod);
		var memory = Pseudo.Memory.Init();
		var compiler = Pseudo.COM.Init();
	}
	catch(e)
	{
		Pseudo._log("ERROR: " + e.message);
		return;
	}
	//test run
	/*com.AddVariable("i", "seged", "integer", { i: false, m: true, o: true });
	var code = "i <- 2 + 5 * 7 " + "\n" + "KI: i";
	com.Compile(mem, code);
	
	try{
		var ip = mem.Read(0);
		Pseudo._log("Set IP to: " + ip); 
		cpu.SetInstructionPointer(ip);
		var max = mem.Read(1);
		
		console.log("memory contains the following:");
		for (i = ip; i <= max; i++)
		{
			console.log(i +": "+mem.Read(i));
		}
		console.log("memory end, start run");
		
		while(cpu.GetInstructionPointer() <= max){
			var inst = mem.Read(cpu.GetInstructionPointer());
			Pseudo._log("Try to run: " + inst);
			var callback = cpu.Execute(inst);
			if (callback != null && typeof(callback) === "function")
				callback(mem);
		}
	}catch(e){
		Pseudo._log("ERROR: " + e.message);
	}*/
	//end of test run
	
	// Private method for variable declaration
	// Method returns true if declaration was successful or throw an exception.
	var _addVariable = function(name, func, type, mods){
		if (!compiler.AddVariable(name, func, type, { i: mods.i, m: mods.m, o: mods.o }))
		{
			throw { message: "Variable " + name + " is already exists!"};
		}
		return true;
	};
	
	// Private method for clear all variable
	var _clearVariables = function(){
		compiler.ClearVariables();
	};
	
	// Private method for compile the given code
	// Method returns true if there wasn't any error or throw an exception.
	var _compile = function(code){
		return compiler.Compile(memory, code);
	};
	
	// Private method for start to run the given code
	// Method returns true if there wasn't any error or throw an exception.
	var _run = function(code, mode){
		try{
			//TODO: remove
			//clear memory
			memory.Clear();
		
			// compile the given code
			_compile(code);
			
			// set the instruction pointer for the first address
			// of the compiled code
			var ip = memory.Read(0);
			Pseudo._log("Set IP to: " + ip); 
			cpu.SetInstructionPointer(ip);
			// load address of the end of the compiled code
			var max = memory.Read(1);
		
			// write the compiled code into the console
			Pseudo._log("memory contains the following:");
			for (var i = ip; i <= max; i++)
			{
				Pseudo._log(i +": "+memory.Read(i));
			}
			Pseudo._log("memory end, start run");
		
			// start running
			while(cpu.GetInstructionPointer() <= max){
				// load the next instruction
				var inst = memory.Read(cpu.GetInstructionPointer());
				Pseudo._log("Try to run: " + inst);
				// execute the instruction and if it returns a callback function
				// then execute the callback function also
				var callback = cpu.Execute(inst);
				if (callback != null && typeof(callback) === "function")
					callback(memory);
			}
			return true;
		}catch(e){
			// write the exception into the console and throw it
			Pseudo._log("ERROR: " + e.message);
			throw e;
		}
	};
	// end of private declarations
	
	
	// Check the support of the current browser
	// Method does not return any object if there was an error,
	// else it returns an object that contains the public methods.
	if (!Pseudo.IsBrowserSupports()){
		Pseudo._log("Not Supported");
	}
	else	
	{
		Pseudo._log("Supported");
		return {
			// public scope
			AddVariable: function(name, func, type, mods){ return _addVariable(name, func, type, mods); },
			ClearVariables: function(){ _clearVariables(); },
			GetVariable: function(){},
			RemoveVariable: function(){},
			Compile: function(code){ return _compile(code); },
			Run: function(code, mode){ return _run(code, mode); },
			PrintMethod: undefined
			// end of public declarations
		}
	}
}

/* 
 * Add method for checking, does the current browser support
 * our application. This method will call methods defined with
 * the same name in the sub-namespaces.
 */
Pseudo.IsBrowserSupports = function()
{
	Pseudo._log("");
	Pseudo._log("*** Collect support checking methods ***");
	try{	
		
		// Find the appropriate methods
		var supportMethods = this._findMethods(Pseudo, /^IsBrowserSupports$/);
		
		Pseudo._log("Total number of found functions: " + supportMethods.length);
		Pseudo._log("*** Support checking started ***");
		
		
		Pseudo._log("*** Checking support of main namespace *** ");
		// Call every critical method of the main namespace for test.
		// TODO!
		
		// Call every method returned by collector method
		for (var i=0; i<supportMethods.length; i++)
		{
			Pseudo._log("function #" + i);
			supportMethods[i]();
			Pseudo._log("done");
		}
		
		// If we reach this point, that means everything is OK
		Pseudo._log("*** Support checking ended with result TRUE ***");
		return true;
	}catch(e){
		// If there was any problem: display the issue to the user.
		
		// TODO: display error
		Pseudo._log("!X! Error: " + e.message);
		
		Pseudo._log("*** Support checking ended with result FALSE ***");
		return false;
	}
}

/*
 * Method will search for functions defined with the given
 * name in every function contained by the passed function.
 * Found functions will be collected and returned.
 */
 //TODO! Try to replace specfunction with simple string that
 //can be added as parameter depends on the name of the caller function
Pseudo._findMethods = function(namespace, specFunction){
	
	//console.log("Start lookup in: " + namespace.name);
	var methods = [];
	// check every function in the passed namespace
	for (var name1 in namespace) {
        if (namespace.hasOwnProperty(name1)) {
			
			//console.log("- Check: " + name1);
            var subNamespace = namespace[name1];
			// check every function in this sub-function
			for (var name2 in subNamespace) {
				if (subNamespace.hasOwnProperty(name2)) {
					//console.log("  +- Check: " + name2);
					var fn = subNamespace[name2];

					if (typeof fn === "function") {
						if (specFunction.test(name2)) {
							//console.log("     FOUNDED!");
							methods.push(fn);
							//search again in the founded sub-name-space 
							var methods2 = Pseudo._findMethods(subNamespace, specFunction);
							//console.log("save result");
							//add the returning methods to our list
							methods = methods.concat(methods2);
						}
					}
                }
            }
        }
    }
	return methods;
}

/*
 * Log function
 */
Pseudo._log = function(msg){
	if (Pseudo.Options.Log.Main)
		console.log(msg);
}