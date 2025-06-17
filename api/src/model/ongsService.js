const express = require("express");

const { banco } = require("./database");

const bcrypt = require("bcrypt");

const GetAll = async (request, response) => {
  try {
    const query = `
            SELECT 
                u.id AS usuario_id,
                u.nome AS nome_usuario,
                u.email,
                u.telefone,
                u.celular,
                u.foto,
                u.tipo,
                u.criado_em,
                u.acessibilidade_ativa,
                u.tema,
                u.endereco_id,
                o.nome_ong,
                o.cnpj,
                o.banner,
                o.descricao
            FROM 
                usuarios AS u
            INNER JOIN 
                ongs AS o ON u.id = o.usuario_id
            WHERE 
                u.tipo = 'ong';
                `;
    const [ongs] = await banco.query(query); // mysql2/promise retorna [rows, fields]

    response.status(200).send(ongs);
  } catch (error) {
    console.error("Erro ao buscar todas as ONGs:", error.message);
    response
      .status(500)
      .send({ message: "Falha ao buscar ONGs. Tente novamente mais tarde." });
  }
};

const GetById = async (request, response) => {
  try {
    const ongUsuarioId = request.params.id; // Este ID da rota agora é o usuario_id

    if (!ongUsuarioId) {
      return response
        .status(400)
        .send({ message: "ID da ONG (usuário) não fornecido." });
    }

    const query = `
  SELECT 
      u.id AS usuario_id,
      u.nome AS nome_usuario,
      u.email,
      u.telefone,
      u.celular,
      u.foto,
      u.tipo,
      u.criado_em,
      u.acessibilidade_ativa,
      u.tema,
      u.endereco_id,
      o.nome_ong,
      o.cnpj,
      o.banner,
      o.descricao
  FROM 
      usuarios AS u
  INNER JOIN 
      ongs AS o ON u.id = o.usuario_id
  WHERE 
      u.tipo = 'ong'
      AND u.id = ?;
`;

    const [ongs] = await banco.query(query, [ongUsuarioId]);

    if (ongs.length > 0) {
      response.status(200).send(ongs[0]); // Retorna o primeiro (e único) resultado
    } else {
      response.status(404).send({ message: "ONG não encontrada." });
    }
  } catch (error) {
    console.error("Erro ao buscar ONG por ID (usuário):", error.message);
    response
      .status(500)
      .send({ message: "Falha ao buscar a ONG. Tente novamente mais tarde." });
  }
};

const Erase = async (request, response) => {
  try {
    const id = request.params.id;
    const data = await banco.query("DELETE FROM ongs WHERE id=?", [id]);
    response.status(200).send(data[0]);
  } catch (error) {
    console.log("Erro ao conectar ao banco de dados: ", error.message);
    response.status(401).send({ message: "Falha ao executar a ação!" });
  }
};

const AtualizarNomeOng = async (request, response) => {
  try {
    const id = request.params.id;
    const { nome_ong } = request.body;

    await banco.query("UPDATE ongs SET nome_ong = ? WHERE usuario_id = ?", [
      nome_ong,
      id,
    ]);

    response
      .status(200)
      .send({ message: "Nome da ONG atualizado com sucesso!" });
  } catch (error) {
    console.log("Erro ao atualizar nome da ONG:", error.message);
    response.status(500).send({ message: "Erro ao atualizar nome da ONG" });
  }
};

const AtualizarCnpj = async (request, response) => {
  try {
    const id = request.params.id;
    const { cnpj } = request.body;

    await banco.query("UPDATE ongs SET cnpj = ? WHERE usuario_id = ?", [
      cnpj,
      id,
    ]);

    response.status(200).send({ message: "CNPJ atualizado com sucesso!" });
  } catch (error) {
    console.log("Erro ao atualizar CNPJ:", error.message);
    response.status(500).send({ message: "Erro ao atualizar CNPJ" });
  }
};

const CreateOng = async (request, response) => {
  try {
    const {
      nome_responsavel,
      email,
      telefone,
      celular,
      senha,
      foto,
      nome_ong,
      cnpj,
    } = request.body;

    // Verificação básica
    if (!nome_responsavel || !email || !senha || !nome_ong || !cnpj) {
      return response.status(400).send({
        message:
          "Campos obrigatórios faltando: nome do responsável, email, senha, nome da ONG e CNPJ são obrigatórios.",
      });
    }

    // Verifica se o email já existe
    const [usuariosExistentes] = await banco.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );
    if (usuariosExistentes.length > 0) {
      return response.status(409).send({ message: "Email já cadastrado." });
    }

    // Criptografar a senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    // Inserir na tabela de usuários
    const queryUsuario = `
            INSERT INTO usuarios (nome, email, telefone, celular, senha, foto, tipo)
            VALUES (?, ?, ?, ?, ?, ?, 'ong');
        `;
    const [usuarioResult] = await banco.query(queryUsuario, [
      nome_responsavel,
      email,
      telefone,
      celular,
      senhaCriptografada,
      foto,
    ]);

    const usuarioId = usuarioResult.insertId;

    // Inserir na tabela de ONGs
    const queryOng = `
            INSERT INTO ongs (usuario_id, nome_ong, cnpj)
            VALUES (?, ?, ?);
        `;
    await banco.query(queryOng, [usuarioId, nome_ong, cnpj]);

    response.status(201).send({
      message: "ONG cadastrada com sucesso!",
      usuario_id: usuarioId,
    });
  } catch (error) {
    console.error("Erro ao criar ONG:", error.message);
    response.status(500).send({
      message: "Erro ao cadastrar a ONG. Tente novamente mais tarde.",
    });
  }
};

module.exports = {
  GetAll,
  GetById,
  Erase,
  AtualizarNomeOng,
  AtualizarCnpj,
  CreateOng,
};
