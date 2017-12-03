
var compilers = require('../../lib/compilers/java');

exports['create compiler as object'] = function (test) {
	var compiler = compilers.compiler();
	
	test.ok(compiler);
	test.equal(typeof compiler, 'object');
}