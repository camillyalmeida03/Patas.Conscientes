const {Router} = require('express');
const {GetAll, GetById, Erase, Create, Update} = require("../model/responsaveisService")


const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.post("/", Create);
rota.put("/:id", Update);


module.exports = rota;