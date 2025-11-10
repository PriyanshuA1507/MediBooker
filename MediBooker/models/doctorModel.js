// Doctor Model
// Developed by Priyanshu for MediBooker

const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    specialization: {
      type: String,
      required: true,
      trim: true,
    },
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    fees: {
      type: Number,
      required: true,
      min: 0,
    },
    timing: {
      type: String,
      enum: ["morning", "afternoon", "evening", "night"],
      default: "morning",
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Doctor", doctorSchema);
