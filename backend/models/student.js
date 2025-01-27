import mongoose from 'mongoose'

const student = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    candidateNo: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
},{timestamps:true})

const Student = mongoose.model('student',student)

export default Student