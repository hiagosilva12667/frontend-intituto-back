const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY não definida no ambiente");
}

module.exports = (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Acesso negado, token não fornecido" });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Erro na verificação do token:", err);
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    req.user = decoded;
    next();
  });
};
