
function Compiler() {

}

Compiler.prototype.compile = function (bytecodes) {
    var result = [];
    var l = bytecodes.length;
    bytecodes = bytecodes.toLowerCase();
    
    for (var k = 0; k < l; k += 2) {
        var bytecode = bytecodes.substring(k, k + 2);
        
        if (bytecode[0] === '6') {
            var value = bytecodes.substring(k + 2, k + 2 + 2 * (parseInt(bytecode[1], 16) + 1));
            var code = this.compileBytecode('60', value);
            k += value.length;
        }
        else if (bytecode[0] === '7') {
            var value = bytecodes.substring(k + 2, k + 2 + 2 * (parseInt(bytecode[1], 16) + 1 + 16));
            var code = this.compileBytecode('60', value);
            k += value.length;
        }
        else
            var code = this.compileBytecode(bytecode);
                    
        if (Array.isArray(code))
            result = result.concat(code);
        else
            result.push(code);
    }
    
    return result;
}


module.exports = {
	Compiler: Compiler
}

