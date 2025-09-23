import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome to SchoolLoop</h1>
        <p className="subtitle">Your comprehensive school management platform</p>
        
        <div className="features-grid">
          <div className="feature-card">
            <h3>👨‍🎓 For Students</h3>
            <p>Access your classes, assignments, and grades all in one place.</p>
          </div>
          
          <div className="feature-card">
            <h3>👩‍🏫 For Teachers</h3>
            <p>Manage your classes, create assignments, and track student progress.</p>
          </div>
          
          <div className="feature-card">
            <h3>👨‍👩‍👧‍👦 For Parents</h3>
            <p>Stay updated on your child's academic progress and school activities.</p>
          </div>
        </div>
        
        <div className="cta-section">
          <p>Ready to get started?</p>
          <div className="cta-buttons">
            <a href="/login" className="btn btn-primary">Login</a>
            <a href="/signup" className="btn btn-secondary">Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;