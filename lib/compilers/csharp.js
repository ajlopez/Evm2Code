
var Compiler = require('./compiler').Compiler;

var table = {
    // stop with return
    '00': [ "Stop()", "return" ],
    
	// arithmetic pcodes
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
	
    // comparison opcodes
    '10': 'Lt()',
    '11': 'Gt()',
    '12': 'Slt()',
    '13': 'Sgt()',
    '14': 'Eq()',
	
	// call opcodes
	'30': 'Address()',
	'31': 'Balance()',
	'32': 'Origin()',
	'33': 'Caller()',
	'34': 'CallValue()',
	'35': 'CallDataLoad()',
	'36': 'CallDataSize()',
	'37': 'CallDataCopy()',
	'38': 'CodeSize()',
	'39': 'CodeCopy()',
	'3a': 'GasPrice()',
	'3b': 'ExtCodeSize()',
	'3c': 'ExtCodeCopy()',
	'3d': 'ReturnDataSize()',
	'3e': 'ReturnDataCopy()',

	'40': 'BlockHash()',
	'41': 'CoinBase()',
	'42': 'TimeStamp()',
	'43': 'Number()',
	'44': 'Difficulty()',

	// gas limit opcode
	'45': 'GasLimit()',
    
    // pop
    '50': 'Pop()',
	
	// memory opcodes
	'51': 'MLoad()',
	'52': 'MStore()',
	'53': 'MStore8()',
	
	// storage opcodes
	'54': 'SLoad()',
	'55': 'SStore()',

	// program counter opcode
	'58': 'Pc()',

	// active memory size opcode
	'59': 'MSize()',

	// gas opcode
	'5a': 'Gas()',

    // generic push opcode
    '60': 'Push',
	
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
	'9f': 'Swap(16)',

	// log opcodes
	'a0': 'Log(0)',
	'a1': 'Log(1)',
	'a2': 'Log(2)',
	'a3': 'Log(3)',
	'a4': 'Log(4)',
	
	'f0': 'Create()',
	'f1': 'Call()',
	'f2': 'CallCode()',
	'f3': 'Return()',
	'f4': 'DelegateCall()',
	'ff': 'Suicide()',
};

function CSharpCompiler() {
	this.compileBytecode = function (bytecode, value) {
        if (!value)
            return table[bytecode];
        
        if (value.length <= 16)
            return table[bytecode] + '(0x' + value + ')';
        
        return table[bytecode] + '("' + value + '")';
	}
}

// from SimpleTensor
CSharpCompiler.prototype = Object.create(Compiler.prototype);
CSharpCompiler.prototype.constructor = CSharpCompiler;

function createCompiler() {
	return new CSharpCompiler();
}

module.exports = {
	compiler: createCompiler
}

