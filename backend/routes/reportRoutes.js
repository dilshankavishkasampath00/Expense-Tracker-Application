const express = require('express');
const router = express.Router();
const pool = require('../config/database');
const verifyToken = require('../middleware/authMiddleware');

// Monthly summary
router.get('/monthly', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(`
      SELECT SUM(amount) as total FROM expenses 
      WHERE user_id = ? AND MONTH(date) = MONTH(NOW()) AND YEAR(date) = YEAR(NOW())
    `, [req.userId]);
    
    connection.release();
    res.json(result[0] || { total: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly report', error: error.message });
  }
});

// Category-wise report
router.get('/category', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(`
      SELECT category, SUM(amount) as amount FROM expenses 
      WHERE user_id = ? GROUP BY category
    `, [req.userId]);
    
    connection.release();
    res.json(result || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching category report', error: error.message });
  }
});

// Income vs Expense
router.get('/income-vs-expense', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) as income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) as expense
      FROM transactions WHERE user_id = ?
    `, [req.userId]);
    
    connection.release();
    res.json(result[0] || { income: 0, expense: 0 });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching income vs expense', error: error.message });
  }
});

// Monthly breakdown
router.get('/monthly-breakdown', verifyToken, async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(`
      SELECT 
        DATE_FORMAT(date, '%Y-%m') as month,
        SUM(amount) as total
      FROM expenses 
      WHERE user_id = ? 
      GROUP BY DATE_FORMAT(date, '%Y-%m')
      ORDER BY month DESC
      LIMIT 12
    `, [req.userId]);
    
    connection.release();
    res.json(result || []);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching monthly breakdown', error: error.message });
  }
});

module.exports = router;
