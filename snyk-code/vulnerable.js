const express = require('express');
const mysql = require('mysql');
const app = express();

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_db'
});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.use(express.json());

app.get('/user', (req, res) => {
  const userId = req.query.userId;

  const query = `SELECT * FROM users WHERE id = '${userId}'`;

  connection.query(query, (err, results) => {
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
