// Define as rotas da entidade usuarios, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.GetAll);
router.get("/:id", usuariosController.GetById);
router.post("/", usuariosController.Post);
router.put("/:id", usuariosController.Put);
router.delete("/:id", usuariosController.Erase);

module.exports = router;