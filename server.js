// index.js

// Load environment variables
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Redirect HTTP to HTTPS (optional for Render)
app.use((req, res, next) => {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect('https://' + req.headers.host + req.url);
  }
  next();
});

// MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // e.g. mysql.hostinger.com
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection error:', err.message);
  } else {
    console.log('✅ Connected to MySQL database');
  }
});

// Basic test route
app.get('/', (req, res) => {
  res.send('API is running');
});

// Example: Get all users from 'users' table
app.get('/sermon', (req, res) => {
  db.query('SELECT * FROM sermon_records', (err, results) => {
    if (err) {
      console.error('Error fetching sermon records:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


app.get('/articles', (req, res) => {
  db.query('SELECT * FROM articles', (err, results) => {
    if (err) {
      console.error('Error fetching sermon records:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});


// Example: Create a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const sql = 'INSERT INTO users (name, email) VALUES (?, ?)';
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User added', id: result.insertId });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
