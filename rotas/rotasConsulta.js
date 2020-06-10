const express = require('express');
// Importamos nosso script de consultas pré-definidas
const consulta = require('../consultas');
const server = express();

module.exports = app => {
    app.get('/home', (req, res) => {
        consulta.consultar().then(conteudo => {
            res.send({dados: conteudo})
        })
    });
}