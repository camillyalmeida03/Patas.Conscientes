const express = require("express");
const { checkConnection } = require("./src/model/database");
const { banco } = require("./src/model/database");

const rotasUsuarios = require("./src/routers/usuariosRouters");
const rotasOngs = require("./src/routers/ongsRouters");
const rotasAdotantes = require("./src/routers/adotantesRouters");
const rotasResponsaveis = require("./src/routers/responsaveisRouters");
const rotasEnderecos = require("./src/routers/enderecosRouters");
const rotasBairros = require("./src/routers/bairrosRouters");
const rotasCidades = require("./src/routers/cidadesRouters");
const rotasRuas = require("./src/routers/ruasRouters");
const rotasUf = require("./src/routers/ufRouters");
const cors = require("cors");
const path = require("path");
const fileupload = require("express-fileupload");
const dotenv = require("dotenv");
const fs = require("fs");

dotenv.config();
const app = express();

app.use(cors());

// ⚠️ Coloque o fileupload antes
app.use(fileupload());

// Depois disso, use os body parsers:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "..")));

// Rotas
app.get("/", (request, response) => {
  response.send({ message: "Servidor rodando!" });
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

// Caminhos para a pasta uploads e suas subpastas
const uploadsFotoPerfilPath = path.join(
  __dirname,
  "..",
  "uploads",
  "foto_perfil"
);
const uploadsBannerPath = path.join(__dirname, "..", "uploads", "banner_ong");
const uploadsFotoPet = path.join(__dirname, "..", "uploads", "foto_pet");

// Verifique e crie as pastas, se necessário
if (!fs.existsSync(uploadsFotoPerfilPath)) {
  fs.mkdirSync(uploadsFotoPerfilPath, { recursive: true });
}

if (!fs.existsSync(uploadsBannerPath)) {
  fs.mkdirSync(uploadsBannerPath, { recursive: true });
}

if (!fs.existsSync(uploadsFotoPet)) {
  fs.mkdirSync(uploadsFotoPet, { recursive: true });
}

app.post("/uploadfotoperfil/:id", async (req, res) => {
  const id = req.params.id;

  if (!req.files || !req.files.fotoperfilong) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  const foto = req.files.fotoperfilong;
  const nomeArquivo = `perfil_${id}_${Date.now()}_${foto.name}`;
  const uploadPath = path.join(uploadsFotoPerfilPath, nomeArquivo);
  const caminhoRelativo = `/uploads/foto_perfil/${nomeArquivo}`;

  foto.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      await banco.query(`UPDATE usuarios SET foto = ? WHERE id = ?`, [
        caminhoRelativo,
        id,
      ]);
      res.status(200).send({
        message: "Foto de perfil atualizada!",
        caminho: caminhoRelativo,
      });
    } catch (erro) {
      console.error("Erro ao salvar caminho no banco:", erro);
      res
        .status(500)
        .send({ message: "Erro ao salvar caminho no banco.", erro });
    }
  });
});

app.post("/uploadbannerong/:usuarioId", async (req, res) => {
  const usuarioId = req.params.usuarioId;

  if (!req.files || !req.files.bannerong) {
    return res.status(400).send("Nenhum arquivo foi enviado.");
  }

  const foto = req.files.bannerong;
  const nomeArquivo = `banner_${usuarioId}_${Date.now()}_${foto.name}`;
  const uploadPath = path.join(uploadsBannerPath, nomeArquivo);
  const caminhoRelativo = `/uploads/banner_ong/${nomeArquivo}`;

  foto.mv(uploadPath, async (err) => {
    if (err) {
      return res.status(500).send(err);
    }

    try {
      await banco.query(`UPDATE ongs SET banner = ? WHERE usuario_id = ?`, [
        caminhoRelativo,
        usuarioId,
      ]);
      res
        .status(200)
        .send({ message: "Banner atualizado!", caminho: caminhoRelativo });
    } catch (erro) {
      console.error("Erro ao salvar caminho no banco:", erro);
      res
        .status(500)
        .send({ message: "Erro ao salvar caminho no banco.", erro });
    }
  });
});

// app.post('/uploadfotopet', (req, res) => {
//   console.log(req.files);  // Verifica o arquivo recebido

//   if (!req.files || !req.files.foto) {
//     return res.status(400).send('Nenhum arquivo foi enviado.');
//   }

//   const foto = req.files.foto;
//   // Caminho completo para salvar o arquivo na subpasta foto_perfil
//   const uploadPath = path.join(uploadsFotoPerfilPath, foto.name);

//   console.log('Caminho do arquivo:', uploadPath);  // Verifica o caminho no console

//   foto.mv(uploadPath, (err) => {
//     if (err) {
//       console.error('Erro ao mover o arquivo:', err);
//       return res.status(500).send(err);
//     }

//     res.send('Arquivo enviado com sucesso!');
//   });
// });

const Port = process.env.APP_PORT;

app.listen(Port, () => {
  console.log(`Servidor rodando na porta: ${Port}`);
});
