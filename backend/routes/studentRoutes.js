import express from 'express'
import * as controller from '../controllers/studentController.js'

const studentRoute = express.Router()

studentRoute.post('/add-student', controller.add_student)

studentRoute.post('/student-login', controller.add_student)




export default studentRoute