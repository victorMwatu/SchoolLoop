import React from 'react';
import './Dashboard.css';

function ParentDashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Parent Dashboard</h1>
        <p>Monitor your child's academic progress and school communications</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3> My Children</h3>
          <p>View your children's profiles</p>
          <button className="card-btn">View Children</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Assignments</h3>
          <p>See your child's homework and deadlines</p>
          <button className="card-btn">View Assignments</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Academic Progress</h3>
          <p>Track grades and performance</p>
          <button className="card-btn">View Progress</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Communications</h3>
          <p>Messages from teachers and school</p>
          <button className="card-btn">Check Messages</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Acknowledgements</h3>
          <p>Notes requiring your signature</p>
          <button className="card-btn">View Pending</button>
        </div>
        
        <div className="dashboard-card">
          <h3> School Events</h3>
          <p>Upcoming events and meetings</p>
          <button className="card-btn">View Events</button>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;