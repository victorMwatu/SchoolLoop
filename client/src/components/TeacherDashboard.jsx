import React, { useState } from 'react';
import AssignmentCreate from './AssignmentCreate';
import AssignmentList from './AssignmentList';
import CommunicationCreate from './CommunicationCreate';
import CommunicationList from './CommunicationList';
import './Dashboard.css';

function TeacherDashboard() {
  const [currentView, setCurrentView] = useState('dashboard');

  // Assignment handlers
  const handleManageAssignments = () => {
    setCurrentView('assignments');
  };

  const handleCreateAssignment = () => {
    setCurrentView('create-assignment');
  };

  const handleSaveAssignment = (assignment) => {
    console.log('Assignment saved:', assignment);
    setCurrentView('assignments');
  };

  const handleEditAssignment = (assignmentId) => {
    console.log('Edit assignment:', assignmentId);
  };

  // Communication handlers
  const handleManageCommunication = () => {
    setCurrentView('communication');
  };

  const handleSendMessage = () => {
    setCurrentView('send-message');
  };

  const handleMessageSent = (message) => {
    console.log('Message sent:', message);
    setCurrentView('communication');
  };

  const handleViewMessage = (messageId) => {
    console.log('View message:', messageId);
  };

  // Navigation handlers
  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleBackToAssignments = () => {
    setCurrentView('assignments');
  };

  const handleBackToCommunication = () => {
    setCurrentView('communication');
  };

  // Dashboard view
  if (currentView === 'dashboard') {
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
            <button className="card-btn" onClick={handleManageAssignments}>
              Manage Assignments
            </button>
          </div>
          
          <div className="dashboard-card">
            <h3> Communication</h3>
            <p>Send notes to parents and students</p>
            <button className="card-btn" onClick={handleManageCommunication}>
              Send Messages
            </button>
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

  // Assignment views
  if (currentView === 'assignments') {
    return (
      <div>
        <div style={{ padding: '1rem 2rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          <button onClick={handleBackToDashboard} style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ← Back to Dashboard
          </button>
          <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Assignment Management</span>
        </div>
        <AssignmentList 
          onCreateNew={handleCreateAssignment}
          onEdit={handleEditAssignment}
        />
      </div>
    );
  }

  if (currentView === 'create-assignment') {
    return (
      <div>
        <div style={{ padding: '1rem 2rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          <button onClick={handleBackToAssignments} style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ← Back to Assignments
          </button>
          <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Create New Assignment</span>
        </div>
        <AssignmentCreate 
          onCancel={handleBackToAssignments}
          onSave={handleSaveAssignment}
        />
      </div>
    );
  }

  // Communication views
  if (currentView === 'communication') {
    return (
      <div>
        <div style={{ padding: '1rem 2rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          <button onClick={handleBackToDashboard} style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ← Back to Dashboard
          </button>
          <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Communication Center</span>
        </div>
        <CommunicationList 
          onSendNew={handleSendMessage}
          onView={handleViewMessage}
        />
      </div>
    );
  }

  if (currentView === 'send-message') {
    return (
      <div>
        <div style={{ padding: '1rem 2rem', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd' }}>
          <button onClick={handleBackToCommunication} style={{ marginRight: '1rem', padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
            ← Back to Messages
          </button>
          <span style={{ fontSize: '1.1rem', fontWeight: '500' }}>Send New Message</span>
        </div>
        <CommunicationCreate 
          onCancel={handleBackToCommunication}
          onSend={handleMessageSent}
        />
      </div>
    );
  }

  return null;
}

export default TeacherDashboard;