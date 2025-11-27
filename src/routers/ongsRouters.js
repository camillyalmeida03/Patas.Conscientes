const express = require("express");
const router = express.Router();
const ongsController = require("../controllers/ongsControllers");
const verificarToken = require("../middlewares/authMiddleware");

const upload = require("../config/multerConfig");

router.get("/", ongsController.GetAll);
router.get("/:id", ongsController.GetById);
router.post("/", verificarToken, ongsController.Post);
router.put("/:id", ongsController.Put);
router.delete("/:id", ongsController.Erase);
router.patch("/foto/:id", upload.single('foto'), ongsController.AtualizarFoto);
router.patch("/banner/:id", upload.single('banner'), ongsController.AtualizarBanner);

module.exports = router;