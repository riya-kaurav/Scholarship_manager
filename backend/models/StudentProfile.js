const mongoose = require("mongoose");

const StudentProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    name: String,
    age: Number,
    gender: String,
    phone: String,

    collegeName: String,
    collegeEmail: String,
    collegeState: String,

    course: String,
    yearOfStudy: String,
    educationLevel: String
  },
  { timestamps: true }
);

// INDEXES
StudentProfileSchema.index({ userId: 1 });

module.exports = mongoose.model("StudentProfile", StudentProfileSchema);
