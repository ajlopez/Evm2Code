
const compilers = require('../../lib/compilers/csharp');
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
	test.equal(result[0], 'Stop()');
	test.equal(result[1], 'return');
}

exports['compile dup1 bytecode'] = function (test) {
	const compiler = compilers.compiler();
	
	const result = compiler.compile('80');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Dup(1)');
}

exports['compile dup bytecodes'] = function (test) {
	const compiler = compilers.compiler();
	
	for (let k = 0; k < 16; k++) {
		const result = compiler.compile('8' + hexas[k]);
		
		test.ok(result);
		test.ok(Array.isArray(result));
		test.equal(result.length, 1);
		test.equal(result[0], 'Dup(' + (k + 1) + ')');
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
            test.equal(result[0], 'Push(0x' + code.substring(2) + ')');
        else
            test.equal(result[0], 'Push("' + code.substring(2) + '")');
	}
}

exports['compile swap bytecodes'] = function (test) {
	const compiler = compilers.compiler();
	
	for (let k = 0; k < 16; k++) {
		const result = compiler.compile('9' + hexas[k]);
		
		test.ok(result);
		test.ok(Array.isArray(result));
		test.equal(result.length, 1);
		test.equal(result[0], 'Swap(' + (k + 1) + ')');
	}
}

exports['compile memory bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('515253');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 3);
	test.equal(result[0], 'MLoad()');
	test.equal(result[1], 'MStore()');
	test.equal(result[2], 'MStore8()');
}

exports['compile storage bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('5455');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 2);
	test.equal(result[0], 'SLoad()');
	test.equal(result[1], 'SStore()');
}

exports['compile arithmetic operations bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('0102030405060708090a0b');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 11);
	test.equal(result[0], 'Add()');
	test.equal(result[1], 'Sub()');
	test.equal(result[2], 'Mul()');
	test.equal(result[3], 'Div()');
	test.equal(result[4], 'Sdiv()');
	test.equal(result[5], 'Mod()');
	test.equal(result[6], 'SMod()');
	test.equal(result[7], 'AddMod()');
	test.equal(result[8], 'MulMod()');
	test.equal(result[9], 'Exp()');
	test.equal(result[10], 'SignExtend()');
}

exports['compile arithmetic operations bytecodes with upper case hexadigits'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('0102030405060708090A0B');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 11);
	test.equal(result[0], 'Add()');
	test.equal(result[1], 'Sub()');
	test.equal(result[2], 'Mul()');
	test.equal(result[3], 'Div()');
	test.equal(result[4], 'Sdiv()');
	test.equal(result[5], 'Mod()');
	test.equal(result[6], 'SMod()');
	test.equal(result[7], 'AddMod()');
	test.equal(result[8], 'MulMod()');
	test.equal(result[9], 'Exp()');
	test.equal(result[10], 'SignExtend()');
}

exports['compile comparison operations bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('1011121314');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 5);
	test.equal(result[0], 'Lt()');
	test.equal(result[1], 'Gt()');
	test.equal(result[2], 'Slt()');
	test.equal(result[3], 'Sgt()');
	test.equal(result[4], 'Eq()');
}

exports['compile log bytecodes'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('a0a1a2a3a4');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 5);
	test.equal(result[0], 'Log(0)');
	test.equal(result[1], 'Log(1)');
	test.equal(result[2], 'Log(2)');
	test.equal(result[3], 'Log(3)');
	test.equal(result[4], 'Log(4)');
}

exports['compile gas bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('5a');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Gas()');
}

exports['compile pc bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('58');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Pc()');
}

exports['compile msize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('59');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'MSize()');
}

exports['compile gaslimit bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('45');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'GasLimit()');
}

exports['compile address bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('30');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Address()');
}

exports['compile balance bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('31');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Balance()');
}

exports['compile selfbalance bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('47');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'SelfBalance()');
}

exports['compile origin bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('32');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Origin()');
}

exports['compile caller bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('33');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Caller()');
}

exports['compile callvalue bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('34');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CallValue()');
}

exports['compile calldataload bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('35');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CallDataLoad()');
}

exports['compile calldatasize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('36');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CallDataSize()');
}

exports['compile calldatacopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('37');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CallDataCopy()');
}

exports['compile codesize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('38');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CodeSize()');
}

exports['compile codecopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('39');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CodeCopy()');
}

exports['compile gasprice bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3a');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'GasPrice()');
}

exports['compile extcodesize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3b');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'ExtCodeSize()');
}

exports['compile extcodehash bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3f');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'ExtCodeHash()');
}

exports['compile extcodecopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3c');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'ExtCodeCopy()');
}

exports['compile returndatasize bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3d');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'ReturnDataSize()');
}

exports['compile returndatacopy bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('3e');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'ReturnDataCopy()');
}

exports['compile blockhash bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('40');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'BlockHash()');
}

exports['compile coinbase bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('41');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CoinBase()');
}

exports['compile timestamp bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('42');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'TimeStamp()');
}

exports['compile number bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('43');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Number()');
}

exports['compile difficulty'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('44');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Difficulty()');
}

exports['compile create bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f0');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Create()');
}

exports['compile call bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f1');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Call()');
}

exports['compile callcode bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f2');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'CallCode()');
}

exports['compile return bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f3');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Return()');
}

exports['compile delegatecall bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('f4');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'DelegateCall()');
}

exports['compile suicide bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('ff');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Suicide()');
}

exports['compile pop bytecode'] = function (test) {
	const compiler = compilers.compiler();

	const result = compiler.compile('50');
	
	test.ok(result);
	test.ok(Array.isArray(result));
	test.equal(result.length, 1);
	test.equal(result[0], 'Pop()');
}
