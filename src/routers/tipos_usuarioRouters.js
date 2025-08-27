// Define as rotas da entidade tipos_usuario, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const tipos_usuarioController = require("../controllers/tipos_usuarioControllers");

router.get("/", tipos_usuarioController.GetAll);
router.get("/:id", tipos_usuarioController.GetById);
router.post("/", tipos_usuarioController.Post);
router.put("/:id", tipos_usuarioController.Put);
router.delete("/:id", tipos_usuarioController.Erase);

module.exports = router;