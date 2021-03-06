
const compilers = require('../../lib/compilers/java');
const hexas = "0123456789abcdef";

exports['create compiler as object'] = function (test) {
	const compiler = compilers.compiler();
	
	test.ok(compiler);
	test.equal(typeof compiler, 'object');
}

exports['compile stop bytecode'] = function (test) {
	const compiler = compilers.compiler();
	
	const result = compiler.compile('00');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 2);
	test.equal(result[0], 'stop()');
	test.equal(result[1], 'return');
}

exports['compile dup1 bytecode'] = function (test) {
	const compiler = compilers.compiler();
	
	const result = compiler.compile('80');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'dup(1)');
}

exports['compile dup bytecodes'] = function (test) {
	const compiler = compilers.compiler();
	
	for (let k = 0; k < 16; k++) {
		const result = compiler.compile('8' + hexas[k]);
		
		test.ok(result);
		test.ok(Array.isArray(result));
		test.equal(result.length, 1);
		test.equal(result[0], 'dup(' + (k + 1) + ')');
	}
}

exports['compile push bytecodes'] = function (test) {
	const compiler = compilers.compiler();
	
	for (let k = 0; k < 32; k++) {
        let code = (6 + (k >= 16 ? 1 : 0)).toString();
        code += hexas[(k % 16)];
        
        for (let j = 0; j <= k; j++)
            code += '0' + hexas[(j % 16)];
        
		const result = compiler.compile(code);

		test.ok(result);
		test.ok(Array.isArray(result));
		test.equal(result.length, 1);
        
        if (k < 8)
            test.equal(result[0], 'push(0x' + code.substring(2) + ')');
        else
            test.equal(result[0], 'push("' + code.substring(2) + '")');
	}
}

exports['compile swap bytecodes'] = function (test) {
	const compiler = compilers.compiler();
	
	for (let k = 0; k < 16; k++) {
		const result = compiler.compile('9' + hexas[k]);
		
		test.ok(result);
		test.ok(Array.isArray(result));
		test.equal(result.length, 1);
		test.equal(result[0], 'swap(' + (k + 1) + ')');
	}
}

exports['compile memory bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('515253');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 3);
	test.equal(result[0], 'mload()');
	test.equal(result[1], 'mstore()');
	test.equal(result[2], 'mstore8()');
}

exports['compile storage bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('5455');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 2);
	test.equal(result[0], 'sload()');
	test.equal(result[1], 'sstore()');
}

exports['compile arithmetic operations bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('0102030405060708090a0b');
	
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

exports['compile arithmetic operations bytecodes with upper case hexadigits'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('0102030405060708090A0B');
	
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

exports['compile comparison operations bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('1011121314');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 5);
	test.equal(result[0], 'lt()');
	test.equal(result[1], 'gt()');
	test.equal(result[2], 'slt()');
	test.equal(result[3], 'sgt()');
	test.equal(result[4], 'eq()');
}

exports['compile log bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('a0a1a2a3a4');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 5);
	test.equal(result[0], 'log(0)');
	test.equal(result[1], 'log(1)');
	test.equal(result[2], 'log(2)');
	test.equal(result[3], 'log(3)');
	test.equal(result[4], 'log(4)');
}

exports['compile gas bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('5a');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'gas()');
}

exports['compile pc bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('58');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'pc()');
}

exports['compile msize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('59');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'msize()');
}

exports['compile gaslimit bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('45');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'gaslimit()');
}

exports['compile address bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('30');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'address()');
}

exports['compile balance bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('31');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'balance()');
}

exports['compile chainid bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('46');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'chainid()');
}

exports['compile selfbalance bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('47');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'selfbalance()');
}

exports['compile origin bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('32');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'origin()');
}

exports['compile caller bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('33');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'caller()');
}

exports['compile callvalue bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('34');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'callvalue()');
}

exports['compile calldataload bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('35');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'calldataload()');
}

exports['compile calldatasize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('36');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'calldatasize()');
}

exports['compile calldatacopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('37');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'calldatacopy()');
}

exports['compile codesize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('38');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'codesize()');
}

exports['compile codecopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('39');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'codecopy()');
}

exports['compile gasprice bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3a');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'gasprice()');
}

exports['compile extcodesize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3b');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'extcodesize()');
}

exports['compile extcodehash bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3f');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'extcodehash()');
}

exports['compile extcodecopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3c');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'extcodecopy()');
}

exports['compile returndatasize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3d');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'returndatasize()');
}

exports['compile returndatacopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3e');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'returndatacopy()');
}

exports['compile blockhash bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('40');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'blockhash()');
}

exports['compile coinbase bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('41');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'coinbase()');
}

exports['compile timestamp bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('42');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'timestamp()');
}

exports['compile number bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('43');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'number()');
}

exports['compile difficulty'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('44');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'difficulty()');
}

exports['compile create bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f0');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'create()');
}

exports['compile call bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f1');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'call()');
}

exports['compile callcode bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f2');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'callcode()');
}

exports['compile return bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f3');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'return()');
}

exports['compile delegatecall bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f4');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'delegatecall()');
}

exports['compile suicide bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('ff');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'suicide()');
}

exports['compile pop bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('50');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'pop()');
}
