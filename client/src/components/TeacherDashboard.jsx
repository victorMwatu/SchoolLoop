import React from 'react';
import './Dashboard.css';

function TeacherDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <p>Manage your classes, assignments, and communicate with parents</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3> My Classes</h3>
          <p>Manage your classes and students</p>
          <button className="card-btn">View Classes</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Assignments</h3>
          <p>Create and manage assignments</p>
          <button className="card-btn">Manage Assignments</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Communication</h3>
          <p>Send notes to parents and students</p>
          <button className="card-btn">Send Messages</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Progress Reports</h3>
          <p>View student performance</p>
          <button className="card-btn">View Reports</button>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;