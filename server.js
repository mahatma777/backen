const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "taldata",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// ---------------- SERMONS ---------------- //

// GET all sermons
app.get("/sermon", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM sermon_recordsgit init ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST new sermon
app.post("/sermon", async (req, res) => {
  try {
    const { sermon_title, file } = req.body;
    if (!sermon_title) return res.status(400).json({ error: "sermon_title required" });

    const [result] = await pool.query(
      "INSERT INTO sermons (sermon_title, file) VALUES (?, ?)",
      [sermon_title, file]
    );
    res.json({ id: result.insertId, sermon_title, file });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------------- PODCASTS ---------------- //

// GET all podcasts
app.get("/podsdata", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM podcasts ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST new podcast
app.post("/podsdata", async (req, res) => {
  try {
    const { podname, author, thumbnail } = req.body;
    if (!podname) return res.status(400).json({ error: "podname required" });

    const [result] = await pool.query(
      "INSERT INTO podcasts (podname, author, thumbnail) VALUES (?, ?, ?)",
      [podname, author, thumbnail]
    );
    res.json({ id: result.insertId, podname, author, thumbnail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------------- ARTICLES ---------------- //

// GET all articles
app.get("/articles", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM articles ORDER BY created_at DESC");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// POST new article
app.post("/articles", async (req, res) => {
  try {
    const { title, author, thumbnail } = req.body;
    if (!title) return res.status(400).json({ error: "title required" });

    const [result] = await pool.query(
      "INSERT INTO articles (title, author, thumbnail) VALUES (?, ?, ?)",
      [title, author, thumbnail]
    );
    res.json({ id: result.insertId, title, author, thumbnail });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// ---------------- SERVER ---------------- //
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));