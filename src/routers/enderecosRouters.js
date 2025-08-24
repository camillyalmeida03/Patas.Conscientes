// Define as rotas da entidade enderecos, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const enderecosController = require("../controllers/enderecosControllers");

router.get("/", enderecosController.GetAll);
router.get("/:id", enderecosController.GetById);
router.post("/", enderecosController.Post);
router.put("/:id", enderecosController.Put);
router.delete("/:id", enderecosController.Erase);

module.exports = router;