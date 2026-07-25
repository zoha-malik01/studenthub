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

router.get("/", (req, res) => {
  res.json(courses);
});

module.exports = router;