const {Router} = require('express');
const {GetAll, GetById, Erase, AtualizarNomeOng, AtualizarCnpj, CreateOng} = require("../model/ongsService")


const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.put("/atualizar-nome-ong/:id", AtualizarNomeOng);
rota.put("/atualizar-cnpj/:id", AtualizarCnpj);
rota.post("/criar-ong", CreateOng);


module.exports = rota;