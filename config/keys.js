module.exports = {
    cliente: {
        usuario: 'postgres',
        senha: '0v3rDr!v3',
        nomeDB: 'Biblioteca',
        endereco: '127.0.0.1',
        porta: '5432',
        url: 'postgres://postgres:0v3rDr!v3@localhost/127.0.0.1:5432/Biblioteca'
    },
    trabalho: {
        usuario: 'aluno1',
        senha: 'aluno1',
        nomeDB: 'bd_trabalho',
        endereco: '10.27.159.214',
        porta: '5432',
        url: 'jdbc:postgresql://10.27.159.214:5432/bd_trabalho'
    },
    heroku: {
        endereco: 'ec2-23-21-109-177.compute-1.amazonaws.com',
        senha: 'daa85533c2b7ddbf8602437a3241afc7a987dc27847b5ed685c8511ce5aaa38d',
        nomeDB: 'd7om3u3pcle0q4',
        usuario: 'bsergzvfouacfs',
        porta: '5432'
    }
}