const pool = require("./db");

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log(result.rows);
    console.log("✅ Database Connected");
  } catch (err) {
    console.log(err.message);
  }
}

testDB();