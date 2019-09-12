// As linhas 2 e 3 são equivalentes à linha 5
// const pg = require('pg');
// const client = pg.Client();
// Importa o drive de conexão com o PosgreSQL
const { Client } = require('pg');
// Importamos as chaves de conexão defindas no arquivo keys.js
const keys = require('./config/keys');

const cliente = new Client({
	host: keys.heroku.endereco,
	port: keys.heroku.porta,
	user: keys.heroku.usuario,
	password: keys.heroku.senha,
	database: keys.heroku.nomeDB
});

cliente.connect(err => {
      if (err) {
        console.error('Erro de conexão', err.stack);
      }
      else {
         console.log('Conectado');
      }
});

function fecharConexao() {
	// Utiliza uma promise para encerrar a conexão com o banco de dados
	cliente.end()
		.then(() => console.log('Desconectado'))
		.catch(err => console.error('Erro ao desconectar', err.stack));
}

module.exports = {
	consultar: async function consultar() {
		const result = await cliente.query({
			rowMode: 'array',
			text: 'SELECT obras.titulo, livros.autor FROM biblioteca.obras natural join biblioteca.livros;'
		});
		return result.rows;
	},
	alfabetica: async function obrasOrdemAlfabetica() {
		const result = await cliente.query({
			rowMode: 'array',
			text: 'SELECT DISTINCT obras.titulo FROM biblioteca.obras ORDER BY obras.titulo ASC'
		});
		return result.rows;
	},
	qntLivros: async function quantidadeLivros() {
	    const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT COUNT(obras.titulo) FROM biblioteca.obras NATURAL JOIN biblioteca.livros'
        });
	    return result.rows;
	},
	qntClients: async function quantidadeClientes() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT COUNT(cliente.nome) FROM biblioteca.cliente'
        });
        return result.rows;
	},
	emprestimos: async function emprestimosAtivos() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT cliente.nome, emprestimo.status FROM biblioteca.cliente JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id WHERE emprestimo.status IS TRUE'
        });
        return result.rows;
	},

	titulosAutor: async function titulosAutor() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT autor.id_autor, obras.titulo FROM biblioteca.autor NATURAL JOIN biblioteca.obras'
        });
        return result.rows;
	},
	emprestimoBloqueio: async function emprestimoBloqueio() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT bloqueio.id, cliente.nome FROM biblioteca.cliente JOIN biblioteca.emprestimo ON cliente.emprestimo_id = emprestimo.id JOIN biblioteca.bloqueio ON bloqueio.id = cliente.bloqueio_id WHERE bloqueio.id IS NOT NULL'
        });
        return result.rows;
	},
	nomesPessoas: async function nomesPessoas() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT bibliotecario.nome, atendente.nome FROM biblioteca.bibliotecario NATURAL JOIN biblioteca.atendente NATURAL JOIN biblioteca.cliente'
        });
        return result.rows;
    },
    titulosP: async function nomesComP() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT obras.titulo FROM biblioteca.obras WHERE obras.titulo LIKE \'P%\''
        });
        return result.rows;
    },
    idBiblitecarios: async function idBibliotecarios() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT bibliotecario.id FROM biblioteca.bibliotecario GROUP BY bibliotecario.id HAVING COUNT(bibliotecario.id) > 0'
        });
        return result.rows;
    },
    clientes: async function clientes() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT cliente.nome FROM biblioteca.cliente WHERE EXISTS(SELECT atendente.id FROM biblioteca.atendente WHERE cliente.id = atendente.cliente_id)'
        });
        return result.rows;
    },
    atenBibli: async function atenBibli() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT atendente.id, bibliotecario.id FROM biblioteca.atendente JOIN biblioteca.bibliotecario USING(id) WHERE EXISTS (SELECT cliente.nascimento FROM biblioteca.cliente WHERE cliente.nascimento BETWEEN \'1978-09-06\' AND \'1999-09-06\')'
        });
        return result.rows;
    },
    idadeCliente: async function idadeCliente() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT AGE(now(),(SELECT cliente.nascimento FROM biblioteca.cliente WHERE nome = \'Geovanne\'))'
        });
        return result.rows;
    },
    somaLivros: async function somaLivros() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT  (COUNT(obras.genero=\'Ficção Científica\')+COUNT(obras.genero=\'Fantasia\')) as total FROM biblioteca.obras JOIN biblioteca.livros ON obras.id = livros.obras_id'
        });
        return result.rows;
    },
    livros: async function livros() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT  obras.titulo FROM biblioteca.obras WHERE obras.id IN (SELECT livros.obras_id FROM biblioteca.livros)'
        });
        return result.rows;
    },
    periodicosFiccao: async function periodicosFiccao() {
        const result = await cliente.query({
            rowMode: 'array',
            text: 'SELECT  obras.titulo FROM biblioteca.obras WHERE obras.id IN(SELECT periodico.obras_id FROM biblioteca.periodico JOIN biblioteca.obras ON obras.genero = \'Ficção Científica\' WHERE periodico.obras_id = obras.id)'
        });
        return result.rows;
    }
}





