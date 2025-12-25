const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth.controller");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

router.post("/signup", auth.signup);
router.post("/verify-otp", auth.verifyOtp);
router.post("/login", auth.login);
router.post("/complete-profile", authMiddleware, auth.completeProfile);

module.exports = router;
