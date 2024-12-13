import mongoose from mongoose 

const student = new Mongoose.schema({
    fullName: {
        type: String,
        required: true
    },
    candidateNO: {
        type: String,
        required: true
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
},{timestaps:true})

const Student = mongoose.model('student',student)

export default Student