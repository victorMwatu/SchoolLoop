import React, { useState } from 'react';
import './Student.css';

function StudentAssignmentView({ onBack }) {
  // Sample student assignments - later Person 3 will connect to backend
  const [assignments] = useState([
    {
      id: 1,
      title: 'Math Homework Chapter 5',
      subject: 'Mathematics',
      teacher: 'Mrs. Johnson',
      dueDate: '2025-09-28',
      assignedDate: '2025-09-22',
      description: 'Complete exercises 1-20 from Chapter 5',
      instructions: 'Show all work clearly. Use pencil and paper.',
      status: 'pending',
      priority: 'normal'
    },
    {
      id: 2,
      title: 'Science Lab Report',
      subject: 'Science',
      teacher: 'Mr. Davis',
      dueDate: '2025-09-30',
      assignedDate: '2025-09-23',
      description: 'Write a lab report on the photosynthesis experiment',
      instructions: 'Include hypothesis, method, results, and conclusion.',
      status: 'pending',
      priority: 'high'
    },
    {
      id: 3,
      title: 'English Essay',
      subject: 'English',
      teacher: 'Ms. Smith',
      dueDate: '2025-09-25',
      assignedDate: '2025-09-20',
      description: 'Write a 500-word essay on "My Hero"',
      instructions: 'Use proper grammar and cite sources if needed.',
      status: 'overdue',
      priority: 'urgent'
    },
    {
      id: 4,
      title: 'History Timeline',
      subject: 'History',
      teacher: 'Mr. Brown',
      dueDate: '2025-10-02',
      assignedDate: '2025-09-24',
      description: 'Create a timeline of World War II events',
      instructions: 'Include at least 10 major events with dates.',
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
      'Mathematics': '🔢',
      'Science': '🔬',
      'English': '📚',
      'History': '🏛️',
      'Geography': '🌍',
      'Art': '🎨',
      'Physical Education': '⚽'
    };
    return icons[subject] || '📖';
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