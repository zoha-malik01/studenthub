const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);

app.get("/", (req, res) => {
    res.send("Welcome to StudentHub!");
});

app.get("/about", (req, res) => {
    res.json({
        project: "StudentHub",
        version: "1.0.0",
        developer: "Zoha Malik"
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});