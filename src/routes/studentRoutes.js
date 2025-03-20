const express = require("express");
const Student = require("../models/student");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/create-student", authMiddleware, async (req, res) => {
  try {
    const { name, email, academic_register, student_cpf } = req.body;

    if (!name || !email || !academic_register || !student_cpf) {
      return res
        .status(400)
        .json({ error: "Todos os campos são obrigatórios" });
    }

    const userId = req.user.id;

    await Student.create({
      name,
      email,
      academic_register,
      student_cpf,
      responsible_id: userId,
    });

    res.status(201).json({ message: "Aluno cadastrado com sucesso" });
  } catch (error) {
    console.log("Erro ao criar aluno:", error);
    res.status(500).json({ error: "Erro ao criar aluno" });
  }
});

router.get("/students", authMiddleware, async (req, res) => {
  try {
    const students = await Student.getByResponsibleId(req.user.id);

    res.json(students);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Erro ao buscar alunos" });
  }
});

router.get("/:academic_register", async (req, res) => {
  try {
    const { academic_register } = req.params;
    const student = await Student.getByAcademicRegister(academic_register);

    if (!student) {
      return res.status(404).json({ error: "Aluno não encontrado" });
    }

    res.json(student);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
});

router.put(
  "/update-student/:academic_register",
  authMiddleware,
  async (req, res) => {
    try {
      const { academic_register } = req.params;
      const { name, email, student_cpf } = req.body;

      if (!name || !email || !student_cpf) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const student = await Student.getByAcademicRegister(academic_register);

      if (!student) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      await Student.update(academic_register, {
        name,
        email,
        student_cpf,
      });

      res.status(200).json({ message: "Aluno atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao atualizar aluno:", error);
      res.status(500).json({ error: "Erro ao atualizar aluno" });
    }
  }
);

router.delete(
  "/delete-student/:academic_register",
  authMiddleware,
  async (req, res) => {
    try {
      const { academic_register } = req.params;

      const student = await Student.getByAcademicRegister(academic_register);

      if (!student) {
        return res.status(404).json({ error: "Aluno não encontrado" });
      }

      await Student.delete(academic_register);

      res.status(200).json({ message: "Aluno deletado com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar aluno:", error);
      res.status(500).json({ error: "Erro ao deletar aluno" });
    }
  }
);

module.exports = router;
