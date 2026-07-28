const pool = require("../db");
const bcrypt = require("bcrypt");

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

exports.login = (req, res) => {
    res.send("Login Controller");
};