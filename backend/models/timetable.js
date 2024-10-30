import mongoose from "mongoose";

const timetable = new mongoose.Schema(
  {
    level: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    course: {
      type: mongoose.Types.ObjectId,
      ref: "course",
    },
    lecturer: {
      type: String,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    timeFrom: {
      type: Date,
      required: true,
    },
    timeTo: {
      type: Date,
      required: true,
    },
    specialReq: Array,
  },
  { timestamps: true }
);

const Timetable = mongoose.model("timetable", timetable);

export default Timetable;
