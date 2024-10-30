import mongoose from "mongoose";
import slug from 'slug'

const course = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique:true
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    duration: {
      type: String,
      required: true,
    },
    timeFrom: {
      type: String,
      required: true,
    },
    timeTo: {
      type: String,
      required: true,
    },
    specialReq: Array,
  },
  { timestamps: true }
);


course.pre('save', function(){
  if(this.name){
    this.slug = slug(this.name).toLowerCase();
  }
  console.log('hello')
})

const Course = mongoose.model("course", course);

export default Course;
