function ParentAssignmentView({ user, onBack }) {
  const [assignments, setAssignments] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmingId, setConfirmingId] = useState(null);
  // For demo, assume parent's child is user.child_id or user.childId
  const childId = user?.child_id || user?.childId || 2; // fallback to 2
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
        // Fetch submissions for this child
        const resS = await fetch(`/api/assignment_submissions?student_id=${childId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const submissionsData = await resS.json();
        setSubmissions(submissionsData);
      } catch (err) {
        setAssignments([]);
        setSubmissions([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignmentsAndSubmissions();
  }, [childId]);

  const getSubmissionForAssignment = (assignmentId) =>
    submissions.find(s => s.assignment_id === assignmentId);

  const handleConfirmAssignment = async (submissionId) => {
    setConfirmingId(submissionId);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/parent_confirmations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ submission_id: submissionId })
      });
      // Refresh submissions
      const resS = await fetch(`/api/assignment_submissions?student_id=${childId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const submissionsData = await resS.json();
      setSubmissions(submissionsData);
    } catch (err) {
      alert('Error confirming assignment');
    } finally {
      setConfirmingId(null);
    }
  };

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
            {loading ? (
              <div>Loading assignments...</div>
            ) : assignments.map(assignment => {
              const submission = getSubmissionForAssignment(assignment.id);
              return (
                <div key={assignment.id} className="assignment-item card">
                  <div className="assignment-item-header">
                    <div className="assignment-meta">
                      <span className="subject-icon">{getSubjectIcon(assignment.subject)}</span>
                      <div className="assignment-info">
                        <h3 className="font-semibold text-lg text-gray-800">{assignment.title}</h3>
                        <p className="text-sm text-gray-600">{assignment.subject}</p>
                      </div>
                    </div>
                    <div className="assignment-status">
                      <div className={`assignment-status-badge ${submission?.parent_checked ? 'badge-success' : submission ? 'badge-info' : 'badge-error'}`}>
                        {submission?.parent_checked ? 'Parent Checked' : submission ? 'Submitted' : 'Not Submitted'}
                      </div>
                    </div>
                  </div>
                  <div className="assignment-item-content">
                    <p className="text-gray-700 mb-4">{assignment.description}</p>
                    <div className="assignment-details-grid">
                      <div className="detail-item">
                        <span className="detail-label">Due Date</span>
                        <span className="detail-value">{assignment.due_date ? new Date(assignment.due_date).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="assignment-item-actions">
                    {submission && !submission.parent_checked && (
                      <button className="btn btn-primary btn-sm" disabled={confirmingId === submission.id} onClick={() => handleConfirmAssignment(submission.id)}>
                        {confirmingId === submission.id ? 'Confirming...' : 'Mark as Checked'}
                      </button>
                    )}
                    {submission?.parent_checked && (
                      <span className="parent-confirmed-label">✔️ Checked by Parent</span>
                    )}
                  </div>
                </div>
              );
            })}
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