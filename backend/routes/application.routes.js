const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Application = require("../models/Application");

// AUTH middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};


// ===============================
// APPLY FOR A SCHOLARSHIP
// ===============================
router.post("/:scholarshipId", auth, async (req, res) => {
  try {
    const application = await Application.create({
      userId: req.user.id,
      scholarshipId: req.params.scholarshipId
      // status defaults to "submitted"
    });

    res.status(201).json({
      message: "Application submitted",
      application
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Already applied for this scholarship"
      });
    }
    res.status(500).json({ message: "Server error" });
  }
});


// ===============================
// GET MY APPLICATIONS
// ===============================
router.get("/my", auth, async (req, res) => {
  const applications = await Application.find({
    userId: req.user.id
  }).populate("scholarshipId");

  res.json(applications);
});


// ===============================
// (OPTIONAL) ADMIN: UPDATE STATUS
// ===============================
router.put("/:id/status", auth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  const { status } = req.body;

  const updated = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.json(updated);
});

module.exports = router;
