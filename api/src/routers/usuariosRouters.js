const {Router} = require('express');
const {GetAll, GetById, Erase, Create, Update, SolicitarCriacao, Solicitarexclusao, SolicitarRecuperacaoSenha, Login, Createcontaadotante, Createadotante, Createong, AtualizarNome, AtualizarFoto, AtualizarEmail, AtualizarSenha, AtualizarTelefone, verificartipo, getbyidconfigong, getbyidconfigadotante} = require("../model/usuariosService")
const upload = require('../config/upload_foto_perfil'); 


const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.post("/", upload.single("foto"), Create); 
rota.put("/:id", Update);
rota.post("/login", Login);
rota.post("/solicitar-criacao", SolicitarCriacao);
rota.post("/solicitar-exclusao", Solicitarexclusao);
rota.post("/solicitar-recuperacao-senha", SolicitarRecuperacaoSenha);
rota.post("/criar-conta-adotante", Createcontaadotante);
rota.post("/criar-adotante", upload.single("foto"), Createadotante);
rota.post("/criar-ong", upload.single("foto"), Createong);
rota.put("/atualizar-foto/:id", upload.single("foto"), AtualizarFoto);
rota.put("/atualizar-nome/:id", AtualizarNome);
rota.put("/atualizar-email/:id", AtualizarEmail);
rota.put("/atualizar-senha/:id", AtualizarSenha);
rota.put("/atualizar-telefone/:id", AtualizarTelefone);
rota.get("/verificar-tipo/:id", verificartipo);
rota.get("/configong/:id", getbyidconfigong);
rota.get("/configadotante/:id", getbyidconfigadotante);


module.exports = rota;