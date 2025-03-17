const Student = require("../models/models");

exports.getStudents = (req, res) => {
  Student.getAll((err, results) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar alunos" });
    res.json(results);
  });
};

exports.createStudent = (req, res) => {
  const { name, email } = req.body;
  let { academicRegister, cpf } = req.body;

  if (!name || !email)
    return res.status(400).json({ error: "Nome e email são obrigatórios" });

  academicRegister = Number(academicRegister);
  cpf = Number(cpf);

  if (
    isNaN(academicRegister) ||
    academicRegister <= 0 ||
    !Number.isInteger(academicRegister)
  )
    return res
      .status(400)
      .json({ error: "Matrícula deve ser um número inteiro positivo" });

  if (isNaN(cpf) || cpf <= 0 || !Number.isInteger(cpf))
    return res
      .status(400)
      .json({ error: "CPF deve ser um número inteiro positivo" });

  Student.create({ name, email, academicRegister, cpf }, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao cadastrar aluno" });
    res.json({ message: "Aluno cadastrado com sucesso" });
  });
};

exports.getStudentByAcademicRegister = (req, res) => {
  const { academicRegister } = req.params;

  Student.getByAcademicRegister(academicRegister, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao buscar aluno" });

    if (result.length === 0) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.json(result[0]);
  });
};

exports.updateStudent = (req, res) => {
  const { academicRegister } = req.params;
  const { name, email, cpf } = req.body;

  Student.update(academicRegister, { name, email, cpf }, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao atualizar aluno" });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Aluno não encontrado" });

    res.json({ message: "Aluno atualizado com sucesso" });
  });
};

exports.deleteStudent = (req, res) => {
  const { academicRegister } = req.params;

  Student.delete(academicRegister, (err, result) => {
    if (err) return res.status(500).json({ error: "Erro ao excluir aluno" });

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Aluno não encontrado" });

    res.json({ message: "Aluno excluído com sucesso" });
  });
};
