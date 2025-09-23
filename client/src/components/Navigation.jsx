import React from 'react';
import './Navigation.css';

function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>🏫 SchoolLoop</h2>
        </div>
        
        <div className="nav-menu">
          <a href="/" className="nav-link">
            Home
          </a>
          <a href="/login" className="nav-link">
            Login
          </a>
          <a href="/signup" className="nav-link">
            Sign Up
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;