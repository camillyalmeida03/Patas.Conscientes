// Define as rotas da entidade especiespet, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const especiespetController = require("../controllers/especiespetsControllers");

router.get("/", especiespetController.GetAll);
router.get("/:id", especiespetController.GetById);
router.post("/", especiespetController.Post);
router.put("/:id", especiespetController.Put);
router.delete("/:id", especiespetController.Erase);

module.exports = router;
