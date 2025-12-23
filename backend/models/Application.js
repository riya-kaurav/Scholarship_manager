const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    scholarshipId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Scholarship",
      required: true
    },
    status: {
      type: String,
      enum: [
        "submitted",
        "under_review",
        "approved",
        "rejected"
      ],
      default: "submitted"
    }
  },
  { timestamps: true }
);

// INDEXES
ApplicationSchema.index({ userId: 1 });
ApplicationSchema.index({ scholarshipId: 1 });
ApplicationSchema.index({ status: 1 });

// Prevent duplicate applications
ApplicationSchema.index(
  { userId: 1, scholarshipId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Application", ApplicationSchema);
