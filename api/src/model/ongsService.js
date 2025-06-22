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

const Update = async (req, res) => {
  const conn = await banco.getConnection();
  await conn.beginTransaction();
  console.log("Iniciando atualização...");

  const idUsuario = req.params.id;
  const dados = req.body;

  try {
    // Verifica se o usuário existe
    const [verifica] = await conn.query(
      `SELECT u.endereco_id FROM usuarios u WHERE u.id = ?`,
      [idUsuario]
    );
    if (verifica.length === 0) {
      conn.release();
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    const endereco_id = verifica[0].endereco_id;

    // 1. Buscar id_uf
    const [ufs] = await conn.query(`SELECT id_uf FROM uf WHERE sigla = ?`, [
      dados.uf,
    ]);
    if (ufs.length === 0) {
      conn.release();
      return res.status(400).json({ message: "UF inválida." });
    }
    const id_uf = ufs[0].id_uf;

    // 2. Buscar ou inserir cidade
    let id_cidade;
    const [cidades] = await conn.query(
      `SELECT id_cidade FROM cidades WHERE cidade = ? AND id_uf_fk = ?`,
      [dados.cidade, id_uf]
    );
    if (cidades.length > 0) {
      id_cidade = cidades[0].id_cidade;
    } else {
      const result = await conn.query(
        `INSERT INTO cidades (cidade, id_uf_fk) VALUES (?, ?)`,
        [dados.cidade, id_uf]
      );
      id_cidade = result[0].insertId;
    }

    // 3. Buscar ou inserir bairro
    let id_bairro;
    const [bairros] = await conn.query(
      `SELECT id_bairro FROM bairros WHERE bairro = ? AND id_cidade_fk = ?`,
      [dados.bairro, id_cidade]
    );
    if (bairros.length > 0) {
      id_bairro = bairros[0].id_bairro;
    } else {
      const result = await conn.query(
        `INSERT INTO bairros (bairro, id_cidade_fk) VALUES (?, ?)`,
        [dados.bairro, id_cidade]
      );
      id_bairro = result[0].insertId;
    }

    // 4. Buscar ou inserir rua
    let id_rua;
    const [ruas] = await conn.query(
      `SELECT id_rua FROM ruas WHERE rua = ? AND id_bairro_fk = ?`,
      [dados.rua, id_bairro]
    );
    if (ruas.length > 0) {
      id_rua = ruas[0].id_rua;
    } else {
      const result = await conn.query(
        `INSERT INTO ruas (rua, id_bairro_fk) VALUES (?, ?)`,
        [dados.rua, id_bairro]
      );
      id_rua = result[0].insertId;
    }

    // 5. Atualizar endereço
    await conn.query(
      `UPDATE enderecos 
       SET cep = ?, numero = ?, complemento = ?, 
           id_rua_fk = ?, id_bairro_fk = ?, id_cidade_fk = ?, id_uf_fk = ?
       WHERE id_endereco = ?`,
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

    // 6. Atualizar usuário
    let novaSenha = dados.senha;
    if (dados.senha) {
      novaSenha = await bcrypt.hash(dados.senha, 10);
    }

    await conn.query(
      `UPDATE usuarios 
       SET telefone = ?, celular = ?, email = ?, senha = ?
       WHERE id = ?`,
      [dados.telefone, dados.celular, dados.email, novaSenha, idUsuario]
    );

    // 7. Atualizar ONG
    await conn.query(
      `UPDATE ongs 
       SET nome_ong = ?, cnpj = ?, descricao = ?
       WHERE usuario_id = ?`,
      [dados.nome_ong, dados.cnpj, dados.descricao || null, idUsuario]
    );

    // 8. Atualizar responsável
    await conn.query(
      `UPDATE responsaveis 
       SET nome_responsavel = ?, cpf_responsavel = ?, email_responsavel = ?
       WHERE id_ong_fk = ?`,
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
    console.error("Erro ao atualizar ONG:", error);
    res
      .status(500)
      .json({ message: "Erro interno no servidor.", error: error.message });
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
      [idUsuario]  // Corrigido o array de parâmetros para o segundo argumento da consulta
    );

    if (result.length === 0) {
      connection.release();
      return response.status(404).send({ message: "Usuário não encontrado." });
    }

    const { endereco_id, id_responsavel } = result[0];

    // Deletar dados em ordem correta
    if (id_responsavel) {
      await connection.query("DELETE FROM responsaveis WHERE id_responsavel = ?", [
        id_responsavel,  // Corrigido para o nome correto da coluna 'id'
      ]);
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
  console.log("Transação iniciada...");

  if (!dados.senha) {
    return res.status(400).json({ message: "Senha não enviada." });
  }

  const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

  try {
    // 1. Buscar ID da UF
    const [ufs] = await conn.query("SELECT id_uf FROM uf WHERE sigla = ?", [
      dados.uf,
    ]);
    if (ufs.length === 0) {
      console.error("UF não encontrada.");
      return res.status(400).json({ message: "UF não encontrada." });
    }
    const id_uf = ufs[0].id_uf;
    console.log(`UF encontrada: ${id_uf}`);

    // 2. Buscar ou inserir cidade
    let id_cidade;
    const [cidades] = await conn.query(
      "SELECT id_cidade FROM cidades WHERE cidade = ? AND id_uf_fk = ?",
      [dados.cidade, id_uf]
    );
    if (cidades.length > 0) {
      id_cidade = cidades[0].id_cidade;
      console.log(`Cidade encontrada: ${id_cidade}`);
    } else {
      const cidadeResult = await conn.query(
        "INSERT INTO cidades (cidade, id_uf_fk) VALUES (?, ?)",
        [dados.cidade, id_uf]
      );
      id_cidade = cidadeResult[0].insertId;
      console.log(`Cidade criada, ID: ${id_cidade}`);
    }

    // 3. Buscar ou inserir bairro
    let id_bairro;
    const [bairros] = await conn.query(
      "SELECT id_bairro FROM bairros WHERE bairro = ? AND id_cidade_fk = ?",
      [dados.bairro, id_cidade]
    );
    if (bairros.length > 0) {
      id_bairro = bairros[0].id_bairro;
      console.log(`Bairro encontrado: ${id_bairro}`);
    } else {
      const bairroResult = await conn.query(
        "INSERT INTO bairros (bairro, id_cidade_fk) VALUES (?, ?)",
        [dados.bairro, id_cidade]
      );
      id_bairro = bairroResult[0].insertId;
      console.log(`Bairro criado, ID: ${id_bairro}`);
    }

    // 4. Buscar ou inserir rua
    let id_rua;
    const [ruas] = await conn.query(
      "SELECT id_rua FROM ruas WHERE rua = ? AND id_bairro_fk = ?",
      [dados.rua, id_bairro]
    );
    if (ruas.length > 0) {
      id_rua = ruas[0].id_rua;
      console.log(`Rua encontrada: ${id_rua}`);
    } else {
      const ruaResult = await conn.query(
        "INSERT INTO ruas (rua, id_bairro_fk) VALUES (?, ?)",
        [dados.rua, id_bairro]
      );
      id_rua = ruaResult[0].insertId;
      console.log(`Rua criada, ID: ${id_rua}`);
    }

    // 5. Inserir endereço
    const enderecoResult = await conn.query(
      `INSERT INTO enderecos (id_uf_fk, id_cidade_fk, id_bairro_fk, id_rua_fk, numero, cep, complemento)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id_uf,
        id_cidade,
        id_bairro,
        id_rua,
        dados.numero,
        dados.cep,
        dados.complemento,
      ]
    );
    const id_endereco = enderecoResult[0].insertId;
    console.log(`Endereço inserido, ID: ${id_endereco}`);

    // 6. Inserir usuário
    const usuarioResult = await conn.query(
      `INSERT INTO usuarios (telefone, celular, email, senha, endereco_id)
       VALUES (?, ?, ?, ?, ?)`,
      [
        dados.telefone,
        dados.celular,
        dados.email,
        senhaCriptografada,
        id_endereco,
      ]
    );
    const usuario_id = usuarioResult[0].insertId;
    console.log(`Usuário inserido, ID: ${usuario_id}`);

    // 7. Inserir ONG
    await conn.query(
      `INSERT INTO ongs (usuario_id, nome_ong, cnpj, descricao)
       VALUES (?, ?, ?, ?)`,
      [usuario_id, dados.nome_ong, dados.cnpj, dados.descricao || null]
    );
    console.log("ONG inserida.");

    // 8. Inserir responsável
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
    console.log("Responsável inserido.");

    await conn.commit();
    conn.release();
    console.log("Transação concluída.");

    return res.status(201).json({ message: "Cadastro realizado com sucesso!" });
  } catch (error) {
    await conn.rollback();
    conn.release();
    console.error("Erro:", error);
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
};

// const Update = async (id, dados) => {

//   const connection = await banco.getConnection();
//   try {
//     await connection.beginTransaction();

//     // Atualiza dados da tabela `ongs`
//     if (dados.nome_ong || dados.cnpj || dados.descricao !== undefined) {
//       await connection.query(
//         "UPDATE ongs SET nome_ong = ?, cnpj = ?, descricao = ? WHERE usuario_id = ?",
//         [
//           dados.nome_ong || null,
//           dados.cnpj || null,
//           dados.descricao !== undefined ? dados.descricao : null,
//           id
//         ]
//       );
//     }

//     // Atualiza dados do responsável
//     if (
//       dados.nome_responsavel ||
//       dados.cpf_responsavel ||
//       dados.email_responsavel
//     ) {
//       await connection.query(
//         "UPDATE responsaveis SET nome_responsavel = ?, cpf_responsavel = ?, email_responsavel = ? WHERE id_ong_fk = ?",
//         [
//           dados.nome_responsavel || null,
//           dados.cpf_responsavel || null,
//           dados.email_responsavel || null,
//           id,
//         ]
//       );
//     }

//     // Atualiza dados de contato do usuário
//     let senhaAtualizada = null;
//     if (dados.senha && dados.senha.trim() !== "") {
//       senhaAtualizada = await bcrypt.hash(dados.senha, 10);
//     }

//     const queryUsuarios = [
//       "UPDATE usuarios SET telefone = ?, celular = ?, email = ?",
//       dados.telefone || null,
//       dados.celular || null,
//       dados.email || null,
//     ];

//     if (senhaAtualizada) {
//       queryUsuarios.push(", senha = ?");
//       queryUsuarios.push(senhaAtualizada);
//     }

//     queryUsuarios.push(" WHERE id = ?");
//     queryUsuarios.push(id);

//     await connection.query(queryUsuarios.join(" "), queryUsuarios.slice(1));

//     // Atualiza o endereço
//     if (dados.id_endereco && (dados.cep || dados.numero || dados.complemento !== undefined)) {
//       await connection.query(
//         "UPDATE enderecos SET cep = ?, numero = ?, complemento = ? WHERE id_endereco = ?",
//         [
//           dados.cep || null,
//           dados.numero || null,
//           dados.complemento || null,
//           dados.id_endereco,
//         ]
//       );
//     }

//     await connection.commit();
//     connection.release();
//     return { success: true, message: "Dados atualizados com sucesso!" };
//   } catch (error) {
//     await connection.rollback();
//     connection.release();
//     console.error("Erro ao atualizar ONG:", error.message);
//     throw new Error("Erro ao atualizar ONG.");
//   }
// };

// const Update = async (id, dados) => {
//   // Obtém uma conexão com o banco de dados
//   const connection = await banco.getConnection();
  
//   try {
//     // Inicia uma transação para que todas as atualizações aconteçam juntas
//     await connection.beginTransaction();

//     // Atualiza os dados da tabela "ongs", se houver informações
//     if (dados.nome_ong || dados.cnpj || dados.descricao !== undefined) {
//       const sqlOngs = `
//         UPDATE ongs 
//         SET nome_ong = ?, cnpj = ?, descricao = ? 
//         WHERE usuario_id = ?
//       `;
//       const paramsOngs = [
//         dados.nome_ong || null,
//         dados.cnpj || null,
//         dados.descricao !== undefined ? dados.descricao : null,
//         id
//       ];
//       await connection.query(sqlOngs, paramsOngs);
//     }

//     // Atualiza os dados do responsável, se houver informações
//     if (dados.nome_responsavel || dados.cpf_responsavel || dados.email_responsavel) {
//       const sqlResponsaveis = `
//         UPDATE responsaveis 
//         SET nome_responsavel = ?, cpf_responsavel = ?, email_responsavel = ?
//         WHERE id_ong_fk = ?
//       `;
//       const paramsResponsaveis = [
//         dados.nome_responsavel || null,
//         dados.cpf_responsavel || null,
//         dados.email_responsavel || null,
//         id
//       ];
//       await connection.query(sqlResponsaveis, paramsResponsaveis);
//     }

//     // Atualiza os dados de contato do usuário
//     let senhaAtualizada = null;
//     // Se o usuário enviou uma senha válida, gera o hash
//     if (dados.senha && dados.senha.trim() !== "") {
//       senhaAtualizada = await bcrypt.hash(dados.senha, 10);
//     }
    
//     // Prepara os valores para telefone, celular e email
//     const telefone = dados.telefone || null;
//     const celular = dados.celular || null;
//     const emailUsuario = dados.email || null;
    
//     if (senhaAtualizada) {
//       // Se a senha foi informada, atualiza também o campo "senha"
//       const sqlUsuarios = `
//         UPDATE usuarios 
//         SET telefone = ?, celular = ?, email = ?, senha = ? 
//         WHERE id = ?
//       `;
//       const paramsUsuarios = [telefone, celular, emailUsuario, senhaAtualizada, id];
//       await connection.query(sqlUsuarios, paramsUsuarios);
//     } else {
//       // Senão, atualiza somente os dados de contato
//       const sqlUsuarios = `
//         UPDATE usuarios 
//         SET telefone = ?, celular = ?, email = ? 
//         WHERE id = ?
//       `;
//       const paramsUsuarios = [telefone, celular, emailUsuario, id];
//       await connection.query(sqlUsuarios, paramsUsuarios);
//     }

//     // Atualiza o endereço, caso o id do endereço seja informado e exista algum dado para atualizar
//     if (dados.id_endereco && (dados.cep || dados.numero || dados.complemento !== undefined)) {
//       const sqlEnderecos = `
//         UPDATE enderecos 
//         SET cep = ?, numero = ?, complemento = ? 
//         WHERE id_endereco = ?
//       `;
//       const paramsEnderecos = [
//         dados.cep || null,
//         dados.numero || null,
//         dados.complemento || null,
//         dados.id_endereco
//       ];
//       await connection.query(sqlEnderecos, paramsEnderecos);
//     }

//     // Se todas as atualizações ocorrerem sem erro, confirma a transação
//     await connection.commit();
//     connection.release();
//     return { success: true, message: "Dados atualizados com sucesso!" };

//   } catch (error) {
//     // Em caso de erro, desfaz todas as alterações e libera a conexão
//     await connection.rollback();
//     connection.release();
//     console.error("Erro ao atualizar ONG:", error.message);
//     throw new Error("Erro ao atualizar ONG.");
//   }
// };

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
