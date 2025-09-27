import React, { useState, useEffect } from 'react';
import './Assignment.css';

function AssignmentList({ onCreateNew, onEdit }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('/api/assignments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to fetch assignments');
        const data = await res.json();
        setAssignments(data);
      } catch (err) {
        setAssignments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  const getStatusClass = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    if (due < today) return 'status-overdue';
    return 'status-active';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
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
      {loading ? (
        <div>Loading assignments...</div>
      ) : assignments.length === 0 ? (
        <div className="empty-state">
          <p>No assignments created yet.</p>
          <button onClick={onCreateNew} className="btn-create">
            Create Your First Assignment
          </button>
        </div>
      ) : (
        <div className="assignments-grid">
          {assignments.map(assignment => (
            <div key={assignment.id} className="assignment-card">
              <div className="assignment-header">
                <h3>{assignment.title}</h3>
                <span className={`status-badge ${getStatusClass(assignment.due_date)}`}>
                  {assignment.due_date && new Date(assignment.due_date) < new Date() ? 'Overdue' : 'Active'}
                </span>
              </div>
              <div className="assignment-details">
                <p className="subject">{assignment.subject || ''}</p>
                <p className="due-date">Due: {formatDate(assignment.due_date)}</p>
                <p className="description">{assignment.description}</p>
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
      )}
    </div>
  );
}

export default AssignmentList;