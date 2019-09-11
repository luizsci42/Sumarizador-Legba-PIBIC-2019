// Importa o express a partir do NodeJS
const express = require('express');
const app = express();

// Utiliza as rotas definidas em rotasConsulta, passando nossa instância do express como argumento
require('./rotas/rotasConsulta')(app);

// Este programa será executado na porta 5000. Acese localhost:3000
const PORT = process.env.PORT || 5000;
app.listen(PORT);
