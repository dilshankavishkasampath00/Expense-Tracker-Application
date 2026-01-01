import React, { useState, useEffect } from 'react';
import api from '../api';
import './Dashboard.css';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchExpenses = async () => {
    try {
      const response = await api.get('/expenses');
      setExpenses(response.data);
      calculateTotal(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    }
  };

  const calculateTotal = (expenses) => {
    if (!Array.isArray(expenses) || expenses.length === 0) {
      setTotalExpense(0);
      return;
    }
    const total = expenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount) || 0;
      return sum + amount;
    }, 0);
    setTotalExpense(Number(total.toFixed(2)));
  };

  useEffect(() => {
    fetchExpenses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  if (loading) return <div className="container-main">Loading...</div>;

  return (
    <div className="container-main">
      <h1>Dashboard</h1>
      
      <div className="summary-cards">
        <div className="card summary-card">
          <h3>Total Expenses</h3>
          <p className="amount">${(typeof totalExpense === 'number' ? totalExpense : 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="card">
        <h2>Recent Expenses</h2>
        {expenses.length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.category}</td>
                  <td>{expense.description}</td>
                  <td>${(parseFloat(expense.amount) || 0).toFixed(2)}</td>
                  <td>{new Date(expense.date).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="btn btn-danger" 
                      onClick={() => deleteExpense(expense.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
