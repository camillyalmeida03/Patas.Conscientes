// Define as rotas da entidade racasopet, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const racaspetController = require("../controllers/racaspetsControllers");

router.get("/racascachorro", racaspetController.racascachorro);
router.get("/selectracagato", racaspetController.racasgato);
router.get("/", racaspetController.GetAll);
router.get("/:id", racaspetController.GetById);
router.post("/", racaspetController.Post);
router.put("/:id", racaspetController.Put);
router.delete("/:id", racaspetController.Erase);


module.exports = router;