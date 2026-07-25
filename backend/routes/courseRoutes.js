const express = require("express");

const router = express.Router();

const courses = [
  {
    id: 1,
    name: "Web Development",
    instructor: "Zoha",
    duration: "8 Weeks",
  },
  {
    id: 2,
    name: "Database Systems",
    instructor: "Ali",
    duration: "6 Weeks",
  },
  {
    id: 3,
    name: "Python",
    instructor: "Sarah",
    duration: "10 Weeks",
  },
];

// GET all courses
router.get("/", (req, res) => {
  res.json(courses);
});

// GET one course by ID
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const course = courses.find(c => c.id === id);

  if (!course) {
    return res.status(404).json({
      message: "Course not found"
    });
  }

  res.json(course);
});

module.exports = router;