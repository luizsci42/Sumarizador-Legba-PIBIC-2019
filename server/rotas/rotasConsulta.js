const consulta = require('../consultas')

module.exports = app => {
    app.get('/teste', (req, res) => {
        consulta().then( obras => res.render('index', { obras } ));
    });

    app.set('views', './views');
    app.set('view engine', 'pug');

    app.get('/', (req, res) => {
        console.log('Olá mundo!');
    });

    app.get('/home', (req, res) => {
        res.render('home', {titulo: 'Teste', mensagem:'Olá Mundo!'});
    });
}