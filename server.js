const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Postgres connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Example API
app.get("/api/requests", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM requests");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB error");
  }
});

// Start
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
