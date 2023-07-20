const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const LinkMindsModel = require("./models/LinkMinds");
const PostsModel = require("./models/Posts");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://mateusbotto:forrocacharel123@cluster0.zdxhuct.mongodb.net/LinkMinds");

app.post("/usuario", (req, res) => {
    const { email } = req.body;
    LinkMindsModel.findOne({ email: email }).then(usuario => {
        if (usuario) {
            if (usuario.email === email) {
                res.json({ msg: "Usuário já cadastrado!" });
            }
        } else {
            LinkMindsModel.create(req.body).then(usuario => res.json(usuario)).catch(err => res.json(err));
        }
    })
});

app.put("/usuario", async (req, res) => {
    const { email } = req.body;
    const service = {
        apelido: req.body.apelido,
        idade: req.body.idade,
        interesses: req.body.interesses,
        descricao: req.body.descricao
    };
    const updateService = await LinkMindsModel.findOneAndUpdate({ email: email }, service);
    if (updateService) {
        res.json({ msg: "Atualizado com sucesso!" });
    } else {
        res.json({ msg: "Erro ao atualizar!" });
    }
});

app.post("/usuarioInfo", async (req, res) => {
    const { email } = req.body;
    const result = await LinkMindsModel.findOne({ email: email });
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
});

app.post("/pesquisaUsuario", async (req, res) => {
    const result = await LinkMindsModel.find();
    if (result) {
        res.json(result);
    }
    else{
        res.json({ msg: "Erro ao buscar!" });
    }
});

app.post("/posts", async (req, res) => {
    await PostsModel.create(req.body).then(posts => res.json(posts)).catch(err => res.json(err));
});

app.post("/postsInfo", async (req, res) => {
    const { email } = req.body;
    const result = await PostsModel.find({ email: email });
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
});

app.delete("/excluirPost", async (req, res) => {
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
});

app.post("/postsHome", async (req, res) => {
    const result = await PostsModel.find();
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
});

app.post("/postsPerfilPesquisa", async (req, res) => {
    const {nome} = req.body;
    const result = await PostsModel.find({nome: nome});
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
});

app.put("/postsPresenca", async (req, res) => {
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
});

app.post("/postsPresencaInfo", async (req, res) => {
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
});

app.listen(3001, () => {
    console.log("Servidor no Ar!");
})