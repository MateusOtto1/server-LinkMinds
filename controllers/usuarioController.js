const LinkMindsModel = require("../models/LinkMindsModel");

async function atualizaToken(req, res) {
    const { email } = req.body;
    const service = {
        token: req.body.token
    };
    await LinkMindsModel.findOneAndUpdate({ email: email }, service).then(usuario => {
        if (usuario) {
            res.json({ msg: "Atualizado com sucesso!" });
        } else {
            res.json({ msg: "Erro ao atualizar!" });
        }
    });
};

async function getUsuario(req, res) {
    const { email } = req.body;
    await LinkMindsModel.findOne({ email: email }).then(usuario => {
        if (usuario) {
            if (usuario.email === email) {
                res.json({ msg: "Usuário já cadastrado!" });
            }
        } else {
            LinkMindsModel.create(req.body).then(usuario => res.json(usuario)).catch(err => res.json(err));
        }
    });
};

async function atualizaUsuario(req, res){
    const { token } = req.body;
    const service = {
        apelido: req.body.apelido,
        idade: req.body.idade,
        interesses: req.body.interesses,
        descricao: req.body.descricao
    };
    const updateService = await LinkMindsModel.findOneAndUpdate({ token: token }, service);
    if (updateService) {
        res.json({ msg: "Atualizado com sucesso!" });
    } else {
        res.json({ msg: "Erro ao atualizar!" });
    }
};

async function getUsuarioInfo(req, res){
    const { token } = req.body;
    const result = await LinkMindsModel.findOne({ token: token });
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function pesquisaUsuario(req, res){
    const result = await LinkMindsModel.find();
    if (result) {
        res.json(result);
    }
    else{
        res.json({ msg: "Erro ao buscar!" });
    }
};

module.exports = { atualizaToken, getUsuario, atualizaUsuario, getUsuarioInfo, pesquisaUsuario };