const {Router} = require('express');
const {GetAll, GetById, Erase, Create, Update, SolicitarCriacao, Solicitarexclusao, SolicitarRecuperacaoSenha, Login, Createcontaadotante} = require("../model/usuariosService")

const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.post("/", Create);
rota.put("/:id", Update);
rota.post("/login", Login);
rota.post("/solicitar-criacao", SolicitarCriacao);
rota.post("/solicitar-exclusao", Solicitarexclusao);
rota.post("/solicitar-recuperacao-senha", SolicitarRecuperacaoSenha);
rota.post("/criar-conta-adotante", Createcontaadotante);

module.exports = rota;