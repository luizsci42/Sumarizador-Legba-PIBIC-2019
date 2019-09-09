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

module.exports = async function consultar() {
	conectar();
	const result = await cliente.query({
		rowMode: 'array',
		text: 'SELECT obras.titulo, livros.autor FROM biblioteca.obras natural join biblioteca.livros;'
	});
	return result.rows;
}

// Lista todas as obras em ordem alfabetica
const obrasOrdemAlfabetica = function obrasOrdemAlfabetica() {
	cliente.query('SELECT obras.titulo FROM biblioteca.obras ORDER BY obras.titulo ASC', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra a quantidade de livros disponível no acervo
const qntLivros = function quantidadeLivros() {
	let query = 'SELECT COUNT(obras.titulo) FROM biblioteca.obras NATURAL JOIN biblioteca.livros'
	cliente.query(query, (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra a quantidade de clientes da biblioteca
const qntClientes = function quantidadeClientes() {
	cliente.query('SELECT cliente.nome FROM biblioteca.cliente GROUP BY funcionario.nome', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra os empréstimos atuais de determinado cliente
const emprestimosAtivos = function emprestimosAtivos() {
	let query = 'SELECT cliente.nome , emprestimo.status FROM biblioteca.cliente JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id WHERE emprestimo.status IS TRUE'
	cliente.query(query, (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra todos os títulos de determinado autor
const titulosAutor = function titulosAutor() {
	cliente.query('SELECT autor.id_autor, livros.titulo FROM biblioteca.autor \n' +
		'JOIN biblioteca.livros ON autor.livro_id_isbn = livros.id_isbn', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra qual emprestimo gerou o bloqueio do cliente
const emprestimoBloqueio = function emprestimoBloqueio() {
	cliente.query('SELECT bloqueio.id, cliente.nome FROM biblioteca.cliente \n' +
		'JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id\n' +
		'JOIN biblioteca.bloqueio ON bloqueio.id = cliente.bloqueio_id \n' +
		'WHERE bloqueio.id IS NOT NULL', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Todos os clientes e funcionários
const nomesPessoas = function nomesPessoas() {
	cliente.query('SELECT nome\n' +
		'FROM biblioteca.bibliotecario\n' +
		'NATURAL JOIN biblioteca.atendente\n' +
		'NATURAL JOIN biblioteca.cliente', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}





