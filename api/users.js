// api/users.js

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

//cors error fix
app.use(cors());

// postgresql connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM users;');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/api/users/:id', async (req, res) => {

  res.send(`testing!`)

  // Validate that userId is a number
  if (isNaN(userid)) {
    return res.status(400).send('Invalid user ID');
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userid]);

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server error');
  }
});

module.exports = app;
