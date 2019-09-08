const consultas = require('../consultas.js');
/*
O Express suporta os seguintes métodos de roteamento que correspondem aos métodos HTTP:
get, post, put, head, delete, options, trace, copy, lock, mkcol,
move, purge, propfind, proppatch, unlock, report, mkactivity,
checkout, merge, m-search, notify, subscribe,
unsubscribe, patch, search, e connect.
 */
module.exports = app => {
    app.set('views', './views');
    app.set('view engine', 'pug');

    app.get('/', (req, res) => {
        res.send(consultas());
    });

    app.get('/home', (req, res) => {
        res.render('home', {titulo: 'Teste', mensagem:'Olá Mundo!'});
    });
}