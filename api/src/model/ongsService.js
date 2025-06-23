// const express = require("express");

// const { banco } = require("./database");

// const bcrypt = require("bcrypt");

// const GetAll = async (request, response) => {
//   try {
//     const querySelect = `SELECT
//                 o.usuario_id, o.nome_ong, o.cnpj, o.descricao,
//                 e.id_endereco, e.cep, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.complemento,
//                 u.telefone, u.celular, u.email, u.senha,
//                 re.nome_responsavel, re.cpf_responsavel, re.email_responsavel
//             FROM usuarios u `;

//     const queryInnerJoin = `INNER JOIN ongs o ON o.usuario_id = u.id
//             INNER JOIN responsaveis re ON re.id_ong_fk = o.usuario_id
//             INNER JOIN enderecos e ON e.id_endereco = u.endereco_id
//             INNER JOIN ruas r ON r.id_rua = e.id_rua_fk
//             INNER JOIN bairros b ON b.id_bairro = r.id_bairro_fk
//             INNER JOIN cidades c ON c.id_cidade = b.id_cidade_fk
//             INNER JOIN uf ON uf.id_uf = c.id_uf_fk `;

//     const queryOrderBy = `ORDER BY o.usuario_id`;

//     const queryText = querySelect + queryInnerJoin + queryOrderBy;

//     const [data] = await banco.query(queryText); // mysql2/promise retorna [rows, fields]

//     response.status(200).send(data);
//   } catch (error) {
//     console.error("Erro ao buscar todas as ONGs:", error.message);
//     response
//       .status(500)
//       .send({ message: "Falha ao buscar ONGs. Tente novamente mais tarde." });
//   }
// };

// const GetById = async (request, response) => {
//   try {
//     const id = request.params.id; // Este ID da rota agora é o usuario_id

//     const querySelect = `SELECT
//                 o.usuario_id, o.nome_ong, o.cnpj, o.descricao,
//                 e.id_endereco, e.cep, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.complemento,
//                 u.telefone, u.celular, u.email, u.senha,
//                 re.nome_responsavel, re.cpf_responsavel, re.email_responsavel
//             FROM usuarios u `;

//     const queryInnerJoin = `INNER JOIN ongs o ON o.usuario_id = u.id
//             INNER JOIN responsaveis re ON re.id_ong_fk = o.usuario_id
//             INNER JOIN enderecos e ON e.id_endereco = u.endereco_id
//             INNER JOIN ruas r ON r.id_rua = e.id_rua_fk
//             INNER JOIN bairros b ON b.id_bairro = r.id_bairro_fk
//             INNER JOIN cidades c ON c.id_cidade = b.id_cidade_fk
//             INNER JOIN uf ON uf.id_uf = c.id_uf_fk `;

//     const queryWhere = "WHERE o.usuario_id=? ";

//     const queryText = querySelect + queryInnerJoin + queryWhere;

//     const [data] = await banco.query(queryText, [id]);

//     response.status(200).send(data);
//   } catch (error) {
//     console.error("Erro ao buscar ONG por ID (usuário):", error.message);
//     response
//       .status(500)
//       .send({ message: "Falha ao buscar a ONG. Tente novamente mais tarde." });
//   }
// };

// const Update = async (req, res) => {
//   const conn = await banco.getConnection();
//   await conn.beginTransaction();
//   console.log("Iniciando atualização...");

//   const idUsuario = req.params.id;
//   const dados = req.body;

//   try {
//     // Verifica se o usuário existe
//     const [verifica] = await conn.query(
//       `SELECT u.endereco_id FROM usuarios u WHERE u.id = ?`,
//       [idUsuario]
//     );
//     if (verifica.length === 0) {
//       conn.release();
//       return res.status(404).json({ message: "Usuário não encontrado." });
//     }

//     const endereco_id = verifica[0].endereco_id;

//     // 1. Buscar id_uf
//     const [ufs] = await conn.query(`SELECT id_uf FROM uf WHERE sigla = ?`, [
//       dados.uf,
//     ]);
//     if (ufs.length === 0) {
//       conn.release();
//       return res.status(400).json({ message: "UF inválida." });
//     }
//     const id_uf = ufs[0].id_uf;

//     // 2. Buscar ou inserir cidade
//     let id_cidade;
//     const [cidades] = await conn.query(
//       `SELECT id_cidade FROM cidades WHERE cidade = ? AND id_uf_fk = ?`,
//       [dados.cidade, id_uf]
//     );
//     if (cidades.length > 0) {
//       id_cidade = cidades[0].id_cidade;
//     } else {
//       const result = await conn.query(
//         `INSERT INTO cidades (cidade, id_uf_fk) VALUES (?, ?)`,
//         [dados.cidade, id_uf]
//       );
//       id_cidade = result[0].insertId;
//     }

//     // 3. Buscar ou inserir bairro
//     let id_bairro;
//     const [bairros] = await conn.query(
//       `SELECT id_bairro FROM bairros WHERE bairro = ? AND id_cidade_fk = ?`,
//       [dados.bairro, id_cidade]
//     );
//     if (bairros.length > 0) {
//       id_bairro = bairros[0].id_bairro;
//     } else {
//       const result = await conn.query(
//         `INSERT INTO bairros (bairro, id_cidade_fk) VALUES (?, ?)`,
//         [dados.bairro, id_cidade]
//       );
//       id_bairro = result[0].insertId;
//     }

//     // 4. Buscar ou inserir rua
//     let id_rua;
//     const [ruas] = await conn.query(
//       `SELECT id_rua FROM ruas WHERE rua = ? AND id_bairro_fk = ?`,
//       [dados.rua, id_bairro]
//     );
//     if (ruas.length > 0) {
//       id_rua = ruas[0].id_rua;
//     } else {
//       const result = await conn.query(
//         `INSERT INTO ruas (rua, id_bairro_fk) VALUES (?, ?)`,
//         [dados.rua, id_bairro]
//       );
//       id_rua = result[0].insertId;
//     }

//     // 5. Atualizar endereço
//     await conn.query(
//       `UPDATE enderecos
//        SET cep = ?, numero = ?, complemento = ?,
//            id_rua_fk = ?, id_bairro_fk = ?, id_cidade_fk = ?, id_uf_fk = ?
//        WHERE id_endereco = ?`,
//       [
//         dados.cep,
//         dados.numero,
//         dados.complemento,
//         id_rua,
//         id_bairro,
//         id_cidade,
//         id_uf,
//         endereco_id,
//       ]
//     );

//     // 6. Atualizar usuário
//     let novaSenha = dados.senha;
//     if (dados.senha) {
//       novaSenha = await bcrypt.hash(dados.senha, 10);
//     }

//     await conn.query(
//       `UPDATE usuarios
//        SET telefone = ?, celular = ?, email = ?, senha = ?
//        WHERE id = ?`,
//       [dados.telefone, dados.celular, dados.email, novaSenha, idUsuario]
//     );

//     // 7. Atualizar ONG
//     await conn.query(
//       `UPDATE ongs
//        SET nome_ong = ?, cnpj = ?, descricao = ?
//        WHERE usuario_id = ?`,
//       [dados.nome_ong, dados.cnpj, dados.descricao || null, idUsuario]
//     );

//     // 8. Atualizar responsável
//     await conn.query(
//       `UPDATE responsaveis
//        SET nome_responsavel = ?, cpf_responsavel = ?, email_responsavel = ?
//        WHERE id_ong_fk = ?`,
//       [
//         dados.nome_responsavel,
//         dados.cpf_responsavel,
//         dados.email_responsavel,
//         idUsuario,
//       ]
//     );

//     await conn.commit();
//     conn.release();

//     res.status(200).json({ message: "Dados atualizados com sucesso!" });
//   } catch (error) {
//     await conn.rollback();
//     conn.release();
//     console.error("Erro ao atualizar ONG:", error);
//     res
//       .status(500)
//       .json({ message: "Erro interno no servidor.", error: error.message });
//   }
// };

// const createOng = async (dados, res) => {
//   const conn = await banco.getConnection();
//   await conn.beginTransaction();
//   console.log("Transação iniciada...");

//   if (!dados.senha) {
//     return res.status(400).json({ message: "Senha não enviada." });
//   }

//   const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

//   try {
//     // 1. Buscar ID da UF
//     const [ufs] = await conn.query("SELECT id_uf FROM uf WHERE sigla = ?", [
//       dados.uf,
//     ]);
//     if (ufs.length === 0) {
//       console.error("UF não encontrada.");
//       return res.status(400).json({ message: "UF não encontrada." });
//     }
//     const id_uf = ufs[0].id_uf;
//     console.log(`UF encontrada: ${id_uf}`);

//     // 2. Buscar ou inserir cidade
//     let id_cidade;
//     const [cidades] = await conn.query(
//       "SELECT id_cidade FROM cidades WHERE cidade = ? AND id_uf_fk = ?",
//       [dados.cidade, id_uf]
//     );
//     if (cidades.length > 0) {
//       id_cidade = cidades[0].id_cidade;
//       console.log(`Cidade encontrada: ${id_cidade}`);
//     } else {
//       const cidadeResult = await conn.query(
//         "INSERT INTO cidades (cidade, id_uf_fk) VALUES (?, ?)",
//         [dados.cidade, id_uf]
//       );
//       id_cidade = cidadeResult[0].insertId;
//       console.log(`Cidade criada, ID: ${id_cidade}`);
//     }

//     // 3. Buscar ou inserir bairro
//     let id_bairro;
//     const [bairros] = await conn.query(
//       "SELECT id_bairro FROM bairros WHERE bairro = ? AND id_cidade_fk = ?",
//       [dados.bairro, id_cidade]
//     );
//     if (bairros.length > 0) {
//       id_bairro = bairros[0].id_bairro;
//       console.log(`Bairro encontrado: ${id_bairro}`);
//     } else {
//       const bairroResult = await conn.query(
//         "INSERT INTO bairros (bairro, id_cidade_fk) VALUES (?, ?)",
//         [dados.bairro, id_cidade]
//       );
//       id_bairro = bairroResult[0].insertId;
//       console.log(`Bairro criado, ID: ${id_bairro}`);
//     }

//     // 4. Buscar ou inserir rua
//     let id_rua;
//     const [ruas] = await conn.query(
//       "SELECT id_rua FROM ruas WHERE rua = ? AND id_bairro_fk = ?",
//       [dados.rua, id_bairro]
//     );
//     if (ruas.length > 0) {
//       id_rua = ruas[0].id_rua;
//       console.log(`Rua encontrada: ${id_rua}`);
//     } else {
//       const ruaResult = await conn.query(
//         "INSERT INTO ruas (rua, id_bairro_fk) VALUES (?, ?)",
//         [dados.rua, id_bairro]
//       );
//       id_rua = ruaResult[0].insertId;
//       console.log(`Rua criada, ID: ${id_rua}`);
//     }

//     // 5. Inserir endereço
//     const enderecoResult = await conn.query(
//       `INSERT INTO enderecos (id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [
//         id_uf,
//         id_cidade,
//         id_bairro,
//         id_rua,
//         dados.numero,
//         dados.cep,
//         dados.complemento,
//       ]
//     );
//     const id_endereco = enderecoResult[0].insertId;
//     console.log(`Endereço inserido, ID: ${id_endereco}`);

//     // 6. Inserir usuário
//     const usuarioResult = await conn.query(
//       `INSERT INTO usuarios (telefone, celular, email, senha, endereco_id)
//        VALUES (?, ?, ?, ?, ?)`,
//       [
//         dados.telefone,
//         dados.celular,
//         dados.email,
//         senhaCriptografada,
//         id_endereco,
//       ]
//     );
//     const usuario_id = usuarioResult[0].insertId;
//     console.log(`Usuário inserido, ID: ${usuario_id}`);

//     // 7. Inserir ONG
//     await conn.query(
//       `INSERT INTO ongs (usuario_id, nome_ong, cnpj, descricao)
//        VALUES (?, ?, ?, ?)`,
//       [usuario_id, dados.nome_ong, dados.cnpj, dados.descricao || null]
//     );
//     console.log("ONG inserida.");

//     // 8. Inserir responsável
//     await conn.query(
//       `INSERT INTO responsaveis (id_ong_fk, nome_responsavel, cpf_responsavel, email_responsavel)
//        VALUES (?, ?, ?, ?)`,
//       [
//         usuario_id,
//         dados.nome_responsavel,
//         dados.cpf_responsavel,
//         dados.email_responsavel,
//       ]
//     );
//     console.log("Responsável inserido.");

//     await conn.commit();
//     conn.release();
//     console.log("Transação concluída.");

//     return res.status(201).json({ message: "Cadastro realizado com sucesso!" });
//   } catch (error) {
//     await conn.rollback();
//     conn.release();
//     console.error("Erro:", error);
//     return res.status(500).json({
//       message: "Erro interno no servidor ao cadastrar.",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   GetAll,
//   GetById,
//   Erase,
//   createOng,
//   Update,
// };

// Arquivo atualizado com suporte a campos de foto de perfil e banner
const express = require("express");
const { banco } = require("./database");
const bcrypt = require("bcrypt");

const GetAll = async (request, response) => {
  try {
    const queryText = `SELECT 
      o.usuario_id, o.nome_ong, o.cnpj, o.descricao, o.banner,
      e.id_endereco, e.cep, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.complemento,
      u.telefone, u.celular, u.email, u.senha, u.foto,
      re.nome_responsavel, re.cpf_responsavel, re.email_responsavel
      FROM usuarios u 
      INNER JOIN ongs o ON o.usuario_id = u.id
      INNER JOIN responsaveis re ON re.id_ong_fk = o.usuario_id  
      INNER JOIN enderecos e ON e.id_endereco = u.endereco_id
      INNER JOIN ruas r ON r.id_rua = e.id_rua_fk
      INNER JOIN bairros b ON b.id_bairro = r.id_bairro_fk
      INNER JOIN cidades c ON c.id_cidade = b.id_cidade_fk
      INNER JOIN uf ON uf.id_uf = c.id_uf_fk
      ORDER BY o.usuario_id`;

    const [data] = await banco.query(queryText);
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
    const id = request.params.id;
    const queryText = `SELECT 
      o.usuario_id, o.nome_ong, o.cnpj, o.descricao, o.banner,
      e.id_endereco, e.cep, r.rua, e.numero, b.bairro, c.cidade, uf.sigla, e.complemento,
      u.telefone, u.celular, u.email, u.senha, u.foto,
      re.nome_responsavel, re.cpf_responsavel, re.email_responsavel
      FROM usuarios u 
      INNER JOIN ongs o ON o.usuario_id = u.id
      INNER JOIN responsaveis re ON re.id_ong_fk = o.usuario_id  
      INNER JOIN enderecos e ON e.id_endereco = u.endereco_id
      INNER JOIN ruas r ON r.id_rua = e.id_rua_fk
      INNER JOIN bairros b ON b.id_bairro = r.id_bairro_fk
      INNER JOIN cidades c ON c.id_cidade = b.id_cidade_fk
      INNER JOIN uf ON uf.id_uf = c.id_uf_fk
      WHERE o.usuario_id = ?`;

    const [data] = await banco.query(queryText, [id]);
    response.status(200).send(data);
  } catch (error) {
    console.error("Erro ao buscar ONG por ID (usuário):", error.message);
    response
      .status(500)
      .send({ message: "Falha ao buscar a ONG. Tente novamente mais tarde." });
  }
};

const Update = async (req, res) => {
  const conn = await banco.getConnection();
  await conn.beginTransaction();

  const idUsuario = req.params.id;
  const dados = req.body;

  try {
    const [verifica] = await conn.query(
      `SELECT u.endereco_id FROM usuarios u WHERE u.id = ?`,
      [idUsuario]
    );
    if (verifica.length === 0) {
      conn.release();
      return res.status(404).json({ message: "Usuário não encontrado." });
    }
    const endereco_id = verifica[0].endereco_id;

    const [ufs] = await conn.query(`SELECT id_uf FROM uf WHERE sigla = ?`, [
      dados.uf,
    ]);
    if (ufs.length === 0) {
      conn.release();
      return res.status(400).json({ message: "UF inválida." });
    }
    const id_uf = ufs[0].id_uf;

    let id_cidade;
    const [cidades] = await conn.query(
      `SELECT id_cidade FROM cidades WHERE cidade = ? AND id_uf_fk = ?`,
      [dados.cidade, id_uf]
    );
    if (cidades.length > 0) id_cidade = cidades[0].id_cidade;
    else
      id_cidade = (
        await conn.query(
          `INSERT INTO cidades (cidade, id_uf_fk) VALUES (?, ?)`,
          [dados.cidade, id_uf]
        )
      )[0].insertId;

    let id_bairro;
    const [bairros] = await conn.query(
      `SELECT id_bairro FROM bairros WHERE bairro = ? AND id_cidade_fk = ?`,
      [dados.bairro, id_cidade]
    );
    if (bairros.length > 0) id_bairro = bairros[0].id_bairro;
    else
      id_bairro = (
        await conn.query(
          `INSERT INTO bairros (bairro, id_cidade_fk) VALUES (?, ?)`,
          [dados.bairro, id_cidade]
        )
      )[0].insertId;

    let id_rua;
    const [ruas] = await conn.query(
      `SELECT id_rua FROM ruas WHERE rua = ? AND id_bairro_fk = ?`,
      [dados.rua, id_bairro]
    );
    if (ruas.length > 0) id_rua = ruas[0].id_rua;
    else
      id_rua = (
        await conn.query(`INSERT INTO ruas (rua, id_bairro_fk) VALUES (?, ?)`, [
          dados.rua,
          id_bairro,
        ])
      )[0].insertId;

    await conn.query(
      `UPDATE enderecos SET cep = ?, numero = ?, complemento = ?, id_rua_fk = ?, id_bairro_fk = ?, id_cidade_fk = ?, id_uf_fk = ? WHERE id_endereco = ?`,
      [
        dados.cep,
        dados.numero,
        dados.complemento,
        id_rua,
        id_bairro,
        id_cidade,
        id_uf,
        endereco_id,
      ]
    );

    let novaSenha = dados.senha;
    if (dados.senha) novaSenha = await bcrypt.hash(dados.senha, 10);

    await conn.query(
      `UPDATE usuarios SET telefone = ?, celular = ?, email = ?, senha = ?, foto = ? WHERE id = ?`,
      [
        dados.telefone,
        dados.celular,
        dados.email,
        novaSenha,
        dados.foto || null,
        idUsuario,
      ]
    );

    await conn.query(
      `UPDATE ongs SET nome_ong = ?, cnpj = ?, descricao = ?, banner = ? WHERE usuario_id = ?`,
      [
        dados.nome_ong,
        dados.cnpj,
        dados.descricao || null,
        dados.banner || null,
        idUsuario,
      ]
    );

    await conn.query(
      `UPDATE responsaveis SET nome_responsavel = ?, cpf_responsavel = ?, email_responsavel = ? WHERE id_ong_fk = ?`,
      [
        dados.nome_responsavel,
        dados.cpf_responsavel,
        dados.email_responsavel,
        idUsuario,
      ]
    );

    await conn.commit();
    conn.release();
    res.status(200).json({ message: "Dados atualizados com sucesso!" });
  } catch (error) {
    await conn.rollback();
    conn.release();
    res
      .status(500)
      .json({ message: "Erro interno no servidor.", error: error.message });
  }
};

const UpdateFotoPerfil = async (req, res) => {
  try {
    const id = req.params.id;
    const { foto, banner } = req.body; // Pode receber um ou os dois

    if (!foto && !banner) {
      return res
        .status(400)
        .json({ message: "Nenhum caminho de imagem fornecido." });
    }

    const queries = [];

    if (foto) {
      queries.push(
        banco.query("UPDATE usuarios SET foto = ? WHERE id = ?", [foto, id])
      );
    }

    if (banner) {
      queries.push(
        banco.query("UPDATE ongs SET banner = ? WHERE usuario_id = ?", [
          banner,
          id,
        ])
      );
    }

    await Promise.all(queries);

    res.status(200).json({ message: "Imagem(ns) atualizada(s) com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error);
    res
      .status(500)
      .json({ message: "Erro ao atualizar a imagem.", error: error.message });
  }
};

const Erase = async (request, response) => {
  const connection = await banco.getConnection();
  try {
    const idUsuario = request.params.id;

    await connection.beginTransaction();

    // Corrigindo a sintaxe na consulta SQL
    const [result] = await connection.query(
      `SELECT u.endereco_id, o.usuario_id, r.id_responsavel
      FROM usuarios u
      INNER JOIN ongs o ON o.usuario_id = u.id
      INNER JOIN responsaveis r ON r.id_ong_fk = o.usuario_id
      WHERE u.id = ?`,
      [idUsuario] // Corrigido o array de parâmetros para o segundo argumento da consulta
    );

    if (result.length === 0) {
      connection.release();
      return response.status(404).send({ message: "Usuário não encontrado." });
    }

    const { endereco_id, id_responsavel } = result[0];

    // Deletar dados em ordem correta
    if (id_responsavel) {
      await connection.query(
        "DELETE FROM responsaveis WHERE id_responsavel = ?",
        [
          id_responsavel, // Corrigido para o nome correto da coluna 'id'
        ]
      );
    }

    await connection.query("DELETE FROM ongs WHERE usuario_id = ?", [
      idUsuario,
    ]);

    // Agora sim excluir o usuário
    await connection.query("DELETE FROM usuarios WHERE id = ?", [idUsuario]);

    if (endereco_id) {
      await connection.query("DELETE FROM enderecos WHERE id_endereco = ?", [
        endereco_id,
      ]);
    }

    await connection.commit();
    connection.release();

    response.status(200).send({
      message: "Conta e dados relacionados deletados com sucesso!",
    });
  } catch (error) {
    await connection.rollback();
    connection.release();
    console.error("Erro ao deletar conta:", error.message);
    response.status(500).send({ message: "Erro ao deletar a conta." });
  }
};

const createOng = async (dados, res) => {
  const conn = await banco.getConnection();
  await conn.beginTransaction();
  if (!dados.senha)
    return res.status(400).json({ message: "Senha não enviada." });

  const senhaCriptografada = await bcrypt.hash(dados.senha, 10);
  try {
    const [ufs] = await conn.query("SELECT id_uf FROM uf WHERE sigla = ?", [
      dados.uf,
    ]);
    if (ufs.length === 0)
      return res.status(400).json({ message: "UF não encontrada." });
    const id_uf = ufs[0].id_uf;

    let id_cidade;
    const [cidades] = await conn.query(
      "SELECT id_cidade FROM cidades WHERE cidade = ? AND id_uf_fk = ?",
      [dados.cidade, id_uf]
    );
    if (cidades.length > 0) id_cidade = cidades[0].id_cidade;
    else
      id_cidade = (
        await conn.query(
          "INSERT INTO cidades (cidade, id_uf_fk) VALUES (?, ?)",
          [dados.cidade, id_uf]
        )
      )[0].insertId;

    let id_bairro;
    const [bairros] = await conn.query(
      "SELECT id_bairro FROM bairros WHERE bairro = ? AND id_cidade_fk = ?",
      [dados.bairro, id_cidade]
    );
    if (bairros.length > 0) id_bairro = bairros[0].id_bairro;
    else
      id_bairro = (
        await conn.query(
          "INSERT INTO bairros (bairro, id_cidade_fk) VALUES (?, ?)",
          [dados.bairro, id_cidade]
        )
      )[0].insertId;

    let id_rua;
    const [ruas] = await conn.query(
      "SELECT id_rua FROM ruas WHERE rua = ? AND id_bairro_fk = ?",
      [dados.rua, id_bairro]
    );
    if (ruas.length > 0) id_rua = ruas[0].id_rua;
    else
      id_rua = (
        await conn.query("INSERT INTO ruas (rua, id_bairro_fk) VALUES (?, ?)", [
          dados.rua,
          id_bairro,
        ])
      )[0].insertId;

    const id_endereco = (
      await conn.query(
        "INSERT INTO enderecos (id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          id_uf,
          id_cidade,
          id_bairro,
          id_rua,
          dados.numero,
          dados.cep,
          dados.complemento,
        ]
      )
    )[0].insertId;

    const usuario_id = (
      await conn.query(
        "INSERT INTO usuarios (telefone, celular, email, senha, endereco_id, foto) VALUES (?, ?, ?, ?, ?, ?)",
        [
          dados.telefone,
          dados.celular,
          dados.email,
          senhaCriptografada,
          id_endereco,
          dados.foto || null,
        ]
      )
    )[0].insertId;

    const [ongResult] = await conn.query(
      "INSERT INTO ongs (usuario_id, nome_ong, cnpj, descricao, banner) VALUES (?, ?, ?, ?, ?)",
      [
        usuario_id,
        dados.nome_ong,
        dados.cnpj,
        dados.descricao || null,
        dados.banner || null,
      ]
    );

    const novoId = usuario_id;

    await conn.query(
      "INSERT INTO responsaveis (id_ong_fk, nome_responsavel, cpf_responsavel, email_responsavel) VALUES (?, ?, ?, ?)",
      [
        usuario_id,
        dados.nome_responsavel,
        dados.cpf_responsavel,
        dados.email_responsavel,
      ]
    );
    await conn.commit();
    conn.release();
    return res.status(201).json({
      message: "Cadastro realizado com sucesso!",
      id: usuario_id,
    });
  } catch (error) {
    await conn.rollback();
    conn.release();
    return res.status(500).json({
      message: "Erro interno no servidor ao cadastrar.",
      error: error.message,
    });
  }
};

module.exports = {
  GetAll,
  GetById,
  Erase,
  createOng,
  Update,
  UpdateFotoPerfil,
};
