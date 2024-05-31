const express = require('express');
const router = express.Router();
const db = require('../db');

// Create a new user
router.post('/', async (req, res) => {
  const { username, password, email, role = 'user' } = req.body;
  const createdAt = new Date();

  try {
    const [rows] = await db.execute(
      'INSERT INTO users (username, password, email, role, created_at) VALUES (?, ?, ?, ?, ?)',
      [username, password, email, role, createdAt]
    );
    res.status(201).json({ id: rows.insertId, username, email, role, createdAt,message:"Data save successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, email, role } = req.body;

  try {
    const [result] = await db.execute(
      'UPDATE users SET username = ?, password = ?, email = ?, role = ? WHERE id = ?',
      [username, password, email, role, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ id, username, email, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await db.execute('DELETE FROM users WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
