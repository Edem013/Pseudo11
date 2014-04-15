/*
 * Script for implement memory
 */

// Namespace for memory
Pseudo.Memory = {
	
	name : "Memory"
}

// Constructor method for initializing a memory object
Pseudo.Memory.Init = function(){
	
	// private scope
	
	// log 
	var _log = function(mit){
	  if (Pseudo.Options.Log.Memory){
	    console.log( Pseudo.Memory.name + ": " + mit );
	  }
	};
	_log("Memory Init started");
	
	// array for memory
	var memory = [];
	
	// random or clean memory
	var cleanMemory = true;
	
	// Private method for set up the memory with random or zero values
	var _memoryClear = function(){
		_log('clear memory');
		for(var i=2; i<0xFFFF; i++){
			if (cleanMemory){
				memory[i] = 0;
			}else{
				//memory[i] = Math.floor(Math.random()*0xFF);
			}
		}
	};
	
	// Private method for get the value stored at the given address
	var _read = function( address ){
		if ( address < 0x0002 || address > 0x0643)
			_log('ReadMemory From '+address+' - '+memory[address]);
		
		return memory[address];
	};
	
	// Private method for set the given value into the given address
	var _write = function( address, value ){
		memory[address] = value;
	};
		
	// The first address where the compiled code starts
	_write(0,0x0644);
	
	// The last address where the compiled code ends
	_write(1,0x0645);
	
	// Screen memory part: cursor 1 byte + 20*80 byte 
	// 2-1603
	_write(2,0x0000);
	
	//  /------------------memory -----------------------\
	//  | addr | value                                   |
	//  |------+-----------------------------------------|
	//  |  0   | Address of the first instruction (1604) |
	//  |  1   | Address of the last instuction          |
	//  |  2   | 1 character for screen                  |
	//  | ...                                            |
	//  | 1603 | 1 character for screen                  |
	//  | 1604 | First instruction of the compiled code  |
	//  | ...
	
	return {
		// Public scope
		Read: function(address){ return _read(address);},
		Write: function(address, value){ _write(address, value); },
		Clear: function(){ _memoryClear(); }
		// End of public scope
	};

};