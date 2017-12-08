
var Compiler = require('./compiler').Compiler;

var table = {
    // stop with return
    '00': [ "stop()", "return" ],
    
	// arithmetic opcodes
	'01': 'add()',
	'02': 'sub()',
	'03': 'mul()',
	'04': 'div()',
	'05': 'sdiv()',
	'06': 'mod()',
	'07': 'smod()',
	'08': 'addmod()',
	'09': 'mulmod()',
	'0a': 'exp()',
	'0b': 'signextend()',
    
    // comparison opcodes
    '10': 'lt()',
    '11': 'gt()',
    '12': 'slt()',
    '13': 'sgt()',
    '14': 'eq()',
	
	// memory opcodes
	'51': 'mload()',
	'52': 'mstore()',
	'53': 'mstore8()',
	
	// storage opcodes
	'54': 'sload()',
	'55': 'sstore()',
	
	// dup opcodes
	'80': 'dup(1)',
	'81': 'dup(2)',
	'82': 'dup(3)',
	'83': 'dup(4)',
	'84': 'dup(5)',
	'85': 'dup(6)',
	'86': 'dup(7)',
	'87': 'dup(8)',
	'88': 'dup(9)',
	'89': 'dup(10)',
	'8a': 'dup(11)',
	'8b': 'dup(12)',
	'8c': 'dup(13)',
	'8d': 'dup(14)',
	'8e': 'dup(15)',
	'8f': 'dup(16)',
	
	// swap opcodes
	'90': 'swap(1)',
	'91': 'swap(2)',
	'92': 'swap(3)',
	'93': 'swap(4)',
	'94': 'swap(5)',
	'95': 'swap(6)',
	'96': 'swap(7)',
	'97': 'swap(8)',
	'98': 'swap(9)',
	'99': 'swap(10)',
	'9a': 'swap(11)',
	'9b': 'swap(12)',
	'9c': 'swap(13)',
	'9d': 'swap(14)',
	'9e': 'swap(15)',
	'9f': 'swap(16)'
};

function JavaCompiler() {
	this.compileBytecode = function (bytecode) {
		return table[bytecode];
	}
}

// from SimpleTensor
JavaCompiler.prototype = Object.create(Compiler.prototype);
JavaCompiler.prototype.constructor = JavaCompiler;

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
}

