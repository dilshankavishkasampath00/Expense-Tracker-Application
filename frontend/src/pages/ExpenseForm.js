import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './ExpenseForm.css';

function ExpenseForm() {
  const [formData, setFormData] = useState({
    category: 'Food',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const categories = ['Food', 'Travel', 'Rent', 'Entertainment', 'Utilities', 'Healthcare', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/expenses', formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add expense');
    }
  };

  return (
    <div className="container-main">
      <div className="form-card">
        <h1>Add New Expense</h1>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Category</label>
            <select 
              name="category" 
              value={formData.category} 
              onChange={handleChange}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Amount ($)</label>
            <input 
              type="number" 
              name="amount" 
              value={formData.amount} 
              onChange={handleChange}
              step="0.01"
              min="0"
              required 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange}
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{width: '100%'}}>
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
}

export default ExpenseForm;
