require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./routes/routes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/students", studentRoutes);
app.use(express.json());
module.exports = app;
