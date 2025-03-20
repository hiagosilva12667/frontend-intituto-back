const connection = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Responsible = {};

Responsible.getByPhone = (phone_number) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM responsibles WHERE phone_number = ?";
    connection.query(sql, [phone_number], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};
Responsible.create = ({ name, email, phone_number, cpf, password }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const sql = `INSERT INTO responsibles (name, email, phone_number, cpf, password) VALUES (?, ?, ?, ?, ?)`;

      connection.query(
        sql,
        [name, email, phone_number, cpf, hashedPassword],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

Responsible.comparePassword = async (inputPassword, storedPassword) => {
  return bcrypt.compare(inputPassword, storedPassword);
};

Responsible.getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM responsibles WHERE email = ?";
    connection.query(sql, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0 ? results[0] : null);
    });
  });
};

Responsible.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "E-mail e senha são obrigatórios" });
    }

    const user = await Responsible.getByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Usuário ou senha incorretos" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Usuário ou senha incorretos" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.setHeader("Content-Type", "application/json");
    res.json({
      message: "Login realizado com sucesso",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ error: "Erro ao processar login" });
  }
};

Responsible.getByCpf = (cpf) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM responsibles WHERE cpf = ?`;
    connection.query(sql, [cpf], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

Responsible.getById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM responsibles WHERE id = ?`;
    connection.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

module.exports = Responsible;
