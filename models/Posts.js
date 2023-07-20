const mongoose = require('mongoose');

const PostsSchema = new mongoose.Schema({
    email: String,
    nome: String,
    evento: String,
    data: String,
    hora: String,
    local: String,
    presenca: Number,
    usuariosPresenca: Array
})

const PostsModel = mongoose.model('posts', PostsSchema);

module.exports = PostsModel;