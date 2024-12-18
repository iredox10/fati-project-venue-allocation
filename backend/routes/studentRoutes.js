import express from "express";
import * as controller from "../controllers/studentController.js";

const studentRoute = express.Router();

studentRoute.post("/add-student/:department", controller.add_student);

studentRoute.post("/student-login", controller.login);

studentRoute.get("/get-students/:department", controller.get_students);

// studentRoute.get("/get-student/:id", controller.get_student);

studentRoute.get('/get-student/:id', controller.get_student)


// admin routes

studentRoute.post('/add-admin', controller.add_admin)

studentRoute.post('/admin-login', controller.admin_login)


export default studentRoute;
