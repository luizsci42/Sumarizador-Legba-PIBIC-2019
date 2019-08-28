// As linhas 2 e e são equivalentes à linha 6
// const pg = require('pg');
// const client = pg.Client();

// Importa o drive de conexão com o PosgreSQL
const { Client } = require('pg');
const keys = require('./config/keys');

const cliente = new Client({
	host: keys.cliente.endereco,
	port: keys.cliente.porta,
	user: keys.cliente.usuario,
	password: keys.cliente.senha,
	database: keys.cliente.nomeDB
});

cliente.connect(err => {
	err ? console.error('Erro de conexão', err.stack) : console.log('Conectado');
});

cliente.query('SELECT * FROM biblioteca.obras', (err, res) => {
	if(err) throw err;
	console.log(res);
	fecharConexao();
});

function fecharConexao() {
	// Utiliza uma promise para encerrar a conexão com o banco de dados
	cliente.end()
		.then(() => console.log('Desconectado'))
		.catch(err => console.error('Erro ao desconectar', err.stack));
}






