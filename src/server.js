// Importanto extensões
const express = require('express');
const dotenv = require('dotenv');

// Conexão com o banco
const {checkConnection } = require("./models/database");

// Rotas das API's das tabelas
const rotasSexo = require("./routers/sexoRouters");

dotenv.config();

// Puxando a porta do arquivo .env
const Port = process.env.APP_PORT || 3000;

const app = express();

app.use(express.json());

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

// app.use("/cidades", rotasCidades);
// app.use("/contatos", rotasContatos);
// app.use("/usuarios", rotasUsuarios);
// app.use("/estados", rotasEstados );
// app.use("/auth", rotasAuth);
// app.use("/viacep", rotasviacep);

app.use("/sexos", rotasSexo);

app.listen(Port, () => {
    console.log(`servidor rodando na porta: ${Port}`)
});