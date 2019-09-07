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

function fecharConexao() {
	// Utiliza uma promise para encerrar a conexão com o banco de dados
	cliente.end()
		.then(() => console.log('Desconectado'))
		.catch(err => console.error('Erro ao desconectar', err.stack));
}

// Mostra o titulo e o autor de todas as obras no banco
function testeDeConsulta() {
	cliente.query('SELECT obras.titulo, livros.autor FROM biblioteca.obras natural join biblioteca.livros;', (err, res) => {
		alert('Funcionou');
		if(err) throw err;
		console.log(res.rows);
		fecharConexao();
	});
}

// Lista todas as obras em ordem alfabetica
function obrasOrdemAlfabetica() {
	cliente.query('SELECT obras.titulo FROM biblioteca.obras ORDER BY obras.titulo ASC', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra a quantidade de livros disponível no acervo
function quantidadeLivros() {
	let query = 'SELECT COUNT(obras.titulo) FROM biblioteca.obras JOIN biblioteca.livros ON obras.id = livros.obras_id'
	cliente.query(query, (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra a quantidade de clientes da biblioteca
function quantidadeClientes() {
	cliente.query('SELECT cliente.nome FROM biblioteca.cliente GROUP BY funcionario.nome', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra os empréstimos atuais de determinado cliente
function emprestimosAtivos() {
	let query = 'SELECT cliente.nome , emprestimo.status FROM biblioteca.cliente JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id WHERE emprestimo.status IS TRUE'
	cliente.query(query, (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra todos os títulos de determinado autor
function titulosAutor() {
	cliente.query('SELECT autor.id_autor, livros.titulo FROM biblioteca.autor \n' +
		'JOIN biblioteca.livros ON autor.livro_id_isbn = livros.id_isbn', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

// Mostra qual emprestimo gerou o bloqueio do cliente
function emprestimoBloqueio() {
	cliente.query('SELECT bloqueio.id, cliente.nome FROM biblioteca.cliente \n' +
		'JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id\n' +
		'JOIN biblioteca.bloqueio ON bloqueio.id = cliente.bloqueio_id \n' +
		'WHERE bloqueio.id IS NOT NULL', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}

function nomesPessoas() {
	cliente.query('SELECT nome\n' +
		'FROM biblioteca.bibliotecario\n' +
		'NATURAL JOIN biblioteca.atendente\n' +
		'NATURAL JOIN biblioteca.cliente', (err, res) => {
		if(err) throw err;
		console.log(res);
		fecharConexao();
	});
}





