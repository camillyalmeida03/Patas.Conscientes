const express = require('express');
const { checkConnection } = require("./src/model/database");
const rotasUsuarios = require("./src/routers/usuariosRouters");
const rotasOngs = require("./src/routers/ongsRouters");
const rotasAdotantes = require("./src/routers/adotantesRouters");
const rotasEnderecos = require("./src/routers/enderecosRouters");
const rotasBairros = require("./src/routers/bairrosRouters");
const rotasCidades = require("./src/routers/cidadesRouters");
const rotasRuas = require("./src/routers/ruasRouters");
const rotasUf = require("./src/routers/ufRouters");
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
app.use("/enderecos", rotasEnderecos);
app.use("/bairros", rotasBairros);
app.use("/cidades", rotasCidades);
app.use("/ruas", rotasRuas);
app.use("/uf", rotasUf);


app.listen(Port, () => {
    console.log(`Servidor rodando na porta: ${Port}`)
});
