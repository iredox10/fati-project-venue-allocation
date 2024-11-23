import Course from "../models/course.js";
import Venue from "../models/venue.js";
import Deparment from "../models/department.js";
import Level from "../models/level.js";
import Timetable from "../models/timetable.js";
import Day from "../models/Days.js";

export const add_department = async (req, res) => {
  try {
    const department = await Deparment.create(req.body);
    res.status(201).json(department); } catch (err) {
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


// export const allocateVenue = asycn (req,res) =>{
//   try {
//   } catch (err) {
    
//   }
// }

// ! automaticic allocation

export const AutoAllocation = async (req, res) => {
  try {
    const courses = await Course.find();
    const venues = await Venue.find({ isAllocated: false });

    if (venues.length === 0) {
      return res.status(404).json({ message: "No available venue" });
    }
    let suitableVenues  
    for (const course of courses) {
      suitableVenues = venues.filter(
        (venue) => venue.capacity >= course.noOfStudents
      );
    }
    res.json(suitableVenues)
  } catch (err) {
    res.status(400).status(err.message);
  }
};

// const allocateVenue = async (req, res) => {
//   try {
//     // Extract class ID from the request body
//     const { classId } = req.body;

//     // Find the class by ID
//     const classToAllocate = await Level.findById(classId);
//     if (!classToAllocate) {
//       return res.status(404).json({ message: 'Class not found' });
//     }

//     // Find suitable venues that meet the class requirements
//     const suitableVenues = await Venue.find({
//       capacity: { $gte: classToAllocate.number_of_students },
//       facilities: { $all: classToAllocate.special_requirements }, // Match all special requirements
//       isAllocated: false // Ensure venue is available
//     });

//     if (suitableVenues.length === 0) {
//       return res.status(404).json({ message: 'No suitable venues available' });
//     }

//     // Check schedule conflicts for each venue
//     for (let venue of suitableVenues) {
//       const hasConflict = await Schedule.findOne({
//         venueId: venue._id,
//         day: req.body.day,
//         timeSlot: req.body.timeSlot,
//       });

//       if (!hasConflict) {
//         // Allocate the venue by creating a new schedule entry
//         const newSchedule = new Schedule({
//           classId: classToAllocate._id,
//           venueId: venue._id,
//           day: req.body.day,
//           timeSlot: req.body.timeSlot,
//         });
//         await newSchedule.save();

//         // Mark the venue as allocated (if you want to restrict allocation)
//         venue.isAllocated = true;
//         await venue.save();

//         return res.status(200).json({
//           message: `Venue ${venue.name} allocated to class ${classToAllocate.name}`,
//           schedule: newSchedule,
//         });
//       }
//     }

//     // If no suitable, conflict-free venues are found
//     res.status(404).json({ message: 'No available venues without schedule conflicts' });

//   } catch (error) {
//     console.error('Error allocating venue:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// const allocateVenuesAutomatically = async (req, res) => {
//   try {
//     // Fetch all classes to be allocated
//     const classes = await Class.find();
//     const venues = await Venue.find({ isAllocated: false }); // Only available venues

//     // Check if there are any venues available
//     if (venues.length === 0) {
//       return res.status(404).json({ message: 'No available venues' });
//     }

//     // Iterate over each class and allocate a suitable venue
//     for (const classItem of classes) {
//       // Find suitable venues for the current class
//       const suitableVenues = venues.filter(venue =>
//         venue.capacity >= classItem.number_of_students &&
//         classItem.special_requirements.every(req => venue.facilities.includes(req))
//       );

//       // Iterate over suitable venues to check for scheduling conflicts
//       let venueAllocated = false;
//       for (const venue of suitableVenues) {
//         const hasConflict = await Schedule.findOne({
//           venueId: venue._id,
//           day: classItem.day, // Assuming 'day' is a field in the class data
//           timeSlot: classItem.timeSlot, // Assuming 'timeSlot' is a field in the class data
//         });

//         // Allocate if no conflict is found
//         if (!hasConflict) {
//           const newSchedule = new Schedule({
//             classId: classItem._id,
//             venueId: venue._id,
//             day: classItem.day,
//             timeSlot: classItem.timeSlot,
//           });
//           await newSchedule.save();

//           // Mark venue as allocated in the current time slot
//           venueAllocated = true;
//           break;
//         }
//       }

//       if (!venueAllocated) {
//         console.log(`No available venue for class ${classItem.name} without conflicts`);
//       }
//     }
