import React, { useState } from 'react';
import './Assignment.css';

function AssignmentList({ onCreateNew, onEdit }) {
  // Sample data - later Person 3 will connect this to real backend data
  const [assignments] = useState([
    {
      id: 1,
      title: 'Math Homework Chapter 5',
      subject: 'Mathematics',
      dueDate: '2025-09-28',
      description: 'Complete exercises 1-20 from Chapter 5',
      status: 'active',
      submissionsCount: 15,
      totalStudents: 25
    },
    {
      id: 2,
      title: 'Science Lab Report',
      subject: 'Science',
      dueDate: '2025-09-30',
      description: 'Write a lab report on the photosynthesis experiment',
      status: 'active',
      submissionsCount: 8,
      totalStudents: 25
    },
    {
      id: 3,
      title: 'English Essay',
      subject: 'English',
      dueDate: '2025-09-25',
      description: 'Write a 500-word essay on "My Hero"',
      status: 'overdue',
      submissionsCount: 20,
      totalStudents: 25
    }
  ]);

  const getStatusClass = (status, dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    
    if (due < today && status !== 'completed') {
      return 'status-overdue';
    }
    if (status === 'completed') {
      return 'status-completed';
    }
    return 'status-active';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="assignment-list-container">
      <div className="list-header">
        <h2>My Assignments</h2>
        <button onClick={onCreateNew} className="btn-create">
          + Create New Assignment
        </button>
      </div>

      <div className="assignments-grid">
        {assignments.map(assignment => (
          <div key={assignment.id} className="assignment-card">
            <div className="assignment-header">
              <h3>{assignment.title}</h3>
              <span className={`status-badge ${getStatusClass(assignment.status, assignment.dueDate)}`}>
                {assignment.status}
              </span>
            </div>

            <div className="assignment-details">
              <p className="subject">📚 {assignment.subject}</p>
              <p className="due-date">📅 Due: {formatDate(assignment.dueDate)}</p>
              <p className="description">{assignment.description}</p>
            </div>

            <div className="assignment-stats">
              <div className="stat">
                <span className="stat-number">{assignment.submissionsCount}</span>
                <span className="stat-label">Submissions</span>
              </div>
              <div className="stat">
                <span className="stat-number">{assignment.totalStudents}</span>
                <span className="stat-label">Total Students</span>
              </div>
            </div>

            <div className="assignment-actions">
              <button 
                onClick={() => onEdit && onEdit(assignment.id)} 
                className="btn-edit"
              >
                Edit
              </button>
              <button className="btn-view">
                View Submissions
              </button>
              <button className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="empty-state">
          <p>No assignments created yet.</p>
          <button onClick={onCreateNew} className="btn-create">
            Create Your First Assignment
          </button>
        </div>
      )}
    </div>
  );
}

export default AssignmentList;