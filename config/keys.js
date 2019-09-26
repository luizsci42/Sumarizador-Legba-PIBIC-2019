/**
 *  Neste arquivo, colocamos a lógica para identificar se estamos no ambiente de
 * produção ou desenvolvimento para retornar as respectivas chaves.
 **/

if (process.env.NODE_ENV === 'production') {
	// Estams no ambiente de produção
	module.exports = require('./prod');
} else {
	// Estamos no ambiente de desenvolvimento
	module.exports = require('./dev');
}