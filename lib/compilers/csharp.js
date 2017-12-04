
var table = {
	// arithmetic operation opcodes
	'01': 'Add()',
	'02': 'Sub()',
	'03': 'Mul()',
	'04': 'Div()',
	'05': 'Sdiv()',
	'06': 'Mod()',
	'07': 'SMod()',
	'08': 'AddMod()',
	'09': 'MulMod()',
	'0a': 'Exp()',
	'0b': 'SignExtend()',
	
	// memory opcodes
	'51': 'MLoad()',
	'52': 'MStore()',
	'53': 'MStore8()',
	
	// storage opcodes
	'54': 'SLoad()',
	'55': 'SStore()',
	
	// dup opcodes
	'80': 'Dup(1)',
	'81': 'Dup(2)',
	'82': 'Dup(3)',
	'83': 'Dup(4)',
	'84': 'Dup(5)',
	'85': 'Dup(6)',
	'86': 'Dup(7)',
	'87': 'Dup(8)',
	'88': 'Dup(9)',
	'89': 'Dup(10)',
	'8a': 'Dup(11)',
	'8b': 'Dup(12)',
	'8c': 'Dup(13)',
	'8d': 'Dup(14)',
	'8e': 'Dup(15)',
	'8f': 'Dup(16)',
	
	// swap opcodes
	'90': 'Swap(1)',
	'91': 'Swap(2)',
	'92': 'Swap(3)',
	'93': 'Swap(4)',
	'94': 'Swap(5)',
	'95': 'Swap(6)',
	'96': 'Swap(7)',
	'97': 'Swap(8)',
	'98': 'Swap(9)',
	'99': 'Swap(10)',
	'9a': 'Swap(11)',
	'9b': 'Swap(12)',
	'9c': 'Swap(13)',
	'9d': 'Swap(14)',
	'9e': 'Swap(15)',
	'9f': 'Swap(16)'
};

function JavaCompiler() {
	this.compile = function (bytecodes) {
		var result = [];
		var l = bytecodes.length;
		
		for (var k = 0; k < l; k += 2)
			result.push(compileBytecode(bytecodes.substring(k, k + 2)));
		
		return result;
	}
	
	function compileBytecode(bytecode) {
		return table[bytecode] + ';';
	}
}

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
}

