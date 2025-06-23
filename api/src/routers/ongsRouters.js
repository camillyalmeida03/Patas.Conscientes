const { Router } = require("express");
const express = require('express');
const path = require('path');
const fs = require('fs');

const {
  GetAll,
  GetById,
  Erase,
  createOng,
  Update, // <- Adicione isso aqui
} = require("../model/ongsService");

const rota = Router();


// Rotas CRUD básicas
rota.get("/", GetAll);
rota.get("/:id", GetById);
rota.delete("/:id", Erase);
rota.post("/ongs", (req, res) => createOng(req.body, res));
rota.put("/:id", Update);

// Caminho para a pasta uploads e subpasta foto_perfil
const uploadsPath = path.join(__dirname, '..', 'uploads', 'foto_perfil');

// Verifique e crie as pastas, se necessário
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath, { recursive: true });  // Cria a subpasta foto_perfil
}

// Rota de upload da foto da ONG
rota.post('/upload', (req, res) => {
  console.log(req.files);  // Verifica o arquivo recebido

  if (!req.files || !req.files.foto) {
    return res.status(400).send('Nenhum arquivo foi enviado.');
  }

  const foto = req.files.foto;
  const uploadPath = path.join(uploadsPath, foto.name);

  console.log('Caminho do arquivo:', uploadPath);  // Verifica o caminho no console

  // Move o arquivo para a pasta foto_perfil
  foto.mv(uploadPath, (err) => {
    if (err) {
      console.error('Erro ao mover o arquivo:', err);
      return res.status(500).send(err);
    }

    res.send('Arquivo enviado com sucesso!');
  });
});


module.exports = rota;
