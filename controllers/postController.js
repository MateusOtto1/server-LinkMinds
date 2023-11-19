const PostsModel = require("../models/PostsModel");
const nodemailer = require('nodemailer');

async function criaPost(req, res) {
    await PostsModel.create(req.body).then(posts => res.json(posts)).catch(err => res.json(err));
};

async function postsInfo(req, res) {
    const email = req.headers['email'];
    const result = await PostsModel.find({ email: email });
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function excluirPost(req, res) {
    const { evento } = req.body;
    const { data } = req.body;
    const { hora } = req.body;
    const { local } = req.body;
    const { nome } = req.body;
    const result = await PostsModel.findOneAndDelete({ nome: nome, evento: evento, data: data, hora: hora, local: local });
    if (result) {
        res.json({ msg: "Excluído com sucesso!" });
    } else {
        res.json({ msg: "Erro ao excluir!" });
    }
};

async function getPostHome(req, res) {
    const result = await PostsModel.find();
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function getPostPerfilPesquisa(req, res) {
    const email = req.headers['email'];
    const result = await PostsModel.find({ email: email });
    if (result) {
        res.json(result);
    } else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

async function marcarPresenca(req, res) {
    const { evento } = req.body;
    const { data } = req.body;
    const { hora } = req.body;
    const { local } = req.body;
    const { nome } = req.body;
    const { email } = req.body;
    const service = {
        presenca: req.body.presenca,
        usuariosPresenca: req.body.usuariosPresenca
    };
    const result = await PostsModel.findOneAndUpdate({ nome: nome, evento: evento, data: data, hora: hora, local: local }, service);
    if (result) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'linkme548@gmail.com',
                    pass: 'linkme2023'
                }
            });

            const mailOptions = {
                from: 'linkme548@gmail.com',
                to: "ottomateus5@gmail.com",
                subject: 'Alguém marcou presença no seu evento!',
                text: 'Alguém marcou presença no seu evento: ' + evento + ' no dia ' + data + ' às ' + hora + ' no local ' + local + '.'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error('Erro ao enviar e-mail:', error);
                } else {
                    console.log('E-mail enviado: ' + info.response);
                }
            });

            res.json({ msg: 'Atualizado com sucesso e e-mail enviado.' });
        } catch (error) {
            console.error('Erro ao atualizar e enviar e-mail:', error);
            res.json({ msg: 'Erro ao atualizar e enviar e-mail.' });
        }
    }
    else {
        res.json({ msg: "Erro ao atualizar!" });
    }
};

async function desmarcarPresenca(req, res) {
    const { evento } = req.body;
    const { data } = req.body;
    const { hora } = req.body;
    const { local } = req.body;
    const { nome } = req.body;
    const { email } = req.body;
    const service = {
        presenca: req.body.presenca,
        usuariosPresenca: req.body.usuariosPresenca
    };
    const result = await PostsModel.findOneAndUpdate({ nome: nome, evento: evento, data: data, hora: hora, local: local }, service);
    if (result) {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'linkme548@gmail.com',
                    pass: 'linkme2023'
                }
            });

            const mailOptions = {
                from: 'linkme548@gmail.com',
                to: "ottomateus5@gmail.com",
                subject: 'Alguém marcou presença no seu evento!',
                text: 'Alguém desmarcou presença no seu evento: ' + evento + ' no dia ' + data + ' às ' + hora + ' no local ' + local + '.'
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.error('Erro ao enviar e-mail:', error);
                } else {
                    console.log('E-mail enviado: ' + info.response);
                }
            });
            res.json({ msg: 'Atualizado com sucesso e e-mail enviado.' + email });
        } catch (error) {
            console.error('Erro ao atualizar e enviar e-mail:', error);
            res.json({ msg: 'Erro ao atualizar e enviar e-mail.' });
        }
    }
    else {
        res.json({ msg: "Erro ao atualizar!" });
    }
};

async function getPostPresencaInfo(req, res) {
    const { evento } = req.body;
    const { data } = req.body;
    const { hora } = req.body;
    const { local } = req.body;
    const { nome } = req.body;
    const result = await PostsModel.findOne({ nome: nome, evento: evento, data: data, hora: hora, local: local });
    if (result) {
        res.json(result);
    }
    else {
        res.json({ msg: "Erro ao buscar!" });
    }
};

module.exports = { criaPost, postsInfo, excluirPost, getPostHome, getPostPerfilPesquisa, marcarPresenca, getPostPresencaInfo, desmarcarPresenca };