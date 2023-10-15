const InteressesModel = require("../models/InteressesModel");

async function listaInteresse(req, res){
    const result = await InteressesModel.find();
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
}

module.exports = { listaInteresse };