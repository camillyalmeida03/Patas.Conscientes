// Define as rotas da entidade bairros, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const bairrosController = require("../controllers/bairrosControllers");

router.get("/", bairrosController.GetAll);
router.get("/:id", bairrosController.GetById);
router.post("/", bairrosController.Post);
router.put("/:id", bairrosController.Put);
router.delete("/:id", bairrosController.Erase);

module.exports = router;