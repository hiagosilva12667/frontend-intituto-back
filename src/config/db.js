require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.error("Erro ao conectar ao MySQL:", err);
    return;
  }
  console.log("Conectado ao MySQL!");

  const createResponsiblesTable = `
    CREATE TABLE IF NOT EXISTS responsibles (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      phone_number VARCHAR(50) NOT NULL,
      cpf BIGINT NOT NULL UNIQUE,
      password VARCHAR(100) NOT NULL
    )
  `;

  const createStudentsTable = `
    CREATE TABLE IF NOT EXISTS students (
      id INT PRIMARY KEY AUTO_INCREMENT,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) NOT NULL UNIQUE,
      academic_register BIGINT NOT NULL UNIQUE,
      responsible_id INT NOT NULL,
      student_cpf BIGINT NOT NULL,
      FOREIGN KEY (responsible_id) REFERENCES responsibles(id) ON DELETE CASCADE
    )
  `;

  connection.query(createResponsiblesTable, (err) => {
    if (err) {
      console.error("Erro ao criar a tabela de responsáveis:", err);
      return;
    }
    console.log("Tabela 'responsibles' verificada/criada com sucesso.");

    connection.query(createStudentsTable, (err) => {
      if (err) {
        console.error("Erro ao criar a tabela de alunos:", err);
        return;
      }
      console.log("Tabela 'students' verificada/criada com sucesso.");
    });
  });
});

module.exports = connection;
