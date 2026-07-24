const express = require("express");

const app = express();

// Home Route
app.get("/", (req, res) => {
    res.send("Welcome to StudentHub!");
});

// Courses Route
app.get("/courses", (req, res) => {
    res.json([
        {
            id: 1,
            name: "Web Development",
            instructor: "Zoha"
        },
        {
            id: 2,
            name: "Database Systems",
            instructor: "Ali"
        }
    ]);
});

app.listen(3000, () => {
    console.log(" Server running on http://localhost:3000");
});