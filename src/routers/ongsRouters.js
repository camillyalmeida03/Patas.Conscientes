const {Router} = require('express');
const {GetAll, GetById, Erase, AtualizarNomeOng, AtualizarCnpj} = require("../model/ongsService")


const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.put("/atualizar-nome-ong/:id", AtualizarNomeOng);
rota.put("/atualizar-cnpj/:id", AtualizarCnpj);


module.exports = rota;