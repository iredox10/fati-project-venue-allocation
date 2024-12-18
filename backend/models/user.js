import mongoose from 'mongoose'

const admin = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
},{timestamps:true})

const Admin = mongoose.model('admin',admin)

export default Admin