import mongoose from "mongoose";
import slug from 'slug'

const department = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    desc: {
      type: String,
    },
    levels: [{
      type: mongoose.Types.ObjectId,
      ref: "level",
    }],
  },
  { timestamps: true }
);

department.pre('save', function(){
  if(this.name){
    this.slug = slug(this.name).toLowerCase();
  }
  console.log('hello')
})
const Deparment = mongoose.model("department", department);

export default Deparment;
