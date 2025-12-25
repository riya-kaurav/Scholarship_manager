const mongoose = require("mongoose");

const ScholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    provider: {
      type: String,
      required: true
    },

    eligibility: {
      minAge: Number,
      maxAge: Number,
      educationLevel: String,
      state: String,
      incomeLimit: Number
    },

    documentsRequired: [String],
    testRequired: { type: Boolean, default: false },

    amount: Number,
    deadline: Date,
  
    officialLink: String,
    postedDate: { type: Date, default: Date.now },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

// INDEXES
ScholarshipSchema.index({ deadline: 1 });
ScholarshipSchema.index({ "eligibility.educationLevel": 1 });
ScholarshipSchema.index({ amount: -1 });

module.exports = mongoose.model("Scholarship", ScholarshipSchema);
