import Course from "../models/course.js";
import Venue from "../models/venue.js";
import Deparment from "../models/department.js";
import Level from "../models/level.js";
import Timetable from "../models/timetable.js";
import Day from "../models/Days.js";

export const add_department = async (req, res) => {
  try {
    const department = await Deparment.create(req.body);
    res.status(201).json(department);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const get_department = async (req, res) => {
  try {
    const department = await Deparment.findOne({slug:req.params.slug}).populate(
      "levels"
    );
    res.status(200).json(department);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const get_departments = async (req, res) => {
  try {
    const departments = await Deparment.find();
    res.status(200).json(departments);
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const add_level = async (req, res) => {
  try {
    const department = await Deparment.findOne({slug:req.params.department});
    const level = await Level.create(req.body);
    department.levels.push(level);
    department.save();
    res.status(201).json({ level, department });
  } catch (err) {
    res.status(400).json(err.message);
  }
};
export const get_level = async (req, res) => {
  try {
    const level = await Level.findOne({slug:req.param.slug});
    res.status(200).json(level);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const get_levels = async (req, res) => {
  try {
    const levels = await Deparment.findOne({slug:req.params.department}).populate("levels");
    res.status(200).json(levels);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const add_course = async (req, res) => {
  try {
    const level = await Level.findOne({slug:req.params.slug});
    const course = await Course.create(req.body);
    level.courses.push(course);
    level.save();
    res.status(201).json({ level, course });
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const get_course = async (req, res) => {
  try {
    const course = await Course.findOne({slug:req.param.slug});
    res.status(200).json(course);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const get_courses = async (req, res) => {
  try {
    const courses = await Level.findOne({slug:req.params.slug}).populate("courses");
    res.status(200).json(courses);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const add_timetable_to_course = async (req, res) => {
  try {
    const level = await Level.findById(req.params.id);
    const timetable = await Timetable.create({
      level: level._id,
      lecturer: req.body.lecturer,
      day: req.body.day,
      timeFrom: req.body.timeFrom,
      timeTo: req.body.timeTo,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const add_day = async (req, res) => {
  try {
    const day = await Day.create(req.body);
    res.status(201).json(day);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

export const add_course_to_day = async (req, res) => {
   try{
      const day = await Day.findOne({slug:req.params.day})
      const course = await Course.findOne({slug:req.body.course}) 
      day.courses.push(course)
      await day.save()
      res.status(200).json(day)
   }catch(err){
      res.status(400).json(err.message)
   }
};

export const get_day = async (req,res) =>{
  try{
    const day = await Day.findOne({shortDay:req.params.day}).populate('courses')
    res.status(200).json(day)
  }catch(err){
    res.status(400).json(err)
  }
}

export const add_venue = async (req, res) => {
  try {
    const venue = await Venue.create(req.body);
    res.status(201).json(venue);
  } catch (err) {
    res.status(400).json(err.message);
  }
};


export const get_venues = async (req, res) => {
  try {
    const venues = await Venue.find();
    res.status(200).json(venues);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

