// Define as rotas da entidade responsaveis, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const responsaveisControllers = require("../controllers/responsaveisControllers");

router.get("/", responsaveisControllers.GetAll);
router.get("/:id", responsaveisControllers.GetById);
router.post("/", responsaveisControllers.Post);
router.put("/:id", responsaveisControllers.Put);
router.delete("/:id", responsaveisControllers.Erase);

module.exports = router;