import Student from "../models/student"

export const add_student =async (req,res) =>{
    try {
       const student = await Student.create(req.body)
       res.statu(201).json(student) 
    } catch (err) {
       res.statu(404).json(err) 
    }
}
