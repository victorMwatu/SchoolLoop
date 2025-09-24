import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>SchoolLoop</h2>
        </div>
        
        <div className="nav-menu">
          <a href="/" className="nav-link">Home</a>
          {!isLoggedIn && (
            <>
              <a href="/login" className="nav-link">Login</a>
              <a href="/signup" className="nav-link">Sign Up</a>
            </>
          )}
          {isLoggedIn && (
            <button onClick={handleLogout} className="nav-link logout-btn">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
