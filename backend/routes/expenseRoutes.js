const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const verifyToken = require('../middleware/authMiddleware');

// Get all expenses for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [expenses] = await connection.query(
      'SELECT * FROM expenses WHERE user_id = ? ORDER BY date DESC',
      [req.userId]
    );
    connection.release();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error: error.message });
  }
});

// Add expense
router.post('/', verifyToken, async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    
    // Validate input
    if (!category || !amount || !date) {
      return res.status(400).json({ message: 'Category, amount, and date are required' });
    }

    const connection = await pool.getConnection();
    const result = await connection.query(
      'INSERT INTO expenses (user_id, category, amount, description, date) VALUES (?, ?, ?, ?, ?)',
      [req.userId, category, amount, description || '', date]
    );
    
    connection.release();
    res.status(201).json({ 
      message: 'Expense added successfully',
      id: result[0].insertId
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
});

// Update expense
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { category, amount, description, date } = req.body;
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    
    // Verify ownership
    const [expense] = await connection.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (expense.length === 0) {
      connection.release();
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await connection.query(
      'UPDATE expenses SET category = ?, amount = ?, description = ?, date = ? WHERE id = ?',
      [category, amount, description || '', date, id]
    );
    
    connection.release();
    res.json({ message: 'Expense updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating expense', error: error.message });
  }
});

// Delete expense
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    
    // Verify ownership
    const [expense] = await connection.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (expense.length === 0) {
      connection.release();
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await connection.query('DELETE FROM expenses WHERE id = ?', [id]);
    connection.release();
    
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error: error.message });
  }
});

// Get expense by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    const [expenses] = await connection.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [id, req.userId]
    );

    if (expenses.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Expense not found' });
    }

    connection.release();
    res.json(expenses[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expense', error: error.message });
  }
});

module.exports = router;
