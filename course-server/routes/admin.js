const express = require("express");
const jwt = require("jsonwebtoken");
const { Admin, Course } = require("../db");
const { SECRET_KEY, authentication } = require("../middleware/auth");
const router = express.Router();

// Create Admin
router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(403).json({ message: "Admin already Exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    res.json({
      message: "Admin created successfully",
      token: jwt.sign({ username, role: "admin" }, SECRET_KEY, {
        expiresIn: "1h",
      }),
    });
  }
});

// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    res.json({
      message: "Admin Logged in successfully",
      token: jwt.sign({ username, role: "admin" }, SECRET_KEY, {
        expiresIn: "1h",
      }),
    });
  } else {
    res.status(403).json({ message: "Admin not found" });
  }
});

router.get("/me", authentication, (req, res) => {
  res.json({ user: req.user });
});

// Create Course

router.post("/courses", authentication, async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();

  res.json({ message: "Course Created succefully", courseId: newCourse.id });
});

// Update course
router.put("/courses/:courseId", authentication, async (req, res) => {
  const id = req.params.courseId;
  const course = await Course.findByIdAndUpdate(id, req.body);

  if (course) {
    res.json({ message: "Course Updated Successfully" });
  } else {
    res.status(403).json({ message: "Course not found" });
  }
});
// Get a single course
router.get("/courses/:id", authentication, async (req, res) => {
  const id = req.params.id;
  if (id.length !== 24) {
    res.status(403).json({ message: "Course not found" });
  } else {
    const course = await Course.findById(id);
    if (course) {
      res.json({ course });
    } else {
      res.status(403).json({ message: "Course not found" });
    }
  }
});
// Get courses
router.get("/courses", authentication, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

module.exports = router;
