const LinkMindsModel = require("../models/LinkMindsModel");

async function atualizaToken(req, res) {
    const { email } = req.body;
    const service = {
        token: req.body.token2
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
    const { token2 } = req.body;
    const service = {
        apelido: req.body.apelido,
        idade: req.body.idade,
        interesses: req.body.interesses,
        descricao: req.body.descricao,
        discord: req.body.discord
    };
    const updateService = await LinkMindsModel.findOneAndUpdate({ token: token2 }, service);
    if (updateService) {
        res.json({ msg: "Atualizado com sucesso!" });
    } else {
        res.json({ msg: "Erro ao atualizar!" });
    }
};

async function getUsuarioInfo(req, res){
    const token = req.headers['x-access-token'];
    const result = await LinkMindsModel.findOne({ token: token });
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function getUsuarioSelecionado(req, res){
    const email = req.headers['email'];
    const result = await LinkMindsModel.findOne({ email: email });
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

async function seguir(req, res){
    const { email } = req.body;
    const service = {
        usuariosSeguindo: req.body.usuariosSeguindo
    };
    const updateService = await LinkMindsModel.findOneAndUpdate({ email: email }, service);
    if (updateService) {
        res.json({ msg: "Atualizado com sucesso!" });
    } else {
        res.json({ msg: "Erro ao atualizar!" });
    }
};

async function seguidores(req, res){
    const { usuarioSelecionadoEmail } = req.body;
    const service = {
        usuariosSeguidores: req.body.usuariosSeguidores
    };
    const updateService = await LinkMindsModel.findOneAndUpdate({ email: usuarioSelecionadoEmail }, service);
    if (updateService) {
        res.json({ msg: "Atualizado com sucesso!" });
    } else {
        res.json({ msg: "Erro ao atualizar!" });
    }
};

async function comecouSeguir(req, res){
    const { usuarioSelecionadoEmail } = req.body;
    const {nome} = req.body;
    const {apelido} = req.body;
    const service = {
        usuariosSeguidores: req.body.usuariosSeguidores
    };
    const updateService = await LinkMindsModel.findOneAndUpdate({ email: usuarioSelecionadoEmail }, service);
    if (updateService) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'linkme548@gmail.com',
                    pass: 'efgd acbt chcx hmeo'
                }
            });

            const mailOptions = {
                from: 'linkme548@gmail.com',
                to: usuarioSelecionadoEmail,
                subject: nome + ' começou a seguir você!',
                text: 'Olá, ' + apelido + '! O usuário ' + nome + ' começou a seguir você!'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error('Erro ao enviar e-mail:', error);
                } else {
                    console.log('E-mail enviado: ' + info.response);
                }
            });
            res.json({ msg: 'Atualizado com sucesso e e-mail enviado.'});
        } catch (error) {
            console.error('Erro ao atualizar e enviar e-mail:', error);
            res.json({ msg: 'Erro ao atualizar e enviar e-mail.' });
        }
    } else {
        res.json({ msg: "Erro ao atualizar!" });
    }
};

module.exports = { atualizaToken, getUsuario, atualizaUsuario, getUsuarioInfo, getUsuarioSelecionado, pesquisaUsuario, seguir, seguidores, comecouSeguir };