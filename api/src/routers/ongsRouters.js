const { Router } = require("express");

const {
  GetAll,
  GetById,
  Erase,
  createOng,
  Update,
  UpdateFotoPerfil, // <- Adicione isso aqui
} = require("../model/ongsService");

const rota = Router();

// Rotas CRUD básicas
rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.post("/ongs", (req, res) => createOng(req.body, res));
rota.put("/:id", Update);
rota.put("/atualizafoto/:id", UpdateFotoPerfil);


module.exports = rota;
