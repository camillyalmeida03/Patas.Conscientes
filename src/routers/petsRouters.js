// Define as rotas da entidade pets, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsControllers");

router.get("/", petsController.GetAll);
router.get("/:id", petsController.GetById);
router.post("/", petsController.Post);
router.put("/:id", petsController.Put);
router.delete("/:id", petsController.Erase);
router.post('/pornome', petsController.PostPeloNomeDaRaca);

module.exports = router;