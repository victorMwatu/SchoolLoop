import React, { useState } from 'react';
import StudentAssignmentView from './StudentAssignmentView';
import MessageInbox from './MessageInbox';
import './StudentDashboard.css';

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

  // Sample data for the dashboard
  const upcomingAssignments = [
    { id: 1, assignment: 'React Calculator App', class: 'Frontend Development', dueDate: '2025-09-28', status: 'In Progress' },
    { id: 2, assignment: 'API Integration Project', class: 'Backend Development', dueDate: '2025-09-30', status: 'Not Started' },
    { id: 3, assignment: 'Data Analysis Report', class: 'Data Science', dueDate: '2025-10-02', status: 'Completed' },
    { id: 4, assignment: 'Mobile App Prototype', class: 'Mobile Development', dueDate: '2025-10-05', status: 'In Progress' },
  ];

  const recentAnnouncements = [
    { id: 1, title: 'New Course Materials Available', date: '2025-09-24', content: 'Updated React development resources have been uploaded.' },
    { id: 2, title: 'Demo Day Approaching', date: '2025-09-23', content: 'Prepare your projects for presentation on October 15th.' },
    { id: 3, title: 'Code Review Sessions', date: '2025-09-22', content: 'Weekly code review sessions start next Monday.' },
  ];

  const subjectProgress = [
    { subject: 'Frontend Development', progress: 85, color: '#2563EB' },
    { subject: 'Backend Development', progress: 72, color: '#059669' },
    { subject: 'Data Science', progress: 90, color: '#DC2626' },
    { subject: 'Mobile Development', progress: 68, color: '#7C2D12' },
    { subject: 'DevOps', progress: 55, color: '#7C3AED' },
  ];

  const navigationItems = [
    { id: 'dashboard', icon: '🏠', label: 'Home', active: true },
    { id: 'assignments', icon: '📝', label: 'Assignments' },
    { id: 'classes', icon: '👥', label: 'Classes' },
    { id: 'calendar', icon: '📅', label: 'Calendar' },
    { id: 'messages', icon: '💬', label: 'Messages' },
    { id: 'settings', icon: '⚙️', label: 'Settings' },
  ];

  const getStatusBadge = (status) => {
    const statusClasses = {
      'In Progress': 'status-in-progress',
      'Not Started': 'status-not-started',
      'Completed': 'status-completed'
    };
    return statusClasses[status] || 'status-in-progress';
  };

  // Main dashboard layout with sidebar
  return (
        <div className="student-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="student-profile">
            <div className="profile-avatar">
              <span style={{color: 'white', fontSize: '1.5rem', fontWeight: 'bold'}}>
                {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
              </span>
            </div>
            <div className="profile-info">
              <h3>{user?.name || 'John Doe'}</h3>
              <p>Student</p>
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
        <div className="dashboard-layout">
          {/* Left Content */}
          <div className="left-content">
            {currentView === 'dashboard' && (
              <div className="dashboard-content">
                <div className="content-header">
                  <h1>Dashboard</h1>
                  <p>Welcome back, {user?.name || 'John'}! Here's your learning progress.</p>
                </div>

                {/* Upcoming Assignments Section */}
                <div className="section-card">
                  <div className="section-header">
                    <h2>Upcoming Assignments</h2>
                    <button 
                      className="btn-secondary"
                      onClick={handleViewAssignments}
                    >
                      View All
                    </button>
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

                {/* Announcements Section */}
                <div className="section-card">
                  <div className="section-header">
                    <h2>Announcements</h2>
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
              </div>
            )}

            {currentView === 'assignments' && (
              <div className="view-content">
                <StudentAssignmentView user={user} onBack={handleBackToDashboard} />
              </div>
            )}

            {currentView === 'messages' && (
              <div className="view-content">
                <MessageInbox user={user} onBack={handleBackToDashboard} />
              </div>
            )}

            {/* Default views for other nav items */}
            {['classes', 'calendar', 'settings'].includes(currentView) && (
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

          {/* Right Progress Panel */}
          {currentView === 'dashboard' && (
            <div className="right-progress">
              <div className="progress-panel">
                <h2>Progress Overview</h2>
                <div className="progress-list">
                  {subjectProgress.map((subject, index) => (
                    <div key={index} className="progress-item">
                      <div className="progress-info">
                        <span className="subject-name">{subject.subject}</span>
                        <span className="progress-percentage">{subject.progress}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ 
                            width: `${subject.progress}%`,
                            backgroundColor: subject.color 
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;