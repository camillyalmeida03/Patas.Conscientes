const {Router} = require('express');
const {GetAll, GetById, Erase, Create, Update, SolicitarCriacao, Solicitarexclusao, SolicitarRecuperacaoSenha, Login, Createcontaadotante, Createadotante,  Createong} = require("../model/usuariosService")
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

module.exports = rota;