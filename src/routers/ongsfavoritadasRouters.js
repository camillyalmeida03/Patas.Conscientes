// Define as rotas da entidade ongsfavoritadas, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const ongsfavoritadasController = require("../controllers/ongsfavoritadasControllers");

router.get("/", ongsfavoritadasController.GetAll);
router.get("/:id", ongsfavoritadasController.GetById);
router.post("/", ongsfavoritadasController.Post);
router.put("/:id", ongsfavoritadasController.Put);
router.delete("/:id", ongsfavoritadasController.Erase);

module.exports = router;