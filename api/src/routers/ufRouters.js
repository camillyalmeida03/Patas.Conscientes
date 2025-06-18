const {Router} = require('express');
const {GetAll, GetById, GetBySigla, Erase, Create, Update} = require("../model/ufService.js")

const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.post("/", Create);
rota.put("/:id", Update);


module.exports = rota;