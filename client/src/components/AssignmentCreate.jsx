import React, { useState } from 'react';
import './Assignment.css';

function AssignmentCreate({ onCancel, onSave }) {
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    instructions: '',
    attachments: []
  });

  const handleChange = (e) => {
    setAssignment({
      ...assignment,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, we'll just log it. Later Person 3 will connect to backend
    console.log('Creating assignment:', assignment);
    
    // Simulate saving
    if (onSave) {
      onSave(assignment);
    }
    
    // Reset form
    setAssignment({
      title: '',
      description: '',
      subject: '',
      dueDate: '',
      instructions: '',
      attachments: []
    });
  };

  return (
    <div className="assignment-create-container">
      <div className="assignment-form">
        <h2>Create New Assignment</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Assignment Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={assignment.title}
              onChange={handleChange}
              required
              placeholder="e.g., Math Homework Chapter 5"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              name="subject"
              value={assignment.subject}
              onChange={handleChange}
              required
            >
              <option value="">Select Subject</option>
              <option value="math">Mathematics</option>
              <option value="english">English</option>
              <option value="science">Science</option>
              <option value="history">History</option>
              <option value="geography">Geography</option>
              <option value="art">Art</option>
              <option value="pe">Physical Education</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={assignment.dueDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={assignment.description}
              onChange={handleChange}
              required
              rows="3"
              placeholder="Brief description of the assignment..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="instructions">Detailed Instructions:</label>
            <textarea
              id="instructions"
              name="instructions"
              value={assignment.instructions}
              onChange={handleChange}
              rows="5"
              placeholder="Detailed instructions for students..."
            />
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-save">
              Create Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentCreate;