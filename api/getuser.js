const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();

app.use(cors()); // Enable CORS

// Setup PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// GET one user by ID
app.get('/api/users/:id', async (req, res) => {
  const userid = parseInt(req.params.id);
  
  // Validate that userId is a number
  if (isNaN(userid)) {
    return res.status(400).send('Invalid user ID');
  }

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userid]);

    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    const error = new Error(response.statusText);
    error.response = response;
    error.data = data;
    console.error('Error fetching user:', err);
    res.status(500).send('Server error');
  }
});

module.exports = app;
