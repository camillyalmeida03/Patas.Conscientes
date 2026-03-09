// Define as rotas da entidade usuarios, mapeando os endpoints HTTP para as funções do controller.

const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");
const upload = require("../config/multerConfig");

router.get("/", usuariosController.GetAll);
router.get("/:id", usuariosController.GetById);
router.post("/", usuariosController.Post);
router.patch("/foto/:id", upload.single('foto'), usuariosController.AtualizarFoto);
router.put("/:id", usuariosController.Put);
router.delete("/:id", usuariosController.Erase);
router.put("/usuario/endereco/:id", usuariosController.PutEndereco);


module.exports = router;