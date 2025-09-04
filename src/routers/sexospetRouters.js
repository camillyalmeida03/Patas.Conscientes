// Define as rotas da entidade sexopet, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const sexopetController = require("../controllers/sexospetsControllers");

router.get("/", sexopetController.GetAll);
router.get("/:id", sexopetController.GetById);
router.post("/", sexopetController.Post);
router.put("/:id", sexopetController.Put);
router.delete("/:id", sexopetController.Erase);

module.exports = router;
