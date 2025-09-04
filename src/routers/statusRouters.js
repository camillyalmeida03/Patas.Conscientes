// Define as rotas da entidade status, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const statusController = require("../controllers/statusControllers");

router.get("/", statusController.GetAll);
router.get("/:id", statusController.GetById);
router.post("/", statusController.Post);
router.put("/:id", statusController.Put);
router.delete("/:id", statusController.Erase);

module.exports = router;
