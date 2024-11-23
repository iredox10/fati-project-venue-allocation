import express from 'express'
import * as controller from '../controllers/controllers.js'

const route = express.Router()


route.post('/add-department', controller.add_department)

route.get('/get-departments', controller.get_departments)

route.get('/get-department/:slug', controller.get_department)


route.post('/add-level/:department', controller.add_level)

route.get('/get-level/:slug', controller.get_level)

route.get('/get-levels/:department', controller.get_levels)


route.post('/add-course/:slug', controller.add_course)

route.get('/get-courses/:slug', controller.get_courses)

route.get('/get-course/:slug', controller.get_course)

route.post('/add-timetable/:courseId',controller.add_timetable_to_course)

route.post('/add-day',controller.add_day)

route.post('/add-course-to-day/:day',controller.add_course_to_day)

route.get('/get-day/:day', controller.get_day)


route.get('/get-venues', controller.get_venues)

route.post('/add-venue', controller.add_venue)


route.get('/auto-allocation/:day', controller.AutoAllocation)

export default route