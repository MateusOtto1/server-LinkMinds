const mongoose = require('mongoose');

const InteressesSchema = new mongoose.Schema({
    nome: String,
    imagem: String
})

const InteressesModel = mongoose.model('interesses', InteressesSchema);

module.exports = InteressesModel;