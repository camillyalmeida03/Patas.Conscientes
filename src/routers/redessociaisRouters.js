// Define as rotas da entidade redessociais, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const redessociaisController = require("../controllers/redessociaisControllers");

router.get("/", redessociaisController.GetAll);
router.get("/:id", redessociaisController.GetById);
router.post("/", redessociaisController.Post);
router.put("/:id", redessociaisController.Put);
router.delete("/:id", redessociaisController.Erase);

module.exports = router;