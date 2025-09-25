import React, { useState } from 'react';
import ParentAssignmentView from './ParentAssignmentView';
import ParentMessageView from './ParentMessageView';
import './Dashboard.css';

function ParentDashboard({ user }) {
  const [currentView, setCurrentView] = useState('dashboard');

  // Mock data for child information - later Person 3 will connect to backend
  const [childInfo] = useState({
    name: 'John Doe',
    grade: '10th Grade',
    teacher: 'Mrs. Johnson',
    classroom: 'Room 204',
    studentId: 'STU001'
  });

  const handleViewAssignments = () => {
    setCurrentView('assignments');
  };

  const handleViewMessages = () => {
    setCurrentView('messages');
  };

  const handleViewProgress = () => {
    setCurrentView('progress');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  if (currentView === 'assignments') {
    return <ParentAssignmentView user={user} onBack={handleBackToDashboard} />;
  }

  if (currentView === 'messages') {
    return <ParentMessageView user={user} onBack={handleBackToDashboard} />;
  }

  if (currentView === 'progress') {
    return (
      <div className="dashboard-container">
        <div className="view-header">
          <button className="btn-back" onClick={handleBackToDashboard}>
            ← Back to Dashboard
          </button>
          <h2>Academic Progress</h2>
        </div>
        <p>Progress tracking will be implemented next...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Parent Dashboard</h1>
        <p>Welcome, {user?.name || 'Parent'}!</p>
      </div>
      
      {/* Child Information Card */}
      <div className="child-info-card">
        <h3>👨‍🎓 Child Information</h3>
        <div className="child-details">
          <div className="detail-item">
            <strong>Name:</strong> {childInfo.name}
          </div>
          <div className="detail-item">
            <strong>Grade:</strong> {childInfo.grade}
          </div>
          <div className="detail-item">
            <strong>Teacher:</strong> {childInfo.teacher}
          </div>
          <div className="detail-item">
            <strong>Classroom:</strong> {childInfo.classroom}
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📚 Child's Assignments</h3>
          <p>View your child's assignments, due dates, and progress</p>
          <button className="card-btn" onClick={handleViewAssignments}>
            View Assignments
          </button>
        </div>
        
        <div className="dashboard-card">
          <h3>📧 Teacher Messages</h3>
          <p>Read messages from teachers and provide acknowledgments</p>
          <button className="card-btn" onClick={handleViewMessages}>
            View Messages
          </button>
        </div>
        
        <div className="dashboard-card">
          <h3>📊 Academic Progress</h3>
          <p>Track your child's academic performance and grades</p>
          <button className="card-btn" onClick={handleViewProgress}>
            View Progress
          </button>
        </div>
        
        <div className="dashboard-card">
          <h3>📅 School Calendar</h3>
          <p>View school events, holidays, and important dates</p>
          <button className="card-btn">View Calendar</button>
        </div>
      </div>

      {/* Quick Overview Section */}
      <div className="dashboard-overview">
        <h3>Quick Overview</h3>
        <div className="overview-stats">
          <div className="stat-item">
            <span className="stat-number">5</span>
            <span className="stat-label">Active Assignments</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">3</span>
            <span className="stat-label">New Messages</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">2</span>
            <span className="stat-label">Pending Acknowledgments</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">B+</span>
            <span className="stat-label">Current Grade</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentDashboard;