const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    email: String,
    nome: String,
    evento: String,
    tipoEvento: String,
    descricao: String,
    data: String,
    hora: String,
    local: String,
    presenca: Number,
    usuariosPresenca: Array,
    foto: String,
    imagemEvento: String
})

const PostsModel = mongoose.model('posts', PostsSchema);

module.exports = PostsModel;