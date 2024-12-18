import mongoose from "mongoose";
import slug from "slug";
const level = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      // unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    noOfStudent: {
      type: String,
      required: true,
    },
    timetable: [
      {
        type: mongoose.Types.ObjectId,
        ref: "timetable",
      },
    ],
    courses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  { timestamps: true }
);

level.pre("save", function () {
  if (this.name) {
    this.slug = slug(this.name).toLowerCase();
  }
});

const Level = mongoose.model("level", level);

export default Level;
