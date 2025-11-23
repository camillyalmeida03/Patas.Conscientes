const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { LoginUnificado } = require("../models/loginServices");

dotenv.config();

const loginController = {
  Login: async (req, res) => {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
      }

      const { usuario, ong } = await LoginUnificado(email);

      if (!usuario) {
        return res.status(401).json({ message: "Usuário não encontrado." });
      }

      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ message: "Senha incorreta." });
      }

      let ongFormatada = null;

      if (ong) {
        ongFormatada = {
          id: ong.idong,
          id_responsavel: ong.idresponsavel,
          nome: ong.nome,
          email: ong.email,
          telefone: ong.telefone,
          descricao: ong.descricao,
          estado: {
            id: ong.idestado,
            sigla: ong.estado_sigla,
          },
          endereco: {
            rua: ong.rua,
            numero: ong.numero,
            bairro: ong.bairro,
            cidade: ong.cidade,
            cep: ong.cep,
          },
          data_criacao: ong.data_criacao,
          data_att: ong.data_att,
        };
      }

      const token = jwt.sign(
        {
          id: usuario.idusuario,
          email: usuario.email,
          tipo: usuario.tipo,
          ong: ongFormatada ? ongFormatada.id : null,
          id_responsavel: ongFormatada ? ongFormatada.id_responsavel : null
        },
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
          descricao: usuario.sexo,
        },
        estado: {
          id: usuario.idestado,
          sigla: usuario.estado_sigla,
        },
        endereco: {
          rua: usuario.rua,
          numero: usuario.numero,
          bairro: usuario.bairro,
          cidade: usuario.cidade,
          cep: usuario.cep,
        },
        tipo: usuario.tipo,
        data_criacao: usuario.data_criacao,
        data_att: usuario.data_att,
        responsavelOng: !!ong 
      };

      return res.status(200).json({
        message: "Login realizado com sucesso!",
        token,
        usuario: usuarioFormatado,
        ong: ongFormatada, 
      });
    } catch (error) {
      console.error("Erro no login:", error);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }
  },
};

module.exports = loginController;