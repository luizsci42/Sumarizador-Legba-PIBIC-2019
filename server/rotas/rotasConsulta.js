const express = require('express');
// Importamos nosso script de consultas pré-definidas
const consulta = require('../consultas');
const server = express();

module.exports = app => {
    // Indicamos em que diretório se encontra nossos modelos de página
    app.set('views', './views');
    // Definimos a extensão dos modelos de página como .js
    app.set('view engine', 'pug');

    app.get('/', (req, res) => {
        console.log('Olá mundo!');
    });

    // Chamamos a função assíncrona definida no arquivo de consultas
    app.get('/teste', (req, res) => {
        // Renderiza o modelo em views/index.js utilizando os dados provenientes do banco
        // consulta().then( obras => res.render('index', { obras } ));
        consulta.consultar().then(obras => {
            res.send({dados: obras})
        });
    });

    app.get('/consum', (req, res) => {
        consulta.alfabetica().then(alfa => {
            res.send({dados: alfa})
        })
    });

    app.get('/consdois', (req,res) => {
        consulta.qntLivros().then(qnt => {
            console.log('Quantidade', qnt)
            res.send({dados: qnt});
        });
    });

    app.get('/constres'), (req, res) => {
        consulta.qntClients().then(qnt => {
            res.send({dados: qnt});
        })
    }

    app.get('/consQuatro'), (req, res) => {
        consulta.emprestimos().then(dados => {
            res.send({dados: dados});
        })
    }

    app.get('/consCinco'), (req, res) => {
        consulta.titulosAutor().then(dados => {
            res.send({dados: dados});
        })
    }

    app.get('/consSeis'), (req, res) => {
        consulta.emprestimoBloqueio().then(dados => {
            res.send({dados: dados});
        })
    }

    app.get('/consSete'), (req, res) => {
        consulta.nomesPessoas().then(dados => {
            res.send({dados: dados});
        })
    }

    app.get('/home', (req, res) => {
        res.render('home', {titulo: 'Teste', mensagem:'Olá Mundo!'});
    });
}