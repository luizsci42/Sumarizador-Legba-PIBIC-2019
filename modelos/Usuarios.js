const mongoose = require('mongoose');
const { Schema } = mongoose;

const autorSchema = new Schema({

});
const clienteSchema = new Schema({
    endereco: String,
    nome: String,
    dependente: String,
    diasDeAtraso: Number,
    status: Boolean,
    bloqueio: Date,
    operacao: String,
    dataDaOperacao: Date,

});
const funcionarioSchema = new Schema({
    diaDePagamento: Date
});
const atendenteSchema = new Schema({
});
const bibliotecarioSchema = new Schema({
});

mongoose.model('autor', autorSchema);
mongoose.model('cliente', clienteSchema);
mongoose.model('funcionario', funcionarioSchema);
mongoose.model('atendente', atendenteSchema);
mongoose.model('bibliotecario', bibliotecarioSchema);
