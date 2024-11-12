require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const helmet = require('helmet');
const csurf = require('csurf');
const cookieParser = require('cookie-parser');
const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(csurf({ cookie: true }));

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.use(express.json());

// Error handler for CSRF token errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).send('Form tampered with');
  } else {
    next(err);
  }
});

app.get('/user', (req, res) => {
  const userId = req.query.userId;
  
  // Secure SQL query
  const query = 'SELECT * FROM users WHERE id = ?';
  
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
