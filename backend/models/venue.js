
import mongoose from "mongoose";
import slug from 'slug'

const venue = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug:{
      type: String,
      unique: true
    },
    block: {
      type: String,
      required: true,
    },
    capacity: {
      type: String,
      required: true,
    },
    equipments: Array,
  },
  { timestamps: true }
);

venue.pre('save', function(){
  if(this.name){
    this.slug = slug(this.name).toLowerCase();
  }
})
const Venue = mongoose.model("venue", venue);

export default Venue;
