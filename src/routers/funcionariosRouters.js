// Define as rotas da entidade funcionarios, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const funcionariosController = require("../controllers/funcionariosControllers");

router.get("/", funcionariosController.GetAll);
router.get("/:id", funcionariosController.GetById);
router.post("/", funcionariosController.Post);
router.put("/:id", funcionariosController.Put);
router.delete("/:id", funcionariosController.Erase);

module.exports = router;