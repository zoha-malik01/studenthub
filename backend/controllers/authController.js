const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required."
    });
  }

  try {
    // Check if email already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
   if (existingUser.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user
    const result = await pool.query(
      `INSERT INTO users (name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, name, email, role`,
      [name, email, hashedPassword]
    );
    res.status(201).json({
      message: "User registered successfully",
      user: result.rows[0]
    });
  } 
  catch (error) {
    console.log(error);
        res.status(500).json({
          message: "Server Error"
    });
  }
};

exports.login = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Email and Password are required."
        });
    }

    try {
         const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    }
    catch (error) {
        console.log(error);
          res.status(500).json({
            message: "Server Error"
        });
    }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      message: "Email and Password are required."
    });
  }

  try {
    // Find user by email
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    // Check if user exists
    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Compare entered password with hashed password
    const isMatch = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    // If password is incorrect
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password"
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        email: user.rows[0].email,
        role: user.rows[0].role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        role: user.rows[0].role
      }
    });

  } 
  catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error"
    });
  }
};