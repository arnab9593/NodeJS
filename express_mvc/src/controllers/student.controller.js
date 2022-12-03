
const StudentModel = require("../models/student.model");

async function createStudent({ name, age, studentcode }) {
    const student = new StudentModel({ name, age, studentcode });
    if (age > 27) {
        return {
            message: "NOT OK",
            des: "Beyond age limit"
        }
    }
    await student.save();
    return {
        message: "OK",
        desc: "student created sucessfully"
    }
}

async function findStudent(id) {
    if (id) {
        const student = await StudentModel.findById(id);
        return student;
    } else {
        const student = await StudentModel.find().limit(10);
        return student;
    }
}

module.exports = { createStudent, findStudent };
