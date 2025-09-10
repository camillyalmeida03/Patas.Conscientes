// Define as rotas da entidade petsfavoritados, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const petsfavoritadosController = require("../controllers/petsfavoritadosControllers");

router.get("/", petsfavoritadosController.GetAll);
router.get("/:id", petsfavoritadosController.GetById);
router.post("/", petsfavoritadosController.Post);
router.put("/:id", petsfavoritadosController.Put);
router.delete("/:id", petsfavoritadosController.Erase);

module.exports = router;