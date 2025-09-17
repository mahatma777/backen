require("dotenv").config();
const express = require("express");
const cors = require("cors");
const pool = require("./db"); // ✅ This pulls in your connection pool

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("📡 Sermon backend is running ✅");
});

app.get("/articles", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM articles");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching Articles:", err);
    res.status(500).json({ error: "Database error" });
  }
});

app.get("/pods", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pods");
    res.json(rows);
  } catch (err) {
    console.error("❌ Error fetching Pods:", err);
    res.status(500).json({ error: "Database error" });
  }
});

// Add other routes here...

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
