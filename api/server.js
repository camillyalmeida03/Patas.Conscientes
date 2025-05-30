const express = require('express');
const { checkConnection } = require("./src/model/database");
const rotasUsuarios = require("./src/routers/usuariosRouters");
const rotasOngs = require("./src/routers/ongsRouters");
const rotasAdotantes = require("./src/routers/adotantesRouters");
const cors = require('cors');
const path = require('path');
const dotenv = require("dotenv");
const multer = require('multer'); // <-- AQUI
const upload = multer();          // <-- AQUI

dotenv.config();
const app = express();
const Port = process.env.APP_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static('../uploads'));
app.use(express.static(path.join(__dirname, '..')));

app.get("/", (request, response) => {
    response.send({ "message": "Servidor rodando!" })
});

app.use("/usuarios", rotasUsuarios);
app.use("/ongs", rotasOngs);
app.use("/adotantes", rotasAdotantes);

app.listen(Port, () => {
    console.log(`Servidor rodando na porta: ${Port}`)
});
