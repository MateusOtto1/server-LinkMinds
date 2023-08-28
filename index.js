const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const usuarioController = require("./controllers/usuarioController");
const postController = require("./controllers/postController");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);

app.post("/usuario", (req, res) => {
    usuarioController.getUsuario(req, res);
});

app.put("/usuario", (req, res) => {
   usuarioController.atualizaUsuario(req, res);
});

app.post("/usuarioInfo", (req, res) => {
    usuarioController.getUsuarioInfo(req, res);
});

app.post("/pesquisaUsuario", (req, res) => {
   usuarioController.pesquisaUsuario(req, res);
});

app.post("/posts", (req, res) => {
    postController.criaPost(req, res);
});

app.post("/postsInfo", (req, res) => {
   postController.postsInfo(req, res);
});

app.delete("/excluirPost", (req, res) => {
   postController.excluirPost(req, res);
});

app.post("/postsHome", async (req, res) => {
    postController.getPostHome(req, res);
});

app.post("/postsPerfilPesquisa", async (req, res) => {
    postController.getPostPerfilPesquisa(req, res);
});

app.put("/postsPresenca", async (req, res) => {
    postController.getPostPresenca(req, res);
});

app.post("/postsPresencaInfo", async (req, res) => {
    postController.getPostPresencaInfo(req, res);
});

app.listen(3001, () => {
    console.log("Servidor no Ar!");
})