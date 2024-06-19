// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

// PostgreSQL pool
const pool = new Pool({
  user: 'your_db_user', // replace with your PostgreSQL username
  host: 'localhost',
  database: 'todo_app',
  password: 'your_db_password', // replace with your PostgreSQL password
  port: 5432,
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
// GET all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM tasks ORDER BY id');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching tasks', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST new task
app.post('/api/tasks', async (req, res) => {
  const { task_description } = req.body;
  try {
    const { rows } = await pool.query(
      'INSERT INTO tasks (task_description, completed) VALUES ($1, $2) RETURNING *',
      [task_description, false]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error('Error adding task', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE task by ID
app.delete('/api/tasks/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    res.status(204).end();
  } catch (err) {
    console.error('Error deleting task', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
