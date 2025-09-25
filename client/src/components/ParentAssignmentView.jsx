import React, { useState } from 'react';
import './Parent.css';
import './ParentDashboard.css';
import '../styles/design-system.css';

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
    <div className="parent-dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <div className="header-content">
          <h1 className="font-heading font-bold text-4xl text-gray-800">Child's Academic Overview</h1>
          <p className="text-lg text-gray-600">Track your child's assignments, progress, and communication</p>
        </div>
      </div>

      {/* Quick Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card pending">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold text-gray-800">{pendingAssignments}</h3>
            <p className="text-sm text-gray-600">Pending Assignments</p>
            <div className="stat-badge badge-warning">Needs Attention</div>
          </div>
        </div>
        
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold text-gray-800">{completedAssignments}</h3>
            <p className="text-sm text-gray-600">Completed</p>
            <div className="stat-badge badge-success">Great Job!</div>
          </div>
        </div>
        
        <div className="stat-card overdue">
          <div className="stat-icon">⚠️</div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold text-gray-800">{overdueAssignments}</h3>
            <p className="text-sm text-gray-600">Overdue</p>
            {overdueAssignments > 0 && <div className="stat-badge badge-error">Action Required</div>}
          </div>
        </div>
        
        <div className="stat-card grade">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3 className="text-2xl font-bold text-gray-800">{averageGrade}%</h3>
            <p className="text-sm text-gray-600">Average Grade</p>
            <div className={`stat-badge ${averageGrade >= 80 ? 'badge-success' : averageGrade >= 70 ? 'badge-warning' : 'badge-error'}`}>
              {averageGrade >= 80 ? 'Excellent' : averageGrade >= 70 ? 'Good' : 'Needs Improvement'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="dashboard-content-grid">
        {/* Assignments Section */}
        <div className="content-section">
          <div className="section-header">
            <h2 className="font-heading font-semibold text-2xl text-gray-800">Current Assignments</h2>
            <span className="text-sm text-gray-500">{assignments.length} total assignments</span>
          </div>
          
          <div className="assignments-list">
            {assignments.map(assignment => (
              <div key={assignment.id} className="assignment-item card">
                <div className="assignment-item-header">
                  <div className="assignment-meta">
                    <span className="subject-icon">{getSubjectIcon(assignment.subject)}</span>
                    <div className="assignment-info">
                      <h3 className="font-semibold text-lg text-gray-800">{assignment.title}</h3>
                      <p className="text-sm text-gray-600">{assignment.subject} • {assignment.teacher}</p>
                    </div>
                  </div>
                  <div className="assignment-status">
                    <div className={`assignment-status-badge ${assignment.submissionStatus === 'completed' ? 'badge-success' : 
                      assignment.submissionStatus === 'submitted' ? 'badge-info' : 
                      assignment.submissionStatus === 'in_progress' ? 'badge-warning' : 'badge-error'}`}>
                      {getSubmissionStatusText(assignment.submissionStatus)}
                    </div>
                  </div>
                </div>

                <div className="assignment-item-content">
                  <p className="text-gray-700 mb-4">{assignment.description}</p>
                  
                  <div className="assignment-details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Due Date</span>
                      <span className={`detail-value ${assignment.status === 'overdue' ? 'text-red-600 font-medium' : 
                        assignment.status === 'urgent' ? 'text-orange-600 font-medium' : 'text-gray-700'}`}>
                        {new Date(assignment.dueDate).toLocaleDateString()}
                        <span className="text-xs block text-gray-500">{getDaysUntilDue(assignment.dueDate)}</span>
                      </span>
                    </div>
                    
                    <div className="detail-item">
                      <span className="detail-label">Points</span>
                      <span className="detail-value">{assignment.points} pts</span>
                    </div>
                    
                    {assignment.grade && (
                      <div className="detail-item">
                        <span className="detail-label">Grade</span>
                        <span className={`detail-value font-semibold ${assignment.grade >= 80 ? 'text-green-600' : 
                          assignment.grade >= 70 ? 'text-yellow-600' : 'text-red-600'}`}>
                          {assignment.grade}/{assignment.points} ({Math.round((assignment.grade/assignment.points)*100)}%)
                        </span>
                      </div>
                    )}
                  </div>

                  {assignment.feedback && (
                    <div className="teacher-feedback-box">
                      <h4 className="feedback-label">Teacher Feedback</h4>
                      <p className="feedback-text">{assignment.feedback}</p>
                    </div>
                  )}
                </div>

                <div className="assignment-item-actions">
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleViewDetails(assignment)}
                  >
                    View Full Details
                  </button>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => handleContactTeacher(assignment.teacher, assignment.subject)}
                  >
                    Contact {assignment.teacher.split(' ')[1]}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {assignments.length === 0 && (
            <div className="empty-state-card card">
              <div className="empty-icon">📚</div>
              <h3 className="font-semibold text-lg text-gray-700 mb-2">No assignments yet</h3>
              <p className="text-gray-500">Your child's assignments will appear here once teachers post them.</p>
            </div>
          )}
        </div>

        {/* Quick Actions Sidebar */}
        <div className="sidebar-section">
          <div className="quick-actions-card card">
            <h3 className="font-heading font-semibold text-lg text-gray-800 mb-4">Quick Actions</h3>
            <div className="actions-list">
              <button className="action-button">
                <span className="action-icon">💬</span>
                <span>Message Teachers</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📊</span>
                <span>View Progress Report</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📅</span>
                <span>School Calendar</span>
              </button>
              <button className="action-button">
                <span className="action-icon">📋</span>
                <span>Download Summary</span>
              </button>
            </div>
          </div>

          <div className="upcoming-deadlines-card card">
            <h3 className="font-heading font-semibold text-lg text-gray-800 mb-4">Upcoming Deadlines</h3>
            <div className="deadlines-list">
              {assignments
                .filter(a => a.status !== 'completed' && a.status !== 'overdue')
                .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                .slice(0, 3)
                .map(assignment => (
                <div key={assignment.id} className="deadline-item">
                  <div className="deadline-dot"></div>
                  <div className="deadline-content">
                    <p className="font-medium text-sm text-gray-800">{assignment.title}</p>
                    <p className="text-xs text-gray-500">{getDaysUntilDue(assignment.dueDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentAssignmentView;