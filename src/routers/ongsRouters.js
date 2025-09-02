// Define as rotas da entidade ongs, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const ongsController = require("../controllers/ongsControllers");

router.get("/", ongsController.GetAll);
router.get("/:id", ongsController.GetById);
router.post("/", ongsController.Post);
router.put("/:id", ongsController.Put);
router.delete("/:id", ongsController.Erase);

module.exports = router;