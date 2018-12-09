
function Compiler() {

}

Compiler.prototype.compile = function (bytecodes) {
    var result = [];
    var l = bytecodes.length;
    bytecodes = bytecodes.toLowerCase();
    
    for (var k = 0; k < l; k += 2) {
        var code = this.compileBytecode(bytecodes.substring(k, k + 2));
        
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

