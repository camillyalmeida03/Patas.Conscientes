const {Router} = require('express');
const {GetAll, GetById, Erase, createOng, Update} = require("../model/ongsService")


const rota = Router()

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.post("/", createOng);
rota.put("/:id", Update)


module.exports = rota;