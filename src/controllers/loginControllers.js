// Controller responsável por receber requisições HTTP e chamar o service de Login para executa-lo.

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { Login } = require("../models/loginServices")

dotenv.config();

const loginController = {
  Login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      }

      // Consulta o banco via service
      const rows = await Login(email);

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
        estado: {
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
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = loginController;