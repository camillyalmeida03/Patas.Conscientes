const { Router } = require('express'); 
const myController = require("../controllers/sexoControllers");

const rota = Router();

// consultas
rota.get("/", myController.GetAll);

module.exports = rota;
