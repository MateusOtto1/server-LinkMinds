const mongoose = require('mongoose');

const LinkMindsSchema = new mongoose.Schema({
    email: String,
    nome: String,
    foto: String,
    apelido: String,
    idade: String,
    interesses: String,
    descricao: String,
    usuariosSeguidores: Array,
    usuariosSeguindo: Array
})

const LinkMindsModel = mongoose.model('usuario', LinkMindsSchema);

module.exports = LinkMindsModel;