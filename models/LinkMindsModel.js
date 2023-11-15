const mongoose = require('mongoose');

const LinkMindsSchema = new mongoose.Schema({
    email: String,
    nome: String,
    foto: String,
    apelido: String,
    idade: String,
    interesses: Array,
    descricao: String,
    usuariosSeguidores: Array,
    usuariosSeguindo: Array,
    token: String,
    discord: String
})

const LinkMindsModel = mongoose.model('usuario', LinkMindsSchema);

module.exports = LinkMindsModel;