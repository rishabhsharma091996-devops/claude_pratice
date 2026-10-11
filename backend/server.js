const express = require("express");
const { Pool } = require("pg");

const app = express();
const port = process.env.PORT || 8080;

const pool = new Pool({
  connectionString: process.env.AZURE_POSTGRESQL_CONNECTIONSTRING,
  ssl: { rejectUnauthorized: false }
});

app.get("/api/status", (req, res) => {
  res.json({ message: "Backend is running" });
});

app.get("/api/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
