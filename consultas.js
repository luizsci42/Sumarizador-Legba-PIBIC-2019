module.exports = {
	consultar: async function consultar() {
		const fs = require('fs');
		const json = fs.readFileSync('data_file.json', 'utf8');
		var texto = JSON.parse(json);
		console.log("consultas/i: estou aqui (backend)");

		return texto.texto;
	}
}