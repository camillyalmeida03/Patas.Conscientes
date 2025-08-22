// Define as rotas da entidade sexo, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const sexoController = require("../controllers/sexoControllers");

router.get("/", sexoController.GetAll);
router.get("/:id", sexoController.GetById);
router.post("/", sexoController.Post);
router.put("/:id", sexoController.Put);
router.delete("/:id", sexoController.Erase);

module.exports = router;
