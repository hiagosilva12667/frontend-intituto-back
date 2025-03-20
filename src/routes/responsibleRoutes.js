const express = require("express");
const Responsible = require("../models/responsible");

const router = express.Router();

router.post("/create-account", async (req, res) => {
  const { name, email, phone_number, cpf, password } = req.body;
  await Responsible.create({
    name,
    email,
    phone_number,
    cpf,
    password,
  });
});

router.post("/login", async (req, res) => {
  await Responsible.login(req, res);
});

router.get("/:cpf", async (req, res) => {
  try {
    const { cpf } = req.params;
    const responsible = await Responsible.getByCpf(cpf);
    if (!responsible) {
      return res.status(404).json({ error: "Responsável não encontrado" });
    }

    res.json(responsible);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar responsável" });
  }
});

module.exports = router;
