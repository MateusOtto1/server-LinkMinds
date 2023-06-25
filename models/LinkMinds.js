const mongoose = require('mongoose');

const LinkMindsSchema = new mongoose.Schema({
    email: String,
    nome: String,
    apelido: String,
    idade: String,
    interesses: String,
    descricao: String
})

const LinkMindsModel = mongoose.model('usuario', LinkMindsSchema);

module.exports = LinkMindsModel;