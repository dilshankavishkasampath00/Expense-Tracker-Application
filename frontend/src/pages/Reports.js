import React, { useState, useEffect } from 'react';
import api from '../api';
import './Reports.css';

function Reports() {
  const [monthlyData, setMonthlyData] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [incomeVsExpense, setIncomeVsExpense] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const monthlyRes = await api.get('/reports/monthly');
      const categoryRes = await api.get('/reports/category');
      const incomeRes = await api.get('/reports/income-vs-expense');

      setMonthlyData(monthlyRes.data);
      setCategoryData(categoryRes.data);
      setIncomeVsExpense(incomeRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching reports:', error);
      setLoading(false);
    }
  };

  if (loading) return <div className="container-main">Loading...</div>;

  return (
    <div className="container-main">
      <h1>📊 Reports</h1>

      <div className="reports-grid">
        {monthlyData && (
          <div className="card report-card">
            <h2>Monthly Summary</h2>
            <p className="report-value">${monthlyData.total?.toFixed(2) || '0.00'}</p>
            <small>Current Month Total</small>
          </div>
        )}

        {incomeVsExpense && (
          <div className="card report-card">
            <h2>Income vs Expense</h2>
            <p>Income: <span className="income">${incomeVsExpense.income?.toFixed(2) || '0.00'}</span></p>
            <p>Expense: <span className="expense">${incomeVsExpense.expense?.toFixed(2) || '0.00'}</span></p>
          </div>
        )}
      </div>

      <div className="card">
        <h2>Category-wise Breakdown</h2>
        {categoryData.length === 0 ? (
          <p>No category data available.</p>
        ) : (
          <table className="expenses-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Amount</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              {categoryData.map((item) => {
                const total = categoryData.reduce((sum, cat) => sum + cat.amount, 0);
                const percentage = ((item.amount / total) * 100).toFixed(2);
                return (
                  <tr key={item.category}>
                    <td>{item.category}</td>
                    <td>${item.amount.toFixed(2)}</td>
                    <td>{percentage}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Reports;
