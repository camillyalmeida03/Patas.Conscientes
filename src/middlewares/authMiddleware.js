const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verificarToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, usuario) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido ou expirado." });
    }

    req.usuario = usuario; // guarda os dados do usuário logado
    next();
  });
};

module.exports = verificarToken;
