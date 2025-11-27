// src/routers/petsRouters.js
const express = require("express");
const router = express.Router();
const petsController = require("../controllers/petsControllers");
const upload = require("../config/multerConfig");

// --- FUNÇÃO DE DEBUG PARA O UPLOAD ---
// Isso vai impedir que o servidor devolva HTML de erro e mostre o JSON real do problema
const uploadSeguro = (req, res, next) => {
    const uploadFunc = upload.single('fotopet');

    uploadFunc(req, res, function (err) {
        if (err) {
            console.error("❌ ERRO GRAVE NO UPLOAD (MULTER):", err);
            // Devolve o erro como JSON para aparecer no alerta do navegador
            return res.status(500).json({ 
                message: "Erro na configuração de Upload/Cloudinary", 
                details: err.message 
            });
        }
        // Se não deu erro, passa para o Controller
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