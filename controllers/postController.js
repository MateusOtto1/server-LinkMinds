const PostsModel = require("../models/PostsModel");

async function criaPost(req, res){
    await PostsModel.create(req.body).then(posts => res.json(posts)).catch(err => res.json(err));
};

async function postsInfo(req, res){
    const { email } = req.body;
    const result = await PostsModel.find({ email: email });
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function excluirPost(req, res){
    const {evento} = req.body;
    const {data} = req.body;
    const {hora} = req.body;
    const {local} = req.body;
    const {nome} = req.body;
    const result = await PostsModel.findOneAndDelete({nome: nome, evento: evento, data: data, hora: hora, local: local});
    if (result) {
        res.json({ msg: "Excluído com sucesso!" });
    }else{
        res.json({ msg: "Erro ao excluir!" });
    }
};

async function getPostHome(req, res){
    const result = await PostsModel.find();
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function getPostPerfilPesquisa(req, res){
    const {email} = req.body;
    const result = await PostsModel.find({email: email});
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function getPostPresenca(req, res){
    const {evento} = req.body;
    const {data} = req.body;
    const {hora} = req.body;
    const {local} = req.body;
    const {nome} = req.body;
    const service = {
        presenca: req.body.presenca,
        usuariosPresenca: req.body.usuariosPresenca
    };
    const result = await PostsModel.findOneAndUpdate({nome: nome, evento: evento, data: data, hora: hora, local: local}, service);
    if (result) {
        res.json({ msg: "Atualizado com sucesso!" });
    }
    else{
        res.json({ msg: "Erro ao atualizar!" });
    }
};

async function getPostPresencaInfo(req, res){
    const {evento} = req.body;
    const {data} = req.body;
    const {hora} = req.body;
    const {local} = req.body;
    const {nome} = req.body;
    const result = await PostsModel.findOne({nome: nome, evento: evento, data: data, hora: hora, local: local});
    if (result) {
        res.json(result);
    }
    else{
        res.json({ msg: "Erro ao buscar!" });
    }
};

module.exports = { criaPost, postsInfo, excluirPost, getPostHome, getPostPerfilPesquisa, getPostPresenca, getPostPresencaInfo };