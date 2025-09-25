import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navigation.css';

function Navigation({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user');
    setUser(null);
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
          {!user && (
            <>
              <a href="/login" className="nav-link">Login</a>
              <a href="/signup" className="nav-link">Sign Up</a>
            </>
          )}
          {user && (
            <>
              <span className="user-info">Hello, {user.name} ({user.role})</span>
              <button onClick={handleLogout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
