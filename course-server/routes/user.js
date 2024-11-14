const express = require("express");
const jwt = require("jsonwebtoken");
const { User, Course } = require("../db");
const { SECRET_KEY, authentication } = require("../middleware/auth");
const router = express.Router();

// User signup
router.post("/signup", async (req, res) => {
  const { email, username, password } = req.body;
  const user =
    (await User.findOne({ username })) || (await User.findOne({ email }));
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ email, username, password });
    newUser.save();
    res.json({
      message: "User created successfully",
      token: jwt.sign({ username, role: "user" }, SECRET_KEY, {
        expiresIn: "1h",
      }),
    });
  }
});

// User login
router.post("/login", async (req, res) => {
  const { email, username, password } = req.headers;
  const user =
    (await User.findOne({ username, password })) ||
    (await User.findOne({ email, password }));
  if (user) {
    res.json({
      message: "Logged in successfully",
      token: jwt.sign({ username: user.username, role: "user" }, SECRET_KEY, {
        expiresIn: "1h",
      }),
    });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

// Get published courses
router.get("/courses", authentication, async (req, res) => {
  const publishedCourses = await Course.find({ published: true });
  res.json({ courses: publishedCourses });
});

// Buy Courses
router.post("/courses/:id", authentication, async (req, res) => {
  const id = req.params.id;
  const course = await Course.findById(id);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    const alreadyPurchased = user.purchasedCourses.some((courseId) =>
      courseId.equals(course._id)
    );

    if (alreadyPurchased) {
      return res.status(400).json({ message: "Course already purchased" });
    } else {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    }
  } else {
    res.status(403).json({ message: "Course not found" });
  }
});

// Get purchased courses
router.get("/purchasedCourses", authentication, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ courses: user.purchasedCourses });
  } else {
    res.status({ meassage: "User not found" });
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

module.exports = router;
