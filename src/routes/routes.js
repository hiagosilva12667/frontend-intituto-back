const express = require("express");
const router = express.Router();
const studentController = require("../controllers/controllers");

router.get("/", studentController.getStudents);
router.post("/", studentController.createStudent);
router.put("/:academicRegister", studentController.updateStudent);
router.get(
  "/:academicRegister",
  studentController.getStudentByAcademicRegister
);
router.delete("/:academicRegister", studentController.deleteStudent);

module.exports = router;
