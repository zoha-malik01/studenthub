const express = require("express");

const app = express();

const courseRoutes = require("./routes/courseRoutes");

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to StudentHub!");
});

// Courses Route
const courses = [
  {
    id: 1,
    name: "Web Development",
    instructor: "Zoha",
    duration: "8 Weeks"
  },
  {
    id: 2,
    name: "Database Systems",
    instructor: "Ali",
    duration: "6 Weeks"
  },
  {
    id: 3,
    name: "Python",
    instructor: "Sarah",
    duration: "10 Weeks"
  }
];

// About Route

const about = 
  {
  "project": "StudentHub",
  "version": "1.0.0",
  "developer": "Zoha Malik"
  };


app.use("/courses", courseRoutes);


app.get("/about", (req, res) => {
  res.json(about);
});

app.listen(3000, () => {
    console.log(" Server running on http://localhost:3000");
});