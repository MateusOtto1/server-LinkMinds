const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const usuarioController = require("./controllers/usuarioController");
const postController = require("./controllers/postController");
const Midleware = require("./controllers/MidlewareController");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);

app.post("/usuario", (req, res) => {
    usuarioController.getUsuario(req, res);
});

app.put("/usuario", Midleware, (req, res) => {
   usuarioController.atualizaUsuario(req, res);
});

app.post("/usuarioInfo", Midleware, (req, res) => {
    usuarioController.getUsuarioInfo(req, res);
});

app.post("/pesquisaUsuario", Midleware, (req, res) => {
   usuarioController.pesquisaUsuario(req, res);
});

app.post("/posts", Midleware, (req, res) => {
    postController.criaPost(req, res);
});

app.post("/postsInfo", Midleware, (req, res) => {
   postController.postsInfo(req, res);
});

app.delete("/excluirPost", Midleware, (req, res) => {
   postController.excluirPost(req, res);
});

app.post("/postsHome", Midleware, (req, res) => {
    postController.getPostHome(req, res);
});

app.post("/postsPerfilPesquisa", Midleware, (req, res) => {
    postController.getPostPerfilPesquisa(req, res);
});

app.put("/postsPresenca", Midleware, (req, res) => {
    postController.getPostPresenca(req, res);
});

app.post("/postsPresencaInfo", Midleware, (req, res) => {
    postController.getPostPresencaInfo(req, res);
});

app.listen(3001, () => {
    console.log("Servidor no Ar!");
})