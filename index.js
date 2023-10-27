const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const usuarioController = require("./controllers/usuarioController");
const postController = require("./controllers/postController");
const interessesController = require("./controllers/interessesController");
const Middleware = require("./middleware/Middleware");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);

app.put("/token", (req, res) => {
    usuarioController.atualizaToken(req, res);
});

app.post("/usuario", (req, res) => {
    usuarioController.getUsuario(req, res);
});

app.put("/usuario", Middleware, (req, res) => {
   usuarioController.atualizaUsuario(req, res);
});

app.post("/usuarioSelecionado", Middleware, (req, res) => {
    usuarioController.getUsuarioSelecionado(req, res);
});

app.post("/usuarioInfo", Middleware, (req, res) => {
    usuarioController.getUsuarioInfo(req, res);
});

app.post("/pesquisaUsuario", Middleware, (req, res) => {
   usuarioController.pesquisaUsuario(req, res);
});

app.post("/posts", Middleware, (req, res) => {
    postController.criaPost(req, res);
});

app.post("/postsInfo", Middleware, (req, res) => {
   postController.postsInfo(req, res);
});

app.delete("/excluirPost", Middleware, (req, res) => {
   postController.excluirPost(req, res);
});

app.post("/postsHome", Middleware, (req, res) => {
    postController.getPostHome(req, res);
});

app.post("/postsPerfilPesquisa", Middleware, (req, res) => {
    postController.getPostPerfilPesquisa(req, res);
});

app.put("/postsPresenca", Middleware, (req, res) => {
    postController.getPostPresenca(req, res);
});

app.post("/postsPresencaInfo", Middleware, (req, res) => {
    postController.getPostPresencaInfo(req, res);
});

app.put("/seguindo", Middleware, (req, res) => {
    usuarioController.seguir(req, res);
});

app.put("/seguidores", Middleware, (req, res) => {
    usuarioController.seguidores(req, res);
});

app.get("/listaInteresse", Middleware, (req, res) => {
    interessesController.listaInteresse(req, res);
});

app.listen(3001, () => {
    console.log("Servidor no Ar!");
})