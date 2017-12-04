
var compilers = require('../../lib/compilers/java');
var hexas = "0123456789abcdef";

exports['create compiler as object'] = function (test) {
	var compiler = compilers.compiler();
	
	test.ok(compiler);
	test.equal(typeof compiler, 'object');
}

exports['compile stop bytecode'] = function (test) {
	var compiler = compilers.compiler();
	
	var result = compiler.compile('00');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 2);
	test.equal(result[0], 'stop()');
	test.equal(result[1], 'return');
}

exports['compile dup1 bytecode'] = function (test) {
	var compiler = compilers.compiler();
	
	var result = compiler.compile('80');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'dup(1)');
}

exports['compile dup bytecodes'] = function (test) {
	var compiler = compilers.compiler();
	
	for (var k = 0; k < 16; k++) {
		var result = compiler.compile('8' + hexas[k]);
		
		test.ok(result);
		test.ok(Array.isArray(result));
		test.equal(result.length, 1);
		test.equal(result[0], 'dup(' + (k + 1) + ')');
	}
}

exports['compile swap bytecodes'] = function (test) {
	var compiler = compilers.compiler();
	
	for (var k = 0; k < 16; k++) {
		var result = compiler.compile('9' + hexas[k]);
		
		test.ok(result);
		test.ok(Array.isArray(result));
		test.equal(result.length, 1);
		test.equal(result[0], 'swap(' + (k + 1) + ')');
	}
}

exports['compile memory bytecodes'] = function (test) {
	var compiler = compilers.compiler();

	var result = compiler.compile('515253');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 3);
	test.equal(result[0], 'mload()');
	test.equal(result[1], 'mstore()');
	test.equal(result[2], 'mstore8()');
}

exports['compile storage bytecodes'] = function (test) {
	var compiler = compilers.compiler();

	var result = compiler.compile('5455');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 2);
	test.equal(result[0], 'sload()');
	test.equal(result[1], 'sstore()');
}

exports['compile arithmetic operations bytecodes'] = function (test) {
	var compiler = compilers.compiler();

	var result = compiler.compile('0102030405060708090a0b');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 11);
	test.equal(result[0], 'add()');
	test.equal(result[1], 'sub()');
	test.equal(result[2], 'mul()');
	test.equal(result[3], 'div()');
	test.equal(result[4], 'sdiv()');
	test.equal(result[5], 'mod()');
	test.equal(result[6], 'smod()');
	test.equal(result[7], 'addmod()');
	test.equal(result[8], 'mulmod()');
	test.equal(result[9], 'exp()');
	test.equal(result[10], 'signextend()');
}



