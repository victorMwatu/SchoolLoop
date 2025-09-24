import React from 'react';
import './Dashboard.css';

function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>View your assignments, grades, and communications</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3> My Classes</h3>
          <p>View enrolled classes and schedules</p>
          <button className="card-btn">View Classes</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Assignments</h3>
          <p>See homework and upcoming deadlines</p>
          <button className="card-btn">View Assignments</button>
        </div>
        
        <div className="dashboard-card">
          <h3> My Grades</h3>
          <p>Check your academic progress</p>
          <button className="card-btn">View Grades</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Messages</h3>
          <p>Communications from teachers</p>
          <button className="card-btn">Check Messages</button>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;