module.exports = app => {
    app.get('/home.html', (req, res) => {
        res.send('Olá Mundo!');
    });
}