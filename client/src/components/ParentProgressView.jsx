import React, { useState } from 'react';
import './Parent.css';

function ParentProgressView({ user, onBack }) {
  // Mock academic progress data - later Person 3 will connect to backend
  const [progressData] = useState({
    studentInfo: {
      name: 'John Doe',
      grade: '10th Grade',
      studentId: 'STU001',
      semester: 'Fall 2025'
    },
    overallGpa: 3.4,
    subjects: [
      {
        id: 1,
        name: 'Mathematics',
        teacher: 'Mrs. Johnson',
        currentGrade: 'B+',
        percentage: 87,
        assignments: 12,
        completedAssignments: 10,
        trend: 'improving',
        lastUpdated: '2025-09-24',
        recentScores: [85, 88, 91, 89, 87],
        feedback: 'Shows consistent improvement in problem-solving skills'
      },
      {
        id: 2,
        name: 'Science',
        teacher: 'Mr. Davis',
        currentGrade: 'A-',
        percentage: 92,
        assignments: 8,
        completedAssignments: 8,
        trend: 'stable',
        lastUpdated: '2025-09-23',
        recentScores: [94, 90, 93, 91, 92],
        feedback: 'Excellent participation in lab activities'
      },
      {
        id: 3,
        name: 'English Literature',
        teacher: 'Ms. Wilson',
        currentGrade: 'B',
        percentage: 83,
        assignments: 6,
        completedAssignments: 5,
        trend: 'declining',
        lastUpdated: '2025-09-22',
        recentScores: [88, 85, 80, 82, 79],
        feedback: 'Needs to improve essay structure and analysis'
      },
      {
        id: 4,
        name: 'History',
        teacher: 'Mr. Brown',
        currentGrade: 'B+',
        percentage: 86,
        assignments: 7,
        completedAssignments: 6,
        trend: 'improving',
        lastUpdated: '2025-09-21',
        recentScores: [82, 84, 87, 88, 89],
        feedback: 'Great research skills and historical analysis'
      },
      {
        id: 5,
        name: 'French',
        teacher: 'Mme. Martin',
        currentGrade: 'A',
        percentage: 95,
        assignments: 10,
        completedAssignments: 10,
        trend: 'stable',
        lastUpdated: '2025-09-20',
        recentScores: [96, 94, 95, 97, 93],
        feedback: 'Outstanding pronunciation and vocabulary retention'
      }
    ],
    attendanceRate: 96,
    upcomingTests: [
      { subject: 'Mathematics', date: '2025-09-28', type: 'Chapter Test' },
      { subject: 'Science', date: '2025-09-30', type: 'Lab Practical' },
      { subject: 'History', date: '2025-10-02', type: 'Unit Exam' }
    ]
  });

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return '#28a745'; // Green for A
    if (percentage >= 80) return '#007bff'; // Blue for B
    if (percentage >= 70) return '#ffc107'; // Yellow for C
    if (percentage >= 60) return '#fd7e14'; // Orange for D
    return '#dc3545'; // Red for F
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'improving': return '📈';
      case 'declining': return '📉';
      case 'stable': return '➡️';
      default: return '➡️';
    }
  };

  const getTrendClass = (trend) => {
    switch (trend) {
      case 'improving': return 'trend-improving';
      case 'declining': return 'trend-declining';
      case 'stable': return 'trend-stable';
      default: return 'trend-stable';
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

  const calculateOverallStats = () => {
    const totalAssignments = progressData.subjects.reduce((sum, subject) => sum + subject.assignments, 0);
    const completedAssignments = progressData.subjects.reduce((sum, subject) => sum + subject.completedAssignments, 0);
    const averageGrade = Math.round(progressData.subjects.reduce((sum, subject) => sum + subject.percentage, 0) / progressData.subjects.length);
    
    return {
      totalAssignments,
      completedAssignments,
      averageGrade,
      completionRate: Math.round((completedAssignments / totalAssignments) * 100)
    };
  };

  const stats = calculateOverallStats();

  const handleContactTeacher = (teacherName, subject) => {
    alert(`Feature to contact ${teacherName} about ${subject} will be implemented in the inbox system.`);
  };

  return (
    <div className="parent-view-container">
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h2>Academic Progress</h2>
      </div>

      {/* Student Info Header */}
      <div className="progress-header">
        <div className="student-summary">
          <h3>{progressData.studentInfo.name}</h3>
          <p>{progressData.studentInfo.grade} • {progressData.studentInfo.semester}</p>
          <p>Student ID: {progressData.studentInfo.studentId}</p>
        </div>
        <div className="overall-gpa">
          <div className="gpa-display">
            <span className="gpa-number">{progressData.overallGpa}</span>
            <span className="gpa-label">Overall GPA</span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="progress-overview">
        <div className="overview-card">
          <h3>{stats.averageGrade}%</h3>
          <p>Average Grade</p>
        </div>
        <div className="overview-card">
          <h3>{stats.completedAssignments}/{stats.totalAssignments}</h3>
          <p>Assignments Completed</p>
        </div>
        <div className="overview-card">
          <h3>{stats.completionRate}%</h3>
          <p>Completion Rate</p>
        </div>
        <div className="overview-card">
          <h3>{progressData.attendanceRate}%</h3>
          <p>Attendance Rate</p>
        </div>
      </div>

      {/* Subject Progress Cards */}
      <div className="subjects-grid">
        {progressData.subjects.map(subject => (
          <div key={subject.id} className="subject-progress-card">
            <div className="subject-header">
              <div className="subject-info">
                <span className="subject-icon">{getSubjectIcon(subject.name)}</span>
                <div>
                  <h3>{subject.name}</h3>
                  <p className="teacher-name">{subject.teacher}</p>
                </div>
              </div>
              <div className="grade-display">
                <span 
                  className="current-grade"
                  style={{ color: getGradeColor(subject.percentage) }}
                >
                  {subject.currentGrade}
                </span>
                <span className="percentage">{subject.percentage}%</span>
              </div>
            </div>

            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${subject.percentage}%`,
                  backgroundColor: getGradeColor(subject.percentage)
                }}
              ></div>
            </div>

            <div className="subject-stats">
              <div className="stat-item">
                <span>Assignments:</span>
                <span>{subject.completedAssignments}/{subject.assignments}</span>
              </div>
              <div className="stat-item">
                <span>Trend:</span>
                <span className={getTrendClass(subject.trend)}>
                  {getTrendIcon(subject.trend)} {subject.trend}
                </span>
              </div>
              <div className="stat-item">
                <span>Updated:</span>
                <span>{new Date(subject.lastUpdated).toLocaleDateString()}</span>
              </div>
            </div>

            {subject.feedback && (
              <div className="teacher-feedback">
                <strong>Teacher Feedback:</strong>
                <p>{subject.feedback}</p>
              </div>
            )}

            <div className="recent-scores">
              <strong>Recent Scores:</strong>
              <div className="scores-list">
                {subject.recentScores.map((score, index) => (
                  <span key={index} className="score-badge" style={{ backgroundColor: getGradeColor(score) }}>
                    {score}
                  </span>
                ))}
              </div>
            </div>

            <div className="subject-actions">
              <button 
                className="btn-contact-teacher"
                onClick={() => handleContactTeacher(subject.teacher, subject.name)}
              >
                Contact {subject.teacher}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Upcoming Tests Section */}
      <div className="upcoming-tests">
        <h3>Upcoming Tests & Exams</h3>
        <div className="tests-list">
          {progressData.upcomingTests.map((test, index) => (
            <div key={index} className="test-item">
              <div className="test-info">
                <span className="test-subject">{getSubjectIcon(test.subject)} {test.subject}</span>
                <span className="test-type">{test.type}</span>
              </div>
              <div className="test-date">
                {new Date(test.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ParentProgressView;