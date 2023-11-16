// api/goals.js

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

app.get('/api/goals', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM goals;');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = app;
