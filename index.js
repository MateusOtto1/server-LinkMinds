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

app.get('/', (req, res) => {
    res.send('<h1>SERVIDOR RODANDO!!!</h1>');
});

app.put("/token", (req, res) => {
    usuarioController.atualizaToken(req, res);
});

app.post("/usuario", (req, res) => {
    usuarioController.getUsuario(req, res);
});

app.put("/usuario", Middleware, (req, res) => {
   usuarioController.atualizaUsuario(req, res);
});

app.get("/usuarioSelecionado", Middleware, (req, res) => {
    usuarioController.getUsuarioSelecionado(req, res);
});

app.get("/usuarioInfo", Middleware, (req, res) => {
    usuarioController.getUsuarioInfo(req, res);
});

app.get("/pesquisaUsuario", Middleware, (req, res) => {
   usuarioController.pesquisaUsuario(req, res);
});

app.post("/posts", Middleware, (req, res) => {
    postController.criaPost(req, res);
});

app.get("/postsInfo", Middleware, (req, res) => {
   postController.postsInfo(req, res);
});

app.delete("/excluirPost", Middleware, (req, res) => {
   postController.excluirPost(req, res);
});

app.get("/postsHome", Middleware, (req, res) => {
   postController.getPostHome(req, res);
});

app.get("/postsPerfilPesquisa", Middleware, (req, res) => {
    postController.getPostPerfilPesquisa(req, res);
});

app.put("/postsMarcarPresenca", Middleware, (req, res) => {
    postController.marcarPresenca(req, res);
});

app.put("/postsDesmarcarPresenca", Middleware, (req, res) => {
    postController.desmarcarPresenca(req, res);
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

app.put("/seguir", Middleware, (req, res) => {
    usuarioController.comecouSeguir(req, res);
});

app.get("/listaInteresse", Middleware, (req, res) => {
    interessesController.listaInteresse(req, res);
});

app.listen(3001, () => {
    console.log("Servidor no Ar!");
})