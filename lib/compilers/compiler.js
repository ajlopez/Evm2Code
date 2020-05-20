
function Compiler() {

}

Compiler.prototype.compile = function (bytecodes) {
    let result = [];
    const l = bytecodes.length;
    bytecodes = bytecodes.toLowerCase();
    
    for (let k = 0; k < l; k += 2) {
        const bytecode = bytecodes.substring(k, k + 2);
        let code;
        
        if (bytecode[0] === '6') {
            const value = bytecodes.substring(k + 2, k + 2 + 2 * (parseInt(bytecode[1], 16) + 1));
            code = this.compileBytecode('60', value);
            k += value.length;
        }
        else if (bytecode[0] === '7') {
            const value = bytecodes.substring(k + 2, k + 2 + 2 * (parseInt(bytecode[1], 16) + 1 + 16));
            code = this.compileBytecode('60', value);
            k += value.length;
        }
        else
            code = this.compileBytecode(bytecode);
                    
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

