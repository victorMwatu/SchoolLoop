import React, { useState } from 'react';
import AssignmentCreate from './AssignmentCreate';
import AssignmentList from './AssignmentList';
import CommunicationCreate from './CommunicationCreate';
import MessageInbox from './MessageInbox';
import './TeacherDashboard.css';

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

    // Sample data for dashboard
  const upcomingAssignments = [
    { id: 1, assignment: 'React Calculator App', class: 'Frontend Development', dueDate: '2025-09-28', status: 'Pending' },
    { id: 2, assignment: 'API Integration Project', class: 'Backend Development', dueDate: '2025-09-30', status: 'Submitted' },
    { id: 3, assignment: 'Data Analysis Report', class: 'Data Science', dueDate: '2025-10-02', status: 'Not Started' },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'New Course Materials Available', date: '2025-09-24', content: 'Updated resources for React development have been uploaded to the portal.' },
    { id: 2, title: 'Upcoming Demo Day', date: '2025-09-23', content: 'Students will present their projects on October 15th. Preparation guidelines attached.' },
    { id: 3, title: 'Code Review Sessions', date: '2025-09-22', content: 'Weekly code review sessions start next Monday. Check the calendar for your slot.' },
  ];

  const navigationItems = [
    { id: 'dashboard', icon: '🏠', label: 'Dashboard', active: true },
    { id: 'classes', icon: '👥', label: 'Classes' },
    { id: 'calendar', icon: '📅', label: 'Calendar' },
    { id: 'assignments', icon: '📝', label: 'Assignments' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'resources', icon: '📚', label: 'Resources' },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Pending': 'status-pending',
      'Submitted': 'status-submitted', 
      'Not Started': 'status-not-started'
    };
    return statusClasses[status] || 'status-pending';
  };

  // Main dashboard layout with sidebar
  return (
    <div className="teacher-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="teacher-profile">
            <div className="profile-avatar">
              <span style={{color: 'white', fontSize: '1.5rem', fontWeight: 'bold'}}>SC</span>
            </div>
            <div className="profile-info">
              <h3>Sarah Chen</h3>
              <p>Senior Instructor</p>
            </div>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          {navigationItems.map((item) => (
            <a 
              key={item.id}
              href="#"
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setCurrentView(item.id);
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {currentView === 'dashboard' && (
          <div className="dashboard-content">
            <div className="content-header">
              <h1>Dashboard</h1>
              <p>Welcome back, Sarah! Here's what's happening with your classes today.</p>
            </div>

            <div className="dashboard-sections">
              {/* Upcoming Assignments Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2>Upcoming Assignments</h2>
                  <button className="btn-secondary">View All</button>
                </div>
                <div className="assignments-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Assignment</th>
                        <th>Class</th>
                        <th>Due Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingAssignments.map((assignment) => (
                        <tr key={assignment.id}>
                          <td>{assignment.assignment}</td>
                          <td>{assignment.class}</td>
                          <td>{assignment.dueDate}</td>
                          <td>
                            <span className={`status-badge ${getStatusBadge(assignment.status)}`}>
                              {assignment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Announcements Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2>Recent Announcements</h2>
                  <button className="btn-secondary">Create New</button>
                </div>
                <div className="announcements-list">
                  {recentAnnouncements.map((announcement) => (
                    <div key={announcement.id} className="announcement-card">
                      <div className="announcement-header">
                        <h3>{announcement.title}</h3>
                        <span className="announcement-date">{announcement.date}</span>
                      </div>
                      <p>{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions Section */}
              <div className="section-card">
                <div className="section-header">
                  <h2>Quick Actions</h2>
                </div>
                <div className="quick-actions">
                  <button 
                    className="btn-primary"
                    onClick={handleCreateAssignment}
                  >
                    Create Assignment
                  </button>
                  <button 
                    className="btn-secondary"
                    onClick={handleSendMessage}
                  >
                    Send Message
                  </button>
                  <button className="btn-secondary">
                    Schedule Class
                  </button>
                  <button className="btn-secondary">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other views */}
        {currentView === 'assignments' && (
          <div className="view-content">
            <div className="content-header">
              <h1>Assignment Management</h1>
              <button onClick={handleBackToDashboard} className="btn-back">
                ← Back to Dashboard
              </button>
            </div>
            <AssignmentList 
              onCreateNew={handleCreateAssignment}
              onEdit={handleEditAssignment}
            />
          </div>
        )}

        {currentView === 'messages' && (
          <div className="view-content">
            <MessageInbox user={user} onBack={handleBackToDashboard} />
          </div>
        )}

        {currentView === 'create-assignment' && (
          <div className="view-content">
            <div className="content-header">
              <h1>Create New Assignment</h1>
              <button onClick={handleBackToAssignments} className="btn-back">
                ← Back to Assignments
              </button>
            </div>
            <AssignmentCreate 
              onCancel={handleBackToAssignments}
              onSave={handleSaveAssignment}
            />
          </div>
        )}

        {currentView === 'send-message' && (
          <div className="view-content">
            <div className="content-header">
              <h1>Send New Message</h1>
              <button onClick={handleBackToCommunication} className="btn-back">
                ← Back to Messages
              </button>
            </div>
            <CommunicationCreate 
              onCancel={handleBackToCommunication}
              onSend={handleMessageSent}
            />
          </div>
        )}

        {/* Default views for other nav items */}
        {['classes', 'calendar', 'resources'].includes(currentView) && (
          <div className="view-content">
            <div className="content-header">
              <h1>{currentView.charAt(0).toUpperCase() + currentView.slice(1)}</h1>
              <button onClick={handleBackToDashboard} className="btn-back">
                ← Back to Dashboard
              </button>
            </div>
            <div className="section-card">
              <p>This section is under development. Coming soon!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherDashboard;