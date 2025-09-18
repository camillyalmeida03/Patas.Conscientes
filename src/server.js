// Importanto extensões
const path = require("path");
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
const rotasEnderecos = require("./routers/enderecosRouters");
const rotasTiposUsuario = require("./routers/tipos_usuarioRouters");
const rotasUsuarios = require("./routers/usuariosRouters");
const rotasOngs = require("./routers/ongsRouters");
const rotasResponsaveis = require("./routers/responsaveisRouters");
const rotasFuncionarios = require("./routers/funcionariosRouters");
const rotasRedesSociais = require("./routers/redessociaisRouters");
const rotasStatus = require("./routers/statusRouters");
const rotasSexosPets = require("./routers/sexospetRouters");
const rotasEspeciesPet = require("./routers/especiespetsRouters");
const rotasRacasPet = require("./routers/racaspetsRouters");
const rotasPortesPet = require("./routers/portespetsRouters");
const rotasPet = require("./routers/petsRouters");
const rotasPetsFavoritados = require("./routers/petsfavoritadosRouters");
const rotasOngsFavoritadas = require("./routers/ongsfavoritadasRouters");

dotenv.config();

// Puxando a porta do arquivo .env
const Port = process.env.APP_PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..")));

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
app.use("/enderecos", rotasEnderecos);
app.use("/tiposusuario", rotasTiposUsuario);
app.use("/usuarios", rotasUsuarios);
app.use("/ongs", rotasOngs);
app.use("/responsaveis", rotasResponsaveis);
app.use("/funcionarios", rotasFuncionarios);
app.use("/redessociais", rotasRedesSociais);
app.use("/status", rotasStatus);
app.use("/sexospets", rotasSexosPets);
app.use("/especiespets", rotasEspeciesPet);
app.use("/racaspets", rotasRacasPet);
app.use("/portespets", rotasPortesPet);
app.use("/pets", rotasPet);
app.use("/petsfavoritados", rotasPetsFavoritados);
app.use("/ongsfavoritadas", rotasOngsFavoritadas);

// Informando a porta usada
app.listen(Port, () => {
    console.log(`servidor rodando na porta: ${Port}`)
});