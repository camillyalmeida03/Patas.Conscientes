const express = require("express");
const { checkConnection } = require("./src/model/database");
const { banco } = require("./src/model/database");
const cors = require("cors");
const app = express();
const path = require("path");

const rotasUsuarios = require("./src/routers/usuariosRouters");
const rotasOngs = require("./src/routers/ongsRouters");
const rotasAdotantes = require("./src/routers/adotantesRouters");
const rotasResponsaveis = require("./src/routers/responsaveisRouters");
const rotasEnderecos = require("./src/routers/enderecosRouters");
const rotasBairros = require("./src/routers/bairrosRouters");
const rotasCidades = require("./src/routers/cidadesRouters");
const rotasRuas = require("./src/routers/ruasRouters");
const rotasUf = require("./src/routers/ufRouters");
const rotasEspecies = require("./src/routers/especiesRouters");
const rotasRacas = require("./src/routers/racasRouters");
const rotasSexopets = require("./src/routers/sexopetsRouters");
const rotasPortes = require("./src/routers/portesRouters");
const rotasPets = require("./src/routers/petsRouters");


const dotenv = require("dotenv");
dotenv.config();
const Port = process.env.APP_PORT;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('../uploads'));
app.use(express.static(path.join(__dirname, "..")));


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
app.use("/especies", rotasEspecies);
app.use("/racas", rotasRacas);
app.use("/sexopets", rotasSexopets);
app.use("/portes", rotasPortes);
app.use("/pets", rotasPets);


app.listen(Port, () => {
  console.log(`Servidor rodando na porta: ${Port}`);
});


// const fileupload = require("express-fileupload");
// const fs = require("fs");



// // ⚠️ Coloque o fileupload antes
// app.use(fileupload());

// // Depois disso, use os body parsers:

// // Arquivos estáticos

// // Rotas


// // Caminhos para a pasta uploads e suas subpastas
// const uploadsFotoPerfilPath = path.join(
//   __dirname,
//   "..",
//   "uploads",
//   "foto_perfil"
// );
// const uploadsBannerPath = path.join(__dirname, "..", "uploads", "banner_ong");
// const uploadsFotoPet = path.join(__dirname, "..", "uploads", "foto_pet");

// // Verifique e crie as pastas, se necessário
// if (!fs.existsSync(uploadsFotoPerfilPath)) {
//   fs.mkdirSync(uploadsFotoPerfilPath, { recursive: true });
// }

// if (!fs.existsSync(uploadsBannerPath)) {
//   fs.mkdirSync(uploadsBannerPath, { recursive: true });
// }

// if (!fs.existsSync(uploadsFotoPet)) {
//   fs.mkdirSync(uploadsFotoPet, { recursive: true });
// }

// app.post("/uploadfotoperfil/:id", async (req, res) => {
//   const id = req.params.id;

//   if (!req.files || !req.files.fotoperfilong) {
//     return res.status(400).send("Nenhum arquivo foi enviado.");
//   }

//   const foto = req.files.fotoperfilong;
//   const nomeArquivo = `perfil_${id}_${Date.now()}_${foto.name}`;
//   const uploadPath = path.join(uploadsFotoPerfilPath, nomeArquivo);
//   const caminhoRelativo = `/uploads/foto_perfil/${nomeArquivo}`;

//   foto.mv(uploadPath, async (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     try {
//       await banco.query(`UPDATE usuarios SET foto = ? WHERE id = ?`, [
//         caminhoRelativo,
//         id,
//       ]);
//       res.status(200).send({
//         message: "Foto de perfil atualizada!",
//         caminho: caminhoRelativo,
//       });
//     } catch (erro) {
//       console.error("Erro ao salvar caminho no banco:", erro);
//       res
//         .status(500)
//         .send({ message: "Erro ao salvar caminho no banco.", erro });
//     }
//   });
// });

// app.post("/uploadbannerong/:usuarioId", async (req, res) => {
//   const usuarioId = req.params.usuarioId;

//   if (!req.files || !req.files.bannerong) {
//     return res.status(400).send("Nenhum arquivo foi enviado.");
//   }

//   const foto = req.files.bannerong;
//   const nomeArquivo = `banner_${usuarioId}_${Date.now()}_${foto.name}`;
//   const uploadPath = path.join(uploadsBannerPath, nomeArquivo);
//   const caminhoRelativo = `/uploads/banner_ong/${nomeArquivo}`;

//   foto.mv(uploadPath, async (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     try {
//       await banco.query(`UPDATE ongs SET banner = ? WHERE usuario_id = ?`, [
//         caminhoRelativo,
//         usuarioId,
//       ]);
//       res
//         .status(200)
//         .send({ message: "Banner atualizado!", caminho: caminhoRelativo });
//     } catch (erro) {
//       console.error("Erro ao salvar caminho no banco:", erro);
//       res
//         .status(500)
//         .send({ message: "Erro ao salvar caminho no banco.", erro });
//     }
//   });
// });

// app.post("/uploadfotopet/:id", async (req, res) => {
//   const id = req.params.id;

//   if (!req.files || !req.files.fotopet) {
//     return res.status(400).send("Nenhum arquivo foi enviado.");
//   }

//   const foto = req.files.fotopet;
//   const nomeArquivo = `pet_${id}_${Date.now()}_${foto.name}`;
//   const uploadPath = path.join(uploadsFotoPet, nomeArquivo);
//   const caminhoRelativo = `/uploads/foto_pet/${nomeArquivo}`;

//   foto.mv(uploadPath, async (err) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     try {
//       await banco.query(
//         `UPDATE pets SET foto = ? WHERE id_pet = ?`,
//         [caminhoRelativo, id]
//       );

//       res.status(200).send({
//         message: "Foto do pet enviada com sucesso!",
//         caminho: caminhoRelativo,
//       });
//     } catch (erro) {
//       console.error("Erro ao salvar caminho no banco:", erro);
//       res.status(500).send({
//         message: "Erro ao salvar caminho no banco.",
//         erro,
//       });
//     }
//   });
// });


