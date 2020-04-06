const express = require('express');
// Importamos nosso script de consultas pré-definidas
const consulta = require('../consultas');
const server = express();

module.exports = app => {
    app.get('/teste', (req, res) => {
        consulta.consultar().then(conteudo => {
            res.send({dados: conteudo})
        })
    });

    app.get('/home', (req, res) => {
        res.send({dados: [['Tzain'], ['Mbaku'], ['Geovanne'], ['Luiz']]});
    });
}