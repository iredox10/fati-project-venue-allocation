import mongoose from 'mongoose'
import slug from 'slug'
const day = new mongoose.Schema({
    day: {
        type: String,
        required: true,
        unique: true
    },
    slug:{
        type: String,
        unique: true
    },
    shortDay:{
        type: String,
        required: true
    },
    courses:[{
        type: mongoose.Types.ObjectId,
        ref: 'course'
    }]
})

day.pre('save', function(){
  if(this.shortDay){
    this.slug = slug(this.shortDay).toLowerCase();
  }
})
const Day = mongoose.model('day', day)

export default Day