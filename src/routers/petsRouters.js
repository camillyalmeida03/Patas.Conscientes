// src/routers/petsRouters.js
const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsControllers");
const upload = require("../config/multerConfig");

const uploadSeguro = (req, res, next) => {
    const uploadFunc = upload.single('fotopet');

    uploadFunc(req, res, function (err) {
        if (err) {
            console.error("❌ ERRO GRAVE NO UPLOAD (MULTER):", err);
            return res.status(500).json({ 
                message: "Erro na configuração de Upload/Cloudinary", 
                details: err.message 
            });
        }
        next();
    });
};

router.get("/", petsController.GetAll);
router.get("/:id", petsController.GetById);

// Rotas com proteção de erro no upload
router.post("/", uploadSeguro, petsController.Post);
router.post('/pornome', uploadSeguro, petsController.PostPeloNomeDaRaca);

router.put("/:id", petsController.Put);
router.delete("/:id", petsController.Erase);

module.exports = router;