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
          u.data_criacao, u.data_att, u.foto, s.sexo, tu.descricao AS tipo,
          r.rua, e.numero, e.cep,
          b.bairro, c.cidade, es.sigla
        FROM usuarios u
        INNER JOIN sexo s ON s.idsexo = u.fk_idsexo
        INNER JOIN enderecos e ON e.idendereco = u.fk_idendereco
        INNER JOIN ruas r ON r.idrua = e.fk_idrua
        INNER JOIN bairros b ON b.idbairro = e.fk_idbairro
        INNER JOIN cidades c ON c.idcidade = e.fk_idcidade
        INNER JOIN estados es ON es.idestado = e.fk_idestado
        INNER JOIN tipos_usuario tu ON tu.idtipo = u.fk_idtipo
        WHERE u.email = ?;
      `, [email]);


      const sexo = await banco.query(`
        SELECT s.idsexo, s.sexo, u.nome 
        FROM sexo s 
        INNER JOIN usuarios u 
        ON u.fk_idsexo = s.idsexo
        WHERE u.email = ?`);

      const estado = await banco.query(`
        SELECT e.idestado, e.sigla, u.nome 
        FROM estados e
        INNER JOIN usuarios u
        ON u.fk_idsexo = e.idestado
        `)

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
        sexo: usuario.sexo,
        data_nasc: usuario.data_nasc,
        cpf: usuario.cpf,
        foto: usuario.foto,
        tipo: usuario.tipo,
        endereco: {
          rua: usuario.rua,
          numero: usuario.numero,
          bairro: usuario.bairro,
          cidade: usuario.cidade,
          estado: usuario.estado,
          cep: usuario.cep
        },
        data_criacao: usuario.data_criacao,
        data_att: usuario.data_att
      };

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
        usuario: usuarioFormatado
      });

    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = loginController;
