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

// GET one goal by ID
app.get('/api/goals/:id', async (req, res) => {
  const goalid = req.params.id;

  // validate that userId is a number
  if (isNaN(goalid)) {
    return res.status(400).send('Invalid user ID');
  }

  try {
    const result = await pool.query('SELECT * FROM goals WHERE User_id = $1', [goalid]);
    if (result.rows.length === 0) {
      return res.status(404).send('User not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).send('Server error');
  }
});

// PATCH one goal by ID
app.patch('/api/goals/:id', async (req, res) => {
  const goalId = req.params.id;
  const { goals, days, complete, userId } = req.body;

  try {
    // build the SET part of the query based on the provided fields
    const fields = [];
    const values = [];

    if (goals !== undefined) {
      fields.push('goals = $' + (fields.length + 1));
      values.push(goals);
    }

    if (days !== undefined) {
      fields.push('days = $' + (fields.length + 1));
      values.push(days);
    }

    if (complete !== undefined) {
      fields.push('complete = $' + (fields.length + 1));
      values.push(complete);
    }

    if (userId !== undefined) {
      fields.push('user_id = $' + (fields.length + 1));
      values.push(userId);
    }

    if (fields.length === 0) {
      return res.status(400).send('No fields to update');
    }

    const updateQuery = `UPDATE goals SET ${fields.join(', ')} WHERE id = $${fields.length + 1} RETURNING *;`;
    values.push(goalId);

    const { rows } = await pool.query(updateQuery, values);

    if (rows.length === 0) {
      return res.status(404).send('Goal not found');
    }

    res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

//delete one goal by ID
app.delete('/api/goals/:id', async (req, res) => {
  const goalId = req.params.id;

  try {
    const deleteQuery = 'DELETE FROM goals WHERE id = $1 RETURNING *;';
    const { rows } = await pool.query(deleteQuery, [goalId]);

    if (rows.length === 0) {
      return res.status(404).send('Goal not found');
    }

    res.status(200).json({ message: 'Goal deleted successfully', deletedGoal: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


module.exports = app;
