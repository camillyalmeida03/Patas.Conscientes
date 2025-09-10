// Define as rotas da entidade portespet, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const portespetController = require("../controllers/portespetControllers");

router.get("/", portespetController.GetAll);
router.get("/:id", portespetController.GetById);
router.post("/", portespetController.Post);
router.put("/:id", portespetController.Put);
router.delete("/:id", portespetController.Erase);

module.exports = router;
