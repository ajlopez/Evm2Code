
function JavaCompiler() {
	this.compile = function (bytecodes) {
		var result = [];
		var l = bytecodes.length;
		
		for (var k = 0; k < l; k += 2)
			result.push(compileBytecode(bytecodes.substring(k, k + 2)));
		
		return result;
	}
	
	function compileBytecode(bytecode) {
		if (bytecode === '80')
			return 'dup(1);';
	}
}

function createCompiler() {
	return new JavaCompiler();
}

module.exports = {
	compiler: createCompiler
}

