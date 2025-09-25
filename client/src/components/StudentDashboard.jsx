import React, { useState } from 'react';
import StudentAssignmentView from './StudentAssignmentView';
import StudentMessageView from './StudentMessageView';
import './Dashboard.css';

function StudentDashboard({ user }) {
  const [currentView, setCurrentView] = useState('dashboard');

  const handleViewAssignments = () => {
    setCurrentView('assignments');
  };

  const handleViewMessages = () => {
    setCurrentView('messages');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'assignments') {
    return <StudentAssignmentView user={user} onBack={handleBackToDashboard} />;
  }

  if (currentView === 'messages') {
    return <StudentMessageView user={user} onBack={handleBackToDashboard} />;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <p>Welcome, {user?.name || 'Student'}!</p>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3> My Assignments</h3>
          <p>View your assignments, due dates, and submit work</p>
          <button className="card-btn" onClick={handleViewAssignments}>
            View Assignments
          </button>
        </div>
        
        <div className="dashboard-card">
          <h3> My Messages</h3>
          <p>Read messages from your teachers and parents</p>
          <button className="card-btn" onClick={handleViewMessages}>
            View Messages
          </button>
        </div>
        
        <div className="dashboard-card">
          <h3> My Progress</h3>
          <p>Track your academic progress and grades</p>
          <button className="card-btn">View Progress</button>
        </div>
        
        <div className="dashboard-card">
          <h3> Schedule</h3>
          <p>View your class schedule and upcoming events</p>
          <button className="card-btn">View Schedule</button>
        </div>
      </div>

      {/* Quick Overview Section */}
      <div className="dashboard-overview">
        <h3>Quick Overview</h3>
        <div className="overview-stats">
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">Pending Assignments</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">New Messages</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">1</span>
            <span className="stat-label">Due Today</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">85%</span>
            <span className="stat-label">Average Grade</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;