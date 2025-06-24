const { Router } = require("express");
const {
  GetAll,
  GetById,
  CreatePet,
  UpdatePet,
  DeletePet,
} = require("../model/petsService");

const rota = Router();

rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", DeletePet);
rota.post("/", CreatePet);
rota.put("/:id", UpdatePet);

module.exports = rota;
