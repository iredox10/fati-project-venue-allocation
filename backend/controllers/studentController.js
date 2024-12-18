import Deparment from "../models/department.js";
import Level from "../models/level.js";
import Student from "../models/student.js";
import Admin from "../models/user.js";

export const add_student = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    const department = await Deparment.findOne({ slug: req.params.department });
    department.students.push(student);
    department.save();
    res.status(201).json({ student, department });
  } catch (err) {
    res.statu(404).json(err);
  }
};

export const login = async (req, res) => {
  try {
    const student = await Student.findOne({
      candidateNo: req.body.candidateNo,
    });
    if (!student) return res.status(404).json("no student found");
    if (student.password !== req.body.password)
      return res.status(404).json("password not correct");
    res.status(200).json(student);
  } catch (error) {
    res.json(error);
  }
};

export const get_students = async (req, res) => {
  try {
    const students = await Deparment.findOne({
      slug: req.params.department,
    }).populate("students"); // Corrected to "students"

    if (!students) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message }); // Proper error handling
  }
};

// export const get_students = async (req, res) => {
//   try {
//     const students = await departments
//       .findOne({slug:req.params.department})
//       .populate("students");
//     res.status(200).json(students);
//   } catch (err) {
//     res.status(err);
//   }
// };

export const get_student = async (req, res) => {
  // res.json('hhele')
  try {
    const student = await Student.findById(req.params.id);
    if (student) {
      const level = await Level.findOne({ name: student.level }).populate(
        "courses"
      );
      res.json({ student, courses: level.courses });
    }
  } catch (err) {
    res.json(err);
  }
};

// admin controller

export const add_admin = async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).json(admin);
  } catch (err) {
    res.json(err);
  }
};

export const admin_login = async (req, res) => {
  try {
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) return res.status(404).json("user not found");
    if (admin.password != req.body.password)
      return res.status(404).json("password not match");
    res.status(200).json(admin);
  } catch (err) {
    res.json(err);
  }
};
