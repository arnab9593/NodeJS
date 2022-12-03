const { Router } = require("express");
const { createStudent, findStudent } = require("../controllers/student.controller");
const StudentModel = require("../models/student.model")

const studentRouter = Router();

studentRouter.get("/", async (req, res) => {
    // const studentsList = await StudentModel.find();
    // return res.send(studentsList);

    const allStudent = await findStudent();
    return res.send(allStudent);

});


studentRouter.post("/", async (req, res) => {
    const { name, age, studentcode } = req.body;
    const { message } = await createStudent({ name, age, studentcode });
    if (message !== "OK") {
        return res.send("Student creation failed")
    } else {
        return res.send("Student created sucessfully")
    }
});


studentRouter.put("/:id", () => {

});


studentRouter.get("/:id", async (res, req) => {

    const id = req.params.id
    const studentByid = await findStudent(id);
    return res.send(studentByid);

});



studentRouter.delete("/:id", () => {

});


module.exports = { studentRouter }
