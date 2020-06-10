module.exports = {
	consultar: async function consultar() {
		const fs = require('fs');
		const json = fs.readFileSync('data_file.json', 'utf8');
		var texto = JSON.parse(json);

		// return texto.texto;
		return texto;
	}
}