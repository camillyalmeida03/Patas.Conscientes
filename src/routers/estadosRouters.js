// Define as rotas da entidade estados, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const estadosController = require("../controllers/estadosControllers");

router.get("/", estadosController.GetAll);
router.get("/:id", estadosController.GetById);
router.post("/", estadosController.Post);
router.put("/:id", estadosController.Put);
router.delete("/:id", estadosController.Erase);

module.exports = router;