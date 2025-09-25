import React, { useState } from 'react';
import './Parent.css';

function ParentAssignmentView({ user, onBack }) {
  // Sample assignments data - later Person 3 will connect to backend
  const [assignments] = useState([
    {
      id: 1,
      title: 'Math Homework Chapter 5',
      subject: 'Mathematics',
      teacher: 'Mrs. Johnson',
      assignedDate: '2025-09-20',
      dueDate: '2025-09-27',
      status: 'pending',
      description: 'Complete exercises 1-15 on page 87. Show all work and include explanations for word problems.',
      points: 50,
      submissionStatus: 'not_submitted',
      grade: null,
      feedback: null,
      priority: 'normal'
    },
    {
      id: 2,
      title: 'Science Lab Report - Photosynthesis',
      subject: 'Science',
      teacher: 'Mr. Davis',
      assignedDate: '2025-09-18',
      dueDate: '2025-09-26',
      status: 'urgent', // Due tomorrow
      description: 'Write a detailed lab report on the photosynthesis experiment. Include hypothesis, methodology, results, and conclusion.',
      points: 75,
      submissionStatus: 'not_submitted',
      grade: null,
      feedback: null,
      priority: 'high'
    },
    {
      id: 3,
      title: 'English Essay - Character Analysis',
      subject: 'English Literature',
      teacher: 'Ms. Wilson',
      assignedDate: '2025-09-15',
      dueDate: '2025-09-22',
      status: 'overdue',
      description: 'Write a 500-word character analysis of the protagonist in "To Kill a Mockingbird". Focus on character development and key themes.',
      points: 100,
      submissionStatus: 'submitted',
      grade: 85,
      feedback: 'Good analysis, but could use more specific examples from the text.',
      priority: 'high'
    },
    {
      id: 4,
      title: 'History Project - World War II Timeline',
      subject: 'History',
      teacher: 'Mr. Brown',
      assignedDate: '2025-09-10',
      dueDate: '2025-09-30',
      status: 'pending',
      description: 'Create a detailed timeline of major World War II events with explanations and visual elements.',
      points: 150,
      submissionStatus: 'in_progress',
      grade: null,
      feedback: null,
      priority: 'normal'
    },
    {
      id: 5,
      title: 'French Vocabulary Quiz Prep',
      subject: 'French',
      teacher: 'Mme. Martin',
      assignedDate: '2025-09-23',
      dueDate: '2025-09-28',
      status: 'completed',
      description: 'Study vocabulary list for Unit 3. Quiz will cover 50 words and phrases.',
      points: 25,
      submissionStatus: 'completed',
      grade: 92,
      feedback: 'Excellent work! Keep practicing pronunciation.',
      priority: 'normal'
    }
  ]);

  const getStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'status-completed';
      case 'pending': return 'status-pending';
      case 'overdue': return 'status-overdue';
      case 'urgent': return 'status-urgent';
      default: return 'status-pending';
    }
  };

  const getSubmissionStatusText = (submissionStatus) => {
    switch (submissionStatus) {
      case 'not_submitted': return 'Not Submitted';
      case 'submitted': return 'Submitted';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const getSubjectIcon = (subject) => {
    switch (subject.toLowerCase()) {
      case 'mathematics': return '🔢';
      case 'science': return '🔬';
      case 'english literature': return '📚';
      case 'history': return '🏛️';
      case 'french': return '🇫🇷';
      default: return '📝';
    }
  };

  const getDaysUntilDue = (dueDate) => {
    const today = new Date('2025-09-25'); // Current date
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  // Calculate overview statistics
  const pendingAssignments = assignments.filter(a => a.status === 'pending' || a.status === 'urgent').length;
  const completedAssignments = assignments.filter(a => a.status === 'completed').length;
  const overdueAssignments = assignments.filter(a => a.status === 'overdue').length;
  const totalAssignments = assignments.length;

  // Calculate average grade
  const gradedAssignments = assignments.filter(a => a.grade !== null);
  const averageGrade = gradedAssignments.length > 0 
    ? Math.round(gradedAssignments.reduce((sum, a) => sum + a.grade, 0) / gradedAssignments.length)
    : 0;

  const handleContactTeacher = (teacherName, subject) => {
    alert(`Feature to contact ${teacherName} about ${subject} will be implemented in the inbox system.`);
  };

  const handleViewDetails = (assignment) => {
    alert(`Detailed view for "${assignment.title}" will be implemented next.`);
  };

  return (
    <div className="parent-view-container">
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h2>Child's Assignments</h2>
      </div>

      {/* Overview Cards */}
      <div className="assignments-overview">
        <div className="overview-card pending">
          <h3>{pendingAssignments}</h3>
          <p>Pending Assignments</p>
        </div>
        <div className="overview-card completed">
          <h3>{completedAssignments}</h3>
          <p>Completed Assignments</p>
        </div>
        <div className="overview-card overdue">
          <h3>{overdueAssignments}</h3>
          <p>Overdue Assignments</p>
        </div>
        <div className="overview-card total">
          <h3>{totalAssignments}</h3>
          <p>Total Assignments</p>
        </div>
        <div className="overview-card grade">
          <h3>{averageGrade}%</h3>
          <p>Average Grade</p>
        </div>
      </div>

      {/* Assignments Grid */}
      <div className="assignments-grid">
        {assignments.map(assignment => (
          <div key={assignment.id} className={`assignment-card ${getStatusClass(assignment.status)}`}>
            <div className="assignment-header">
              <div className="assignment-info">
                <span className="subject-icon">{getSubjectIcon(assignment.subject)}</span>
                <div>
                  <h3>{assignment.title}</h3>
                  <p className="subject-teacher">{assignment.subject} - {assignment.teacher}</p>
                </div>
              </div>
              <div className="due-info">
                <span className="due-badge">{getDaysUntilDue(assignment.dueDate)}</span>
                <div className="status-info">
                  <span className="submission-status">{getSubmissionStatusText(assignment.submissionStatus)}</span>
                  {assignment.grade && (
                    <span className="grade">{assignment.grade}/{assignment.points}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="assignment-content">
              <div className="description">{assignment.description}</div>
              
              <div className="assignment-details">
                <p><strong>Assigned:</strong> {new Date(assignment.assignedDate).toLocaleDateString()}</p>
                <p><strong>Due:</strong> {new Date(assignment.dueDate).toLocaleDateString()}</p>
                <p><strong>Points:</strong> {assignment.points}</p>
              </div>

              {assignment.feedback && (
                <div className="teacher-feedback">
                  <strong>Teacher Feedback:</strong>
                  <p>{assignment.feedback}</p>
                </div>
              )}
            </div>

            <div className="assignment-actions">
              <button 
                className="btn-view-details"
                onClick={() => handleViewDetails(assignment)}
              >
                View Details
              </button>
              <button 
                className="btn-contact-teacher"
                onClick={() => handleContactTeacher(assignment.teacher, assignment.subject)}
              >
                Contact Teacher
              </button>
            </div>
          </div>
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="empty-state">
          <p>No assignments found.</p>
          <p>Check back later for new assignments.</p>
        </div>
      )}
    </div>
  );
}

export default ParentAssignmentView;