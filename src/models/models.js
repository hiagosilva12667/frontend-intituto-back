const connection = require("../config/db");

const Student = {
  getAll: (callback) => {
    connection.query("SELECT * FROM students", callback);
  },
  create: (data, callback) => {
    const sql =
      "INSERT INTO students (name, email, academicRegister, cpf) VALUES (?, ?, ?, ?)";
    connection.query(
      sql,
      [data.name, data.email, data.academicRegister, data.cpf],
      callback
    );
  },
  getByAcademicRegister: (academicRegister, callback) => {
    const sql = "SELECT * FROM students WHERE academicRegister = ?";
    connection.query(sql, [academicRegister], callback);
  },

  update: (academicRegister, data, callback) => {
    const sql =
      "UPDATE students SET name = ?, email = ?, cpf = ? WHERE academicRegister = ?";
    connection.query(
      sql,
      [data.name, data.email, data.cpf, academicRegister],
      callback
    );
  },
  delete: (academicRegister, callback) => {
    const sql = "DELETE FROM students WHERE academicRegister = ?";
    connection.query(sql, [academicRegister], callback);
  },
};

module.exports = Student;
