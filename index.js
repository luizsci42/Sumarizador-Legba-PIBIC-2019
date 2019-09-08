const express = require ('express');
const app = express();

require('./rotas/rotasConsulta')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
