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
        consulta().then(obras => {
            console.log('Rotas', obras)
            res.send({dados: obras})
        });
    });

    app.get('/home', (req, res) => {
        res.render('home', {titulo: 'Teste', mensagem:'Olá Mundo!'});
    });
}