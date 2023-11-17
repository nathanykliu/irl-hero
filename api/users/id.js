const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// GET one user by ID
app.get('/api/test/id', async (req, res) => {
  const userid = 1
  
  // make sure that userId is a number
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
