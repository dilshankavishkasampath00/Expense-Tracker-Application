import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation({ onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          💰 Expense Tracker
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/add-expense" className="nav-link">Add Expense</Link>
          </li>
          <li className="nav-item">
            <Link to="/reports" className="nav-link">Reports</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link btn-logout">Logout</button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
