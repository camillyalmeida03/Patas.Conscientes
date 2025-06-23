const express = require('express');
const { checkConnection } = require("./src/model/database");
const rotasUsuarios = require("./src/routers/usuariosRouters");
const rotasOngs = require("./src/routers/ongsRouters");
const rotasAdotantes = require("./src/routers/adotantesRouters");
const rotasResponsaveis = require("./src/routers/responsaveisRouters")
const rotasEnderecos = require("./src/routers/enderecosRouters");
const rotasBairros = require("./src/routers/bairrosRouters");
const rotasCidades = require("./src/routers/cidadesRouters");
const rotasRuas = require("./src/routers/ruasRouters");
const rotasUf = require("./src/routers/ufRouters");
const cors = require('cors');
const path = require('path');
const fileupload = require('express-fileupload');
const dotenv = require("dotenv");
const fs = require('fs');

dotenv.config();
const app = express();

app.use(cors());

// ⚠️ Coloque o fileupload antes
app.use(fileupload());

// Depois disso, use os body parsers:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '..')));

// Rotas
app.get("/", (request, response) => {
    response.send({ "message": "Servidor rodando!" });
});

app.use("/usuarios", rotasUsuarios);
app.use("/ongs", rotasOngs);
app.use("/adotantes", rotasAdotantes);
app.use("/responsaveis", rotasResponsaveis);
app.use("/enderecos", rotasEnderecos);
app.use("/bairros", rotasBairros);
app.use("/cidades", rotasCidades);
app.use("/ruas", rotasRuas);
app.use("/uf", rotasUf);



// Caminho para a pasta uploads e subpasta foto_perfil
const uploadsPath = path.join(__dirname, '..', 'uploads', 'foto_perfil');

// Verifique e crie as pastas, se necessário
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });  // Cria a subpasta foto_perfil
}

app.post('/upload', (req, res) => {
  console.log(req.files);  // Verifica o arquivo recebido

  if (!req.files || !req.files.foto) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  const foto = req.files.foto;
  // Caminho completo para salvar o arquivo na subpasta foto_perfil
  const uploadPath = path.join(uploadsPath, foto.name);

  console.log('Caminho do arquivo:', uploadPath);  // Verifica o caminho no console

  foto.mv(uploadPath, (err) => {
    if (err) {
      console.error('Erro ao mover o arquivo:', err);
      return res.status(500).send(err);
    }

    res.send('Arquivo enviado com sucesso!');
  });
});

const Port = process.env.APP_PORT;

app.listen(Port, () => {
    console.log(`Servidor rodando na porta: ${Port}`);
});

