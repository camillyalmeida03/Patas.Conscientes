// Define as rotas da entidade ruas, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const ruasController = require("../controllers/ruasControllers");

router.get("/", ruasController.GetAll);
router.get("/:id", ruasController.GetById);
router.post("/", ruasController.Post);
router.put("/:id", ruasController.Put);
router.delete("/:id", ruasController.Erase);

module.exports = router;