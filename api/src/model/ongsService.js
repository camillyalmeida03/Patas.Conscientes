const express = require("express");

const { banco } = require("./database");

const bcrypt = require("bcrypt");

const GetAll = async (request, response) => {
  try {
    const querySelect = `SELECT 
                o.usuario_id, o.nome_ong, o.cnpj, o.descricao,
                e.id_endereco, e.cep, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.complemento,
                u.telefone, u.celular, u.email, u.senha,
                re.nome_responsavel, re.cpf_responsavel, re.email_responsavel
            FROM usuarios u `;

    const queryInnerJoin = `INNER JOIN ongs o ON o.usuario_id = u.id
            INNER JOIN responsaveis re ON re.id_ong_fk = o.usuario_id  
            INNER JOIN enderecos e ON e.id_endereco = u.endereco_id
            INNER JOIN ruas r ON r.id_rua = e.id_rua_fk
            INNER JOIN bairros b ON b.id_bairro = r.id_bairro_fk
            INNER JOIN cidades c ON c.id_cidade = b.id_cidade_fk
            INNER JOIN uf ON uf.id_uf = c.id_uf_fk `;

    const queryOrderBy = `ORDER BY o.usuario_id`;

    const queryText = querySelect + queryInnerJoin + queryOrderBy;

    const [data] = await banco.query(queryText); // mysql2/promise retorna [rows, fields]

    response.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar todas as ONGs:", error.message);
    response
      .status(500)
      .send({ message: "Falha ao buscar ONGs. Tente novamente mais tarde." });
  }
};

const GetById = async (request, response) => {
  try {
    const id = request.params.id; // Este ID da rota agora é o usuario_id

    const querySelect = `SELECT 
                o.usuario_id, o.nome_ong, o.cnpj, o.descricao,
                e.id_endereco, e.cep, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.complemento,
                u.telefone, u.celular, u.email, u.senha,
                re.nome_responsavel, re.cpf_responsavel, re.email_responsavel
            FROM usuarios u `;

    const queryInnerJoin = `INNER JOIN ongs o ON o.usuario_id = u.id
            INNER JOIN responsaveis re ON re.id_ong_fk = o.usuario_id  
            INNER JOIN enderecos e ON e.id_endereco = u.endereco_id
            INNER JOIN ruas r ON r.id_rua = e.id_rua_fk
            INNER JOIN bairros b ON b.id_bairro = r.id_bairro_fk
            INNER JOIN cidades c ON c.id_cidade = b.id_cidade_fk
            INNER JOIN uf ON uf.id_uf = c.id_uf_fk `;

    const queryWhere = "WHERE o.usuario_id=? ";

    const queryText = querySelect + queryInnerJoin + queryWhere;

    const [data] = await banco.query(queryText, [id]);

    response.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar ONG por ID (usuário):", error.message);
    response
      .status(500)
      .send({ message: "Falha ao buscar a ONG. Tente novamente mais tarde." });
  }
};

const Erase = async (request, response) => {
  const connection = await banco.getConnection();
  try {
    const idUsuario = request.params.id;

    await connection.beginTransaction();

    // 1. Buscar os dados relacionados para saber os IDs de ligação
    const [result] = await connection.query(
      `SELECT o.usuario_id, e.id_endereco, re.id AS id_responsavel 
       FROM usuarios u
       INNER JOIN ongs o ON o.usuario_id = u.id
       INNER JOIN responsaveis re ON re.id_ong_fk = o.usuario_id
       INNER JOIN enderecos e ON e.id_endereco = u.endereco_id
       WHERE u.id = ?`,
      [idUsuario]
    );

    if (result.length === 0) {
      await connection.release();
      return response.status(404).send({ message: "Usuário não encontrado." });
    }

    const { id_endereco, id_responsavel } = result[0];

    // 2. Deletar dados em ordem correta
    await connection.query("DELETE FROM mensagens WHERE usuario_id = ?", [
      idUsuario,
    ]);
    await connection.query("DELETE FROM pets WHERE usuario_id = ?", [
      idUsuario,
    ]);
    await connection.query("DELETE FROM responsaveis WHERE id = ?", [
      id_responsavel,
    ]);
    await connection.query("DELETE FROM ongs WHERE usuario_id = ?", [
      idUsuario,
    ]);
    await connection.query("DELETE FROM enderecos WHERE id_endereco = ?", [
      id_endereco,
    ]);
    await connection.query("DELETE FROM usuarios WHERE id = ?", [idUsuario]);

    // 3. Commit da transação
    await connection.commit();
    connection.release();

    response
      .status(200)
      .send({ message: "Conta e dados relacionados deletados com sucesso!" });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Erro ao deletar conta:", error.message);
    response.status(500).send({ message: "Erro ao deletar a conta." });
  }
};

const Update = async (id, dados) => {
  const connection = await banco.getConnection();
  try {
    await connection.beginTransaction();

    // Atualiza dados da tabela `ongs`
    await connection.query(
      "UPDATE ongs SET nome_ong = ?, cnpj = ?, descricao = ? WHERE usuario_id = ?",
      [dados.nome_ong, dados.cnpj, dados.descricao, id]
    );

    // Atualiza dados do responsável
    await connection.query(
      "UPDATE responsaveis SET nome_responsavel = ?, cpf_responsavel = ?, email_responsavel = ? WHERE id_ong_fk = ?",
      [
        dados.nome_responsavel,
        dados.cpf_responsavel,
        dados.email_responsavel,
        id,
      ]
    );

    // Atualiza dados de contato do usuário
    await connection.query(
      "UPDATE usuarios SET telefone = ?, celular = ?, email = ?, senha = ? WHERE id = ?",
      [dados.telefone, dados.celular, dados.email, dados.senha, id]
    );

    // Atualiza o endereço
    await connection.query(
      "UPDATE enderecos SET cep = ?, numero = ?, complemento = ? WHERE id_endereco = ?",
      [dados.cep, dados.numero, dados.complemento, dados.id_endereco]
    );

    await connection.commit();
    connection.release();
    return { success: true, message: "Dados atualizados com sucesso!" };
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Erro ao atualizar ONG:", error.message);
    throw new Error("Erro ao atualizar ONG.");
  }
};

const createOng = async (dados) => {
  const conn = await banco.getConnection();
  await conn.beginTransaction();

  try {
    // Criptografar a senha antes de salvar no banco
    const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

    const enderecoResult = await conn.query(
      `INSERT INTO enderecos (id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        dados.uf,
        dados.cidade,
        dados.bairro,
        dados.rua,
        dados.numero,
        dados.cep,
        dados.complemento,
      ]
    );
    const id_endereco = enderecoResult[0].insertId;

    const usuarioResult = await conn.query(
      `INSERT INTO usuarios (telefone, celular, email, senha, endereco_id)
       VALUES (?, ?, ?, ?, ?)`,
      [dados.telefone, dados.celular, dados.email, senhaCriptografada, id_endereco]
    );
    const usuario_id = usuarioResult[0].insertId;

    await conn.query(
      `INSERT INTO ongs (usuario_id, nome_ong, cnpj, descricao)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, dados.nome_ong, dados.cnpj, dados.descricao || null]
    );

    await conn.query(
      `INSERT INTO responsaveis (id_ong_fk, nome_responsavel, cpf_responsavel, email_responsavel)
       VALUES (?, ?, ?, ?)`,
      [
        usuario_id,
        dados.nome_responsavel,
        dados.cpf_responsavel,
        dados.email_responsavel,
      ]
    );

    await conn.commit();
    conn.release();
    return { status: 201, message: "Cadastro realizado com sucesso!" };
  } catch (error) {
    await conn.rollback();
    conn.release();
    return {
      status: 500,
      message: "Erro interno no servidor ao cadastrar.",
      error: error.message,
    };
  }
};

module.exports = {
  GetAll,
  GetById,
  Erase,
  createOng,
  Update
};

// const CreateOng = async (request, response) => {
//   try {
//     const {
//       nome_responsavel,
//       email,
//       telefone,
//       celular,
//       senha,
//       foto,
//       nome_ong,
//       cnpj,
//     } = request.body;

//     // Verificação básica
//     if (!nome_responsavel || !email || !senha || !nome_ong || !cnpj) {
//       return response.status(400).send({
//         message:
//           "Algum dos campos obrigatórios faltando: nome do responsável, email, senha, nome da ONG e CNPJ são obrigatórios.",
//       });
//     }

//     // Verifica se o email já existe
//     const [usuariosExistentes] = await banco.query(
//       "SELECT id FROM usuarios WHERE email = ?",
//       [email]
//     );
//     if (usuariosExistentes.length > 0) {
//       return response.status(409).send({ message: "Email já cadastrado." });
//     }

//     // Criptografar a senha
//     const senhaCriptografada = await bcrypt.hash(senha, 10);

//     // Inserir na tabela de usuários
//     const queryUsuario = `
//             INSERT INTO usuarios (nome, email, telefone, celular, senha, foto, tipo)
//             VALUES (?, ?, ?, ?, ?, ?, 'ong');
//         `;
//     const [usuarioResult] = await banco.query(queryUsuario, [
//       nome_responsavel,
//       email,
//       telefone,
//       celular,
//       senhaCriptografada,
//       foto,
//     ]);

//     const usuarioId = usuarioResult.insertId;

//     // Inserir na tabela de ONGs
//     const queryOng = `
//             INSERT INTO ongs (usuario_id, nome_ong, cnpj)
//             VALUES (?, ?, ?);
//         `;
//     await banco.query(queryOng, [usuarioId, nome_ong, cnpj]);

//     response.status(201).send({
//       message: "ONG cadastrada com sucesso!",
//       usuario_id: usuarioId,
//     });
//   } catch (error) {
//     console.error("Erro ao criar ONG:", error.message);
//     response.status(500).send({
//       message: "Erro ao cadastrar a ONG. Tente novamente mais tarde.",
//     });
//   }
// };



// const AtualizarNomeOng = async (request, response) => {
//   try {
//     const id = request.params.id; // usuário_id da ONG
//     const { nome_ong } = request.body;

//     await banco.query(
//       "UPDATE ongs SET nome_ong = ? WHERE usuario_id = ?",
//       [nome_ong, id]
//     );

//     response
//       .status(200)
//       .send({ message: "Nome da ONG atualizado com sucesso!" });
//   } catch (error) {
//     console.log("Erro ao atualizar nome da ONG:", error.message);
//     response.status(500).send({ message: "Erro ao atualizar nome da ONG" });
//   }
// };

// const AtualizarCnpj = async (request, response) => {
//   try {
//     const id = request.params.id;
//     const { cnpj } = request.body;

//     await banco.query("UPDATE ongs SET cnpj = ? WHERE usuario_id = ?", [
//       cnpj,
//       id,
//     ]);

//     response.status(200).send({ message: "CNPJ atualizado com sucesso!" });
//   } catch (error) {
//     console.log("Erro ao atualizar CNPJ:", error.message);
//     response.status(500).send({ message: "Erro ao atualizar CNPJ" });
//   }
// };
