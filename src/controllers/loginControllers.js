const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { banco } = require("../models/database");

dotenv.config();

const loginController = {
  Login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      // Verifica se o e-mail foi informado
      if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      }

      // Busca o usuário no banco
      const [rows] = await banco.query("SELECT * FROM usuarios WHERE email = ?", [email]);

      if (rows.length === 0) {
        return res.status(401).json({ message: "Usuário não encontrado." });
      }

      const usuario = rows[0];

      // Compara a senha enviada com a senha armazenada (hash)
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { id: usuario.idusuario, email: usuario.email, tipo: usuario.fk_idtipo },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
        usuario: {
          id: usuario.idusuario,
          nome: usuario.nome,
          email: usuario.email,
          tipo: usuario.fk_idtipo,
        },
      });

    } catch (error) {
      console.error("Erro ao fazer login:", error.message);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = loginController;
