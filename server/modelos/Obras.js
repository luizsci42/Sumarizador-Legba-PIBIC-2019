// O mongoose e utilizado para fazer o mapeamento objeto-registro com o MongoDB
const mongoose = require('mongoose');
const { Schema } = mongoose;

const obraSchema = new Schema({
    editora: String,
    idioma: String,
    genero: String,
    ano: Date
});

const periodicoSchema = new Schema({
    doi: String
});

const livroSchema = new Schema({
    isbn: String,
    autor: String
});

const exemplarSchema = new Schema({
    numero: Number,
    edicao: Number,
    numeroDeRenovacao: Number,
    status: Boolean,
    previsaoDeEntrega: Date,
    dataDeEntrega: Date
});

mongoose.model('obras', obraSchema);
mongoose.model('periodicos', periodicoSchema);
mongoose.model('livro', livroSchema);
mongoose.model('exemplares', exemplarSchema);