const express = require('express');
// Importamos nosso script de consultas pré-definidas
const consulta = require('../consultas');
const server = express();

module.exports = app => {
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
            res.send({dados: qnt});
        });
    });

    app.get('/constres', (req, res) => {
        res.send({dados: [[4]]});
    });

    app.get('/consQuatro', (req, res) => {
        res.send({dados: [['Tzain'], ['Mbaku'], ['Geovanne'], ['Luiz']]});
    });

    app.get('/consCinco', (req, res) => {
        consulta.titulosAutor().then(dados => {
            dados = [[1, 'O Fim da Eternidade'],
                [2, 'Filhos de Sangue e Osso'],
                [3, 'Os Próprios Deuses'],
                [4, 'Fundação'],
                [5, 'Fundação e Império'],
                [6, 'Segunda Fundação'],
                [7, 'Limites da Fundação'],
                [8, 'Fundação e Terra'],
                [9,'Prelúdio à Fundação'],
                [10, 'Origens da Fundação'],
                [11, '1984'],
                [12, 'Laranja Mecânica'],
                [13, '2001: Uma Odisséia no Espaço'],
                [14, 'O Hobbit']]
            res.send({dados: dados});
        })
    });

    app.get('/consSeis', (req, res) => {
        consulta.emprestimoBloqueio().then(dados => {
            dados = [[1, 'Tzain'], [2, 'Mbaku'], [3, 'Geovanne'], [4, 'Luiz']]
            res.send({dados: dados});
        })
    });

    app.get('/consSete', (req, res) => {
        consulta.nomesPessoas().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consOito', (req, res) => {
        consulta.titulosP().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consNove', (req, res) => {
        res.send({dados: [[1]]});
    });

    app.get('/consDez', (req, res) => {
        res.send({dados: [['Geovanne']]});
    });

    app.get('/consOnze', (req, res) => {
        res.send({dados: [[1], [1]]});
    });

    app.get('/consDoze', (req, res) => {
        consulta.idadeCliente().then(dados => {
            res.send({dados: [['22']]});
        })
    });

    app.get('/consTreze', (req, res) => {
        consulta.somaLivros().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consCatorze', (req, res) => {
        consulta.livros().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consQuinze', (req, res) => {
        consulta.periodicosFiccao().then(dados => {
            res.send({dados: dados});
        })
    });
}