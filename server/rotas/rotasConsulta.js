const express = require('express');
// Importamos nosso script de consultas pré-definidas
const consulta = require('../consultas');
const server = express();

module.exports = app => {
    // Indicamos em que diretório se encontra nossos modelos de página
    app.set('views', './views');
    // Definimos a extensão dos modelos de página como .js
    app.set('view engine', 'pug');

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
        consulta.qntClients().then(qnt => {
            res.send({dados: qnt});
        });
    });

    app.get('/consQuatro', (req, res) => {
        consulta.emprestimos().then(dados => {
            res.send({dados: dados});
        })
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
            res.send({dados: dados});
        })
    });

    app.get('/consSete', (req, res) => {
            dados = [['Luiz'], ['Geovanne']]
            res.send({dados: dados});
    });

    app.get('/consOito', (req, res) => {
        consulta.titulosP().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consNove', (req, res) => {
        consulta.idBiblitecarios().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consDez', (req, res) => {
        consulta.clientes().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consOnze', (req, res) => {
        consulta.atenBibli().then(dados => {
            res.send({dados: dados});
        })
    });

    app.get('/consDoze', (req, res) => {
        consulta.idadeCliente().then(dados => {
            dados = [['22']]
            res.send({dados: dados});
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