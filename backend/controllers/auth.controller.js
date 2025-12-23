const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("e:/Scholarship Manager gdg/backend/models/user");
const StudentProfile = require("e:/Scholarship Manager gdg/backend/models/StudentProfile");
const Otp = require("e:/Scholarship Manager gdg/backend/models/Otp");

const generateOtp = require("../utils/generateOtp");
const sendEmail = require("../utils/sendEmail");

// SIGNUP
exports.signup = async (req, res) => {
  const { email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashed,
    role:"user"
  });

  const otp = generateOtp();
  await Otp.create({
    email,
    otp,
    expiresAt: new Date(Date.now() + 10 * 60000)
  });

  await sendEmail(email, otp);

  res.status(201).json({
    message: "Signup successful. Verify email using OTP."
  });
};

// VERIFY OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const record = await Otp.findOne({ email, otp });
  if (!record || record.expiresAt < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  await User.findOneAndUpdate({ email }, { isVerified: true });
  await Otp.deleteMany({ email });

  res.json({ message: "Email verified successfully" });
};

// COMPLETE PROFILE
exports.completeProfile = async (req, res) => {
  const userId = req.user.id;

  const profile = await StudentProfile.create({
    userId,
    ...req.body
  });

  res.json({
    message: "Profile completed",
    profile
  });
};

// LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.isVerified) {
    return res.status(403).json({ message: "Email not verified" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
};
