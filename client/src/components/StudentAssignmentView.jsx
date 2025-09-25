import React, { useState } from 'react';
import './Student.css';

function StudentAssignmentView({ onBack }) {
  // Sample student assignments - later Person 3 will connect to backend
  const [assignments] = useState([
    {
      id: 1,
      title: 'Build a React Calculator App',
      subject: 'Frontend Development',
      teacher: 'Sarah Chen',
      dueDate: '2025-09-28',
      assignedDate: '2025-09-22',
      description: 'Create a fully functional calculator using React with hooks',
      instructions: 'Use functional components, useState hook, handle all basic operations (+, -, *, /). Style with CSS. Deploy to Netlify.',
      status: 'pending',
      priority: 'normal'
    },
    {
      id: 2,
      title: 'API Integration Project',
      subject: 'Backend Development',
      teacher: 'James Mwangi',
      dueDate: '2025-09-30',
      assignedDate: '2025-09-23',
      description: 'Build a REST API using Flask and integrate with a database',
      instructions: 'Create endpoints for CRUD operations. Use PostgreSQL. Include error handling and validation. Write unit tests.',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      title: 'Data Analysis with Python',
      subject: 'Data Science',
      teacher: 'Dr. Grace Njeri',
      dueDate: '2025-09-25',
      assignedDate: '2025-09-20',
      description: 'Analyze sales data and create visualizations using Pandas and Matplotlib',
      instructions: 'Clean the dataset, perform statistical analysis, create 5+ charts. Submit Jupyter notebook.',
      status: 'overdue',
      priority: 'urgent'
    },
    {
      id: 4,
      title: 'Mobile App Prototype',
      subject: 'Mobile Development',
      teacher: 'Kevin Ochieng',
      dueDate: '2025-10-02',
      assignedDate: '2025-09-24',
      description: 'Design and prototype a mobile app using React Native',
      instructions: 'Create wireframes, implement basic navigation, add at least 3 screens. Focus on user experience.',
      status: 'completed',
      priority: 'normal'
    }
  ]);

  const getStatusClass = (status, dueDate) => {
    if (status === 'completed') return 'status-completed';
    if (status === 'overdue') return 'status-overdue';
    
    const today = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue <= 1) return 'status-urgent';
    if (daysUntilDue <= 3) return 'status-soon';
    return 'status-pending';
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntilDue < 0) return 'Overdue';
    if (daysUntilDue === 0) return 'Due Today';
    if (daysUntilDue === 1) return 'Due Tomorrow';
    return `${daysUntilDue} days left`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSubjectIcon = (subject) => {
    const icons = {
      'Frontend Development': '⚛️',
      'Backend Development': '�',
      'Data Science': '�',
      'Mobile Development': '📱',
      'DevOps': '�',
      'Machine Learning': '🤖',
      'Cybersecurity': '🔒',
      'Web Development': '�',
      'Database Design': '🗃️',
      'UI/UX Design': '🎨',
      'Software Engineering': '💻'
    };
    return icons[subject] || '�';
  };

  return (
    <div className="student-view-container">
      <div className="view-header">
        <button onClick={onBack} className="btn-back">
          ← Back to Dashboard
        </button>
        <h2>My Assignments</h2>
      </div>

      <div className="assignments-overview">
        <div className="overview-card pending">
          <h3>{assignments.filter(a => a.status === 'pending').length}</h3>
          <p>Pending</p>
        </div>
        <div className="overview-card completed">
          <h3>{assignments.filter(a => a.status === 'completed').length}</h3>
          <p>Completed</p>
        </div>
        <div className="overview-card overdue">
          <h3>{assignments.filter(a => a.status === 'overdue').length}</h3>
          <p>Overdue</p>
        </div>
      </div>

      <div className="assignments-grid">
        {assignments.map(assignment => (
          <div key={assignment.id} className={`assignment-card ${getStatusClass(assignment.status, assignment.dueDate)}`}>
            <div className="assignment-header">
              <div className="assignment-info">
                <span className="subject-icon">
                  {getSubjectIcon(assignment.subject)}
                </span>
                <div>
                  <h3>{assignment.title}</h3>
                  <p className="subject-teacher">{assignment.subject} - {assignment.teacher}</p>
                </div>
              </div>
              <div className="due-info">
                <span className="due-badge">
                  {getDaysUntilDue(assignment.dueDate)}
                </span>
              </div>
            </div>

            <div className="assignment-content">
              <p className="description">{assignment.description}</p>
              <div className="assignment-details">
                <p><strong>Assigned:</strong> {formatDate(assignment.assignedDate)}</p>
                <p><strong>Due:</strong> {formatDate(assignment.dueDate)}</p>
              </div>
            </div>

            <div className="assignment-actions">
              <button className="btn-view-details">
                View Details
              </button>
              {assignment.status === 'pending' && (
                <button className="btn-submit">
                  Submit Work
                </button>
              )}
              {assignment.status === 'completed' && (
                <button className="btn-view-submission">
                  View Submission
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentAssignmentView;