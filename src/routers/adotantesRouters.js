const {Router} = require('express');
const {GetAll, GetById, Erase, AtualizarSexo, AtualizarDataNascimento, AtualizarCpf} = require("../model/adotantesService")


const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.put("/atualizar-sexo/:id", AtualizarSexo);
rota.put("/atualizar-data-nascimento/:id", AtualizarDataNascimento);
rota.put("/atualizar-cpf/:id", AtualizarCpf);


module.exports = rota;