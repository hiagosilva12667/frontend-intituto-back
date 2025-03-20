const connection = require("../config/db");

const Student = {};

Student.create = ({
  name,
  email,
  academic_register,
  student_cpf,
  responsible_id,
}) => {
  return new Promise((resolve, reject) => {
    const sql = `INSERT INTO students (name, email, academic_register, student_cpf, responsible_id) VALUES (?, ?, ?, ?, ?)`;

    connection.query(
      sql,
      [name, email, academic_register, student_cpf, responsible_id],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

Student.getByAcademicRegister = (academic_register) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM students WHERE academic_register = ?`;
    connection.query(sql, [academic_register], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

Student.getByResponsibleId = (responsible_id) => {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM students WHERE responsible_id = ?`;
    connection.query(sql, [responsible_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

Student.update = (academic_register, { name, email, student_cpf }) => {
  return new Promise((resolve, reject) => {
    const sql = `UPDATE students SET name = ?, email = ?, student_cpf = ? WHERE academic_register = ?`;

    connection.query(
      sql,
      [name, email, student_cpf, academic_register],
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
};

Student.delete = (academic_register) => {
  return new Promise((resolve, reject) => {
    const sql = `DELETE FROM students WHERE academic_register = ?`;

    connection.query(sql, [academic_register], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

module.exports = Student;
