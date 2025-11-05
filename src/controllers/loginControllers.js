const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { banco } = require("../models/database");

dotenv.config();

const loginController = {
  Login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      }

      // JOIN ajustado conforme a estrutura do banco
      const [rows] = await banco.query(`
SELECT 
  u.idusuario, u.nome, u.email, u.telefone, u.data_nasc, u.cpf, u.senha, 
  u.data_criacao, u.data_att, u.foto,
  s.idsexo, s.sexo,
  tu.descricao AS tipo,
  r.rua, e.numero, e.cep,
  b.bairro, c.cidade,
  es.idestado,
  es.sigla AS estado_sigla
FROM usuarios u
INNER JOIN sexo s ON s.idsexo = u.fk_idsexo
INNER JOIN enderecos e ON e.idendereco = u.fk_idendereco
INNER JOIN ruas r ON r.idrua = e.fk_idrua
INNER JOIN bairros b ON b.idbairro = e.fk_idbairro
INNER JOIN cidades c ON c.idcidade = e.fk_idcidade
LEFT JOIN estados es ON es.idestado = c.fk_idestado
INNER JOIN tipos_usuario tu ON tu.idtipo = u.fk_idtipo
WHERE u.email = ?;
`, [email]);


      if (rows.length === 0) {
        return res.status(401).json({ message: "Usuário não encontrado." });
      }

      const usuario = rows[0];
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      const token = jwt.sign(
        { id: usuario.idusuario, email: usuario.email, tipo: usuario.tipo },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      );

      const usuarioFormatado = {
        id: usuario.idusuario,
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        sexo: {
          id: usuario.idsexo,
          descricao: usuario.sexo
        },
        estado: {                       // <-- fora do endereço
          id: usuario.idestado,
          sigla: usuario.estado_sigla
        },
        endereco: {
          rua: usuario.rua,
          numero: usuario.numero,
          bairro: usuario.bairro,
          cidade: usuario.cidade,
          cep: usuario.cep
        },
        tipo: usuario.tipo,
        data_criacao: usuario.data_criacao,
        data_att: usuario.data_att
      };

      return res.status(200).json({

        message: "Login realizado com sucesso!",
        token,
        usuario: usuarioFormatado
      });

    } catch (error) {
      return res.status(500).json({ message: "Erro interno no servidor." });
    }

  },

    // --- ALTERAR USUÁRIO ---
  AlterarUsuario: async (req, res) => {
    try {
      const usuarioId = req.usuarioId; // vem do middleware JWT
      const {
        nome,
        fk_idsexo,
        cep,
        estado,
        cidade,
        rua,
        bairro,
        numero,
        complemento
      } = req.body;

      if (!nome || !fk_idsexo || !cep || !estado || !cidade || !rua || !bairro || !numero) {
        return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
      }

      // Buscar o endereço do usuário
      const [usuarioRows] = await banco.query(
        `SELECT fk_idendereco FROM usuarios WHERE idusuario = ?`,
        [usuarioId]
      );

      if (usuarioRows.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }

      const enderecoId = usuarioRows[0].fk_idendereco;

      // Atualizar endereço
      await banco.query(
        `UPDATE enderecos SET 
          cep = ?, 
          rua = ?, 
          numero = ?, 
          bairro = ?, 
          cidade = ?, 
          complemento = ? 
        WHERE idendereco = ?`,
        [cep, rua, numero, bairro, cidade, complemento || null, enderecoId]
      );

      // Atualizar dados do usuário
      await banco.query(
        `UPDATE usuarios SET 
          nome = ?, 
          fk_idsexo = ? 
        WHERE idusuario = ?`,
        [nome, fk_idsexo, usuarioId]
      );

      // Retornar os dados atualizados
      const [rows] = await banco.query(`
        SELECT 
          u.idusuario, u.nome, u.email, u.telefone, u.data_nasc, u.cpf, u.data_criacao, u.data_att, u.foto,
          s.idsexo, s.sexo,
          tu.descricao AS tipo,
          r.rua, e.numero, e.cep,
          b.bairro, c.cidade,
          es.idestado,
          es.sigla AS estado_sigla
        FROM usuarios u
        INNER JOIN sexo s ON s.idsexo = u.fk_idsexo
        INNER JOIN enderecos e ON e.idendereco = u.fk_idendereco
        INNER JOIN ruas r ON r.idrua = e.fk_idrua
        INNER JOIN bairros b ON b.idbairro = e.fk_idbairro
        INNER JOIN cidades c ON c.idcidade = e.fk_idcidade
        LEFT JOIN estados es ON es.idestado = c.fk_idestado
        INNER JOIN tipos_usuario tu ON tu.idtipo = u.fk_idtipo
        WHERE u.idusuario = ?;
      `, [usuarioId]);

      const usuarioAtualizado = rows[0];

      const usuarioFormatado = {
        id: usuarioAtualizado.idusuario,
        nome: usuarioAtualizado.nome,
        email: usuarioAtualizado.email,
        telefone: usuarioAtualizado.telefone,
        sexo: {
          id: usuarioAtualizado.idsexo,
          descricao: usuarioAtualizado.sexo
        },
        estado: {
          id: usuarioAtualizado.idestado,
          sigla: usuarioAtualizado.estado_sigla
        },
        endereco: {
          rua: usuarioAtualizado.rua,
          numero: usuarioAtualizado.numero,
          bairro: usuarioAtualizado.bairro,
          cidade: usuarioAtualizado.cidade,
          cep: usuarioAtualizado.cep
        },
        tipo: usuarioAtualizado.tipo,
        data_criacao: usuarioAtualizado.data_criacao,
        data_att: usuarioAtualizado.data_att
      };

      return res.status(200).json({
        message: "Usuário atualizado com sucesso!",
        usuario: usuarioFormatado
      });

    } catch (error) {
      console.error("Erro ao atualizar usuário:", error.message);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
};

module.exports = loginController;