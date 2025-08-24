// Define as rotas da entidade cidades, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const cidadesController = require("../controllers/cidadesControllers");

router.get("/", cidadesController.GetAll);
router.get("/:id", cidadesController.GetById);
router.post("/", cidadesController.Post);
router.put("/:id", cidadesController.Put);
router.delete("/:id", cidadesController.Erase);

module.exports = router;