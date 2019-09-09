// As linhas 2 e 3 são equivalentes à linha 5
// const pg = require('pg');
// const client = pg.Client();
// Importa o drive de conexão com o PosgreSQL
const { Client } = require('pg');
// Importamos as chaves de conexão defindas no arquivo keys.js
const keys = require('./config/keys');

const cliente = new Client({
	host: keys.cliente.endereco,
	port: keys.cliente.porta,
	user: keys.cliente.usuario,
	password: keys.cliente.senha,
	database: keys.cliente.nomeDB
});

function conectar() {
	try {
		cliente.connect(err => {
			console.log('Conectado');
		});
	} catch (err) {
		console.error('Erro de conexão', err.stack)
	}
}

function fecharConexao() {
	// Utiliza uma promise para encerrar a conexão com o banco de dados
	cliente.end()
		.then(() => console.log('Desconectado'))
		.catch(err => console.error('Erro ao desconectar', err.stack));
}

module.exports = {
	consultar: async function consultar() {
		conectar();
		const result = await cliente.query({
			rowMode: 'array',
			text: 'SELECT obras.titulo, livros.autor FROM biblioteca.obras natural join biblioteca.livros;'
		});
		return result.rows;
	},
	alfabetica: async function obrasOrdemAlfabetica() {
		conectar()
		console.log('Alfabetica')
		const result = await cliente.query({
			rowMode: 'array',
			text: 'SELECT DISTINCT obras.titulo FROM biblioteca.obras ORDER BY obras.titulo ASC'
		});
		return result.rows;
	},
	qntLivros: async function quantidadeLivros() {
		let query = 'SELECT COUNT(obras.titulo) FROM biblioteca.obras NATURAL JOIN biblioteca.livros'
		cliente.query(query, (err, res) => {
			if(err) throw err;
			console.log(res);
			fecharConexao();
		});
	},
	qntClients: async function quantidadeClientes() {
		cliente.query('SELECT cliente.nome FROM biblioteca.cliente GROUP BY funcionario.nome', (err, res) => {
			if(err) throw err;
			console.log(res);
			fecharConexao();
		});
	},
	emprestimos: async function emprestimosAtivos() {
		let query = 'SELECT cliente.nome , emprestimo.status FROM biblioteca.cliente JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id WHERE emprestimo.status IS TRUE'
		cliente.query(query, (err, res) => {
			if (err) throw err;
			console.log(res);
			fecharConexao();
		});
	},

	titulosAutor: async function titulosAutor() {
		cliente.query('SELECT autor.id_autor, livros.titulo FROM biblioteca.autor \n' +
			'JOIN biblioteca.livros ON autor.livro_id_isbn = livros.id_isbn', (err, res) => {
			if(err) throw err;
			console.log(res);
			fecharConexao();
		});
	},
	emprestimoBloqueio: async function emprestimoBloqueio() {
		cliente.query('SELECT bloqueio.id, cliente.nome FROM biblioteca.cliente \n' +
			'JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id\n' +
			'JOIN biblioteca.bloqueio ON bloqueio.id = cliente.bloqueio_id \n' +
			'WHERE bloqueio.id IS NOT NULL', (err, res) => {
			if(err) throw err;
			console.log(res);
			fecharConexao();
		});
	},
	nomesPessoas: async function nomesPessoas() {
		cliente.query('SELECT nome\n' +
			'FROM biblioteca.bibliotecario\n' +
			'NATURAL JOIN biblioteca.atendente\n' +
			'NATURAL JOIN biblioteca.cliente', (err, res) => {
			if(err) throw err;
			console.log(res);
			fecharConexao();
		});
	}
}





