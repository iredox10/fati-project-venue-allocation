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
    const department = await Deparment.findOne({
      slug: req.params.slug,
    }).populate("levels");
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
    const department = await Deparment.findOne({ slug: req.params.department });
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
    const level = await Level.findOne({ slug: req.param.slug });
    res.status(200).json(level);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const get_levels = async (req, res) => {
  try {
    const levels = await Deparment.findOne({
      slug: req.params.department,
    }).populate("levels");
    res.status(200).json(levels);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const add_course = async (req, res) => {
  try {
    const level = await Level.findOne({ slug: req.params.slug });
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
    const course = await Course.findOne({ slug: req.param.slug });
    res.status(200).json(course);
  } catch (err) {
    res.status(404).json(err.message);
  }
};
export const get_courses = async (req, res) => {
  try {
    const courses = await Level.findOne({ slug: req.params.slug }).populate(
      "courses"
    );
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
  try {
    const day = await Day.findOne({ slug: req.params.day });
    const course = await Course.findOne({ slug: req.body.course });
    day.courses.push(course);
    await day.save();
    res.status(200).json(day);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

export const get_day = async (req, res) => {
  try {
    const day = await Day.findOne({ shortDay: req.params.day }).populate(
      "courses"
    );
    res.status(200).json(day);
  } catch (err) {
    res.status(400).json(err);
  }
};

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

// ! automaticic allocation

export const AutoAllocation = async (req, res) => {
  try {
    const courses = await Course.find();
    const venues = await Venue.find({ isAllocated: false });

    if (venues.length === 0) {
      return res.status(404).json({ message: "No available venue" });
    }
    let suitableVenues;
    for (const course of courses) {
      suitableVenues = venues.filter(
        (venue) => venue.capacity >= course.noOfStudents
      );
    }
    res.json(suitableVenues);
  } catch (err) {
    res.status(400).status(err.message);
  }
};

// utils/formatDuration.js
export function formatDuration(duration) {
  const regex = /(\d+)\s*(hr|hrs|hour|hours|min|mins|minute|minutes)/i;
  const match = duration.match(regex);

  if (match) {
    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    if (unit.startsWith("hr")) {
      return `${value} hour${value > 1 ? "s" : ""}`;
    } else if (unit.startsWith("min")) {
      return `${value} minute${value > 1 ? "s" : ""}`;
    }
  }

  return duration; // Return original if no match
}

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses
    const formattedCourses = courses.map((course) => ({
      ...course.toObject(), // Convert Mongoose document to plain object
      formattedDuration: formatDuration(course.duration), // Add formatted duration
    }));

    res.status(200).json(formattedCourses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

export const allocate = async (req, res) => {
  try {
    const course = await Course.find({ slug: req.body.name });
  } catch (err) {}
};

export const find_available_venues = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.course });
    const venues = await Venue.find();
    const availableVenues = venues.filter(
      (venue) => venue.capacity >= course.noOfStudents
    );
    res.json(availableVenues);
  } catch (err) {
    res.json(err.message);
  }
};

export const allocate_venue = async (req, res) => {
  try {
    const venue = await Venue.findOneAndUpdate(
      { slug: req.params.slug },
      {
        isAllocated: true,
        allocatedCourse: req.params.courseName,
      },
      { new: true }
    );
    res.json(venue);
  } catch (err) {
    res.json(err.message);
  }
};
