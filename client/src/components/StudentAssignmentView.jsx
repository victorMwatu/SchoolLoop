import React, { useState, useEffect } from 'react';

function StudentAssignmentView({ user, onBack }) {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState(null);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  // Guard: if user or user.id is missing, show a message and do not fetch
  if (!user || !user.id) {
    return (
      <div className="student-view-container">
        <div className="view-header">
          <button onClick={onBack} className="btn-back">
            ← Back to Dashboard
          </button>
          <h2>My Assignments</h2>
        </div>
        <div className="error-message">
          <p>User information is missing. Please log in again.</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    const fetchAssignmentsAndSubmissions = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        // Fetch assignments
        const resA = await fetch('/api/assignments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const assignmentsData = await resA.json();
        setAssignments(assignmentsData);
        // Fetch submissions for this student
        const userObj = user || JSON.parse(localStorage.getItem('user'));
        const resS = await fetch(`/api/assignment_submissions?student_id=${userObj.id}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const submissionsData = await resS.json();
        if (Array.isArray(submissionsData)) {
          setSubmissions(submissionsData);
        } else {
          setSubmissions([]);
          // Optionally log the error for debugging
          if (submissionsData && submissionsData.error) {
            console.error('Backend error:', submissionsData.error);
          }
        }
      } catch (err) {
        setAssignments([]);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignmentsAndSubmissions();
  }, [user]);

  const getSubmissionForAssignment = (assignmentId) =>
    submissions.find(s => s.assignment_id === assignmentId);

  const handleSubmitAssignment = async (assignmentId) => {
    setSubmittingId(assignmentId);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/assignment_submissions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ assignment_id: assignmentId, content: '' })
      });
      // Refresh submissions
      const userObj = user || JSON.parse(localStorage.getItem('user'));
      const resS = await fetch(`/api/assignment_submissions?student_id=${userObj.id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const submissionsData = await resS.json();
      setSubmissions(submissionsData);
    } catch (err) {
      alert('Error submitting assignment');
    } finally {
      setSubmittingId(null);
    }
  };

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
      'Backend Development': '🖥️',
      'Data Science': '📊',
      'Mobile Development': '📱',
      'DevOps': '🔧',
      'Machine Learning': '🤖',
      'Cybersecurity': '🔒',
      'Web Development': '🌐',
      'Database Design': '🗃️',
      'UI/UX Design': '🎨',
      'Software Engineering': '💻'
    };
    return icons[subject] || '📄';
  };

  return (
    <div className="student-view-container">
      <div className="view-header">
        <button onClick={onBack} className="btn-back">
          ← Back to Dashboard
        </button>
        <h2>My Assignments</h2>
      </div>

      {/* Overview: count by submission status */}
      <div className="assignments-overview">
        <div className="overview-card pending">
          <h3>{assignments.filter(a => !getSubmissionForAssignment(a.id)).length}</h3>
          <p>Pending</p>
        </div>
        <div className="overview-card completed">
          <h3>{assignments.filter(a => getSubmissionForAssignment(a.id)).length}</h3>
          <p>Submitted</p>
        </div>
      </div>

      <div className="assignments-grid">
        {loading ? (
          <div>Loading assignments...</div>
        ) : assignments.map(assignment => {
          const submission = getSubmissionForAssignment(assignment.id);
          return (
            <div key={assignment.id} className={`assignment-card`}>
              <div className="assignment-header">
                <div className="assignment-info">
                  <span className="subject-icon">
                    {getSubjectIcon(assignment.subject)}
                  </span>
                  <div>
                    <h3>{assignment.title}</h3>
                    <p className="subject-teacher">{assignment.subject}</p>
                  </div>
                </div>
                <div className="due-info">
                  <span className="due-badge">
                    {getDaysUntilDue(assignment.due_date)}
                  </span>
                </div>
              </div>
              <div className="assignment-content">
                <p className="description">{assignment.description}</p>
                <div className="assignment-details">
                  <p><strong>Due:</strong> {formatDate(assignment.due_date)}</p>
                </div>
              </div>
              <div className="assignment-actions">
                <button className="btn-view-details" onClick={() => setSelectedAssignment(assignment)}>
                  View Details
                </button>
                {!submission && (
                  <button className="btn-submit" disabled={submittingId === assignment.id} onClick={() => handleSubmitAssignment(assignment.id)}>
                    {submittingId === assignment.id ? 'Submitting...' : 'Mark as Done'}
                  </button>
                )}
                {submission && (
                  <span className="submission-status">Submitted</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for assignment details */}
      {selectedAssignment && (
        <div className="modal-overlay" onClick={() => setSelectedAssignment(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedAssignment(null)}>&times;</button>
            <h2>{selectedAssignment.title}</h2>
            <p><strong>Subject:</strong> {selectedAssignment.subject}</p>
            <p><strong>Description:</strong> {selectedAssignment.description}</p>
            <p><strong>Due Date:</strong> {formatDate(selectedAssignment.due_date)}</p>
            {/* Add more details as needed */}
          </div>
        </div>
      )}
    </div>
  );
}
export default StudentAssignmentView;