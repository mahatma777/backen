require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MySQL Connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST || "localhost",
//   user: process.env.DB_USER || "root",
//   password: process.env.DB_PASS || "",
//   database: process.env.DB_NAME || "ggn",
// });

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Test DB connection
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL database");
  }
});

// Default route
app.get("/", (req, res) => {
  res.send("📡 Sermon backend is running ✅");
});

// Example API: Fetch all sermons
// app.get("/sermons", (req, res) => {
//   db.query("SELECT * FROM sermons", (err, results) => {
//     if (err) {
//       console.error("❌ Error fetching sermons:", err.message);
//       return res.status(500).json({ error: "Database error" });
//     }
//     res.json(results);
//   });
// });


app.get("/articles", (req, res) => {
  db.query("SELECT * FROM articles", (err, results) => {
    if (err) {
      console.error("❌ Error fetching Articles:", err.message);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// Example API: Add a sermon
// app.post("/sermons", (req, res) => {
//   const { title, preacher, audioUrl } = req.body;
//   if (!title || !preacher || !audioUrl) {
//     return res.status(400).json({ error: "Missing fields" });
//   }

//   db.query(
//     "INSERT INTO sermons (title, preacher, audioUrl) VALUES (?, ?, ?)",
//     [title, preacher, audioUrl],
//     (err, result) => {
//       if (err) {
//         console.error("❌ Error inserting sermon:", err.message);
//         return res.status(500).json({ error: "Database error" });
//       }
//       res.json({ id: result.insertId, title, preacher, audioUrl });
//     }
//   );
// });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
