const express = require("express");
const router = express.Router();
const Scholarship = require("../models/Scholarship");
const jwt = require("jsonwebtoken");

// middleware
const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  req.user = jwt.verify(token, process.env.JWT_SECRET);
  next();
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }
  next();
};

// ADMIN: add scholarship
router.post("/", auth, adminOnly, async (req, res) => {
  const scholarship = await Scholarship.create({
    ...req.body,
    createdBy: req.user.id
  });
  res.status(201).json(scholarship);
});

// ADMIN: update scholarship
router.put("/:id", auth, adminOnly, async (req, res) => {
  const updated = await Scholarship.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// ADMIN: delete scholarship
router.delete("/:id", auth, adminOnly, async (req, res) => {
  await Scholarship.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// PUBLIC: get scholarships with filters
router.get("/", async (req, res) => {
  const query = {};

  if (req.query.gender) query.gender = { $in: [req.query.gender, "any"] };

  if (req.query.state) query.state = req.query.state;
  if (req.query.type) query.type = req.query.type;

  const scholarships = await Scholarship.find(query).sort({ postedDate: -1 });
  res.json(scholarships);
});

module.exports = router;
