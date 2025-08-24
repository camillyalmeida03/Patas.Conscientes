// Importanto extensões
const express = require('express');
const dotenv = require('dotenv');

// Conexão com o banco
const {checkConnection } = require("./models/database");

// Pegando os dados para as rotas das API's das tabelas
const rotasSexo = require("./routers/sexoRouters");
const rotasEstados = require("./routers/estadosRouters");
const rotasCidades = require("./routers/cidadesRouters");
const rotasBairros = require("./routers/bairrosRouters");
const rotasRuas = require("./routers/ruasRouters");

dotenv.config();

// Puxando a porta do arquivo .env
const Port = process.env.APP_PORT || 3000;

const app = express();

app.use(express.json());

// Retorno quanto ao funcionamento da conexão com o banco
(async () => {
    const isDbConnected = await checkConnection();
    if (isDbConnected) {
        console.log("Servidor Banco de Dados - OK ...");
    } else {
        console.error("Falha na conexão com o banco de dados!");
    }
})();

app.get("/", (request, response) => {
    response.send({"message": "Servidor rodando !"});
});

// Usando as rotas puxadas anteriormente
app.use("/sexos", rotasSexo);
app.use("/estados", rotasEstados);
app.use("/cidades", rotasCidades);
app.use("/bairros", rotasBairros);
app.use("/ruas", rotasRuas);

// Informando a porta usada
app.listen(Port, () => {
    console.log(`servidor rodando na porta: ${Port}`)
});