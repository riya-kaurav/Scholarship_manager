const mongoose = require("mongoose");

const OtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true
    },
    otp: {
      type: String,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

// TTL INDEX → AUTO DELETE AFTER EXPIRY
OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Optional performance index
OtpSchema.index({ email: 1 });

module.exports = mongoose.model("Otp", OtpSchema);
