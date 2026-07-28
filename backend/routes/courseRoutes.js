const express = require("express");

const router = express.Router();

const pool = require("../db");

router.get("/:id", async (req, res) => {

    const id = req.params.id;
    try {
        const result = await pool.query(
            "SELECT * FROM courses WHERE id = $1",
            [id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        res.json(result.rows[0]);
      } 
    catch (error) {
        console.log(error);
          res.status(500).json({
            message: "Server Error"
        });
    }
});


// POST - Add a new course
router.post("/", async (req, res) => {
   const { name, instructor, duration } = req.body;
    if (!name || !instructor || !duration) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }
    try {
        const result = await pool.query(
            `INSERT INTO courses
            (name, instructor, duration)
            VALUES ($1, $2, $3)
            RETURNING *`,
            [name, instructor, duration]
        );

        res.status(201).json({
            message: "Course added successfully",
            course: result.rows[0]
        });
    }
     catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }

});

// Update course
router.put("/:id", async (req, res) => {

    const id = req.params.id;
    const { name, instructor, duration } = req.body;

    if (!name || !instructor || !duration) {
        return res.status(400).json({
            message: "All fields are required."
        });
    }
    try {
        const result = await pool.query(
          `UPDATE courses
            SET name = $1,
                instructor = $2,
                duration = $3
            WHERE id = $4
            RETURNING *`,
            [name, instructor, duration, id]
        );
      if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        res.json({
            message: "Course updated successfully",
            course: result.rows[0]
        });
      } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});

// delete course 
router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const result = await pool.query(
            "DELETE FROM courses WHERE id = $1 RETURNING *",
            [id]
        );
          if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Course not found"
            });
        }
        res.json({
            message: "Course deleted successfully"
        });
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server Error"
        });
    }
});

module.exports = router;