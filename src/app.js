require("dotenv").config();
const express = require("express");
const cors = require("cors");

const responsibleRoutes = require("./routes/responsibleRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/responsibles", responsibleRoutes);

app.use("/students", studentRoutes);

app.use(cors());
app.use(express.json());

app.use("/api/students", studentRoutes);
app.use("/api/responsibles", responsibleRoutes);

module.exports = app;
