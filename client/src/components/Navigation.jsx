import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

function Navigation() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>🏫 SchoolLoop</h2>
        </div>
        
        <div className="nav-menu">
          <a href="/" className="nav-link">Home</a>
          
          {user ? (
            <>
              <span className="user-info">Hello, {user.name} ({user.role})</span>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <a href="/login" className="nav-link">Login</a>
              <a href="/signup" className="nav-link">Sign Up</a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;