import React, { useState } from 'react';
import './Assignment.css';
import './AssignmentCreate.css';
import '../styles/design-system.css';


// NOTE: You may want to pass classroomId and user (teacher) as props for real use
function AssignmentCreate({ onCancel, onSave, classroomId = 1 }) {
  const [assignment, setAssignment] = useState({
    title: '',
    description: '',
    subject: '',
    dueDate: '',
    instructions: '',
    points: 100,
    priority: 'medium',
    allowLateSubmission: true,
    attachments: []
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!assignment.title.trim()) {
      newErrors.title = 'Assignment title is required';
    }
    
    if (!assignment.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    if (!assignment.dueDate) {
      newErrors.dueDate = 'Due date is required';
    }
    
    if (!assignment.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (assignment.points <= 0) {
      newErrors.points = 'Points must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAssignment({
      ...assignment,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const payload = {
        title: assignment.title,
        description: assignment.description,
        due_date: assignment.dueDate,
        classroom_id: classroomId
      };
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Failed to create assignment');
      const assignmentId = await res.json();
      if (onSave) onSave({ ...assignment, id: assignmentId });
      setAssignment({
        title: '',
        description: '',
        subject: '',
        dueDate: '',
        instructions: '',
        points: 100,
        priority: 'medium',
        allowLateSubmission: true,
        attachments: []
      });
    } catch (error) {
      alert('Error creating assignment: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="assignment-create-wrapper">
      <div className="assignment-create-container">
        {/* Header */}
        <div className="form-header">
          <div className="header-content">
            <h1 className="font-heading font-bold text-3xl text-gray-800">Create New Assignment</h1>
            <p className="text-lg text-gray-600">Design engaging assignments for your students</p>
          </div>
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            ← Back to Dashboard
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="assignment-form-card">
          <div className="form-grid">
            
            {/* Basic Information Section */}
            <div className="form-section">
              <h2 className="section-title">Basic Information</h2>
              
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Assignment Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={assignment.title}
                  onChange={handleChange}
                  className={`form-input ${errors.title ? 'error' : ''}`}
                  placeholder="e.g., Chapter 5: Linear Equations Worksheet"
                />
                {errors.title && <div className="form-error">{errors.title}</div>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={assignment.subject}
                    onChange={handleChange}
                    className={`form-select ${errors.subject ? 'error' : ''}`}
                  >
                    <option value="">Choose subject...</option>
                    <option value="mathematics">Mathematics</option>
                    <option value="english">English Literature</option>
                    <option value="science">Science</option>
                    <option value="history">History</option>
                    <option value="geography">Geography</option>
                    <option value="art">Art & Design</option>
                    <option value="physical_education">Physical Education</option>
                    <option value="computer_science">Computer Science</option>
                    <option value="foreign_language">Foreign Language</option>
                  </select>
                  {errors.subject && <div className="form-error">{errors.subject}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="priority" className="form-label">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={assignment.priority}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dueDate" className="form-label">
                    Due Date *
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={assignment.dueDate}
                    onChange={handleChange}
                    className={`form-input ${errors.dueDate ? 'error' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dueDate && <div className="form-error">{errors.dueDate}</div>}
                </div>

                <div className="form-group">
                  <label htmlFor="points" className="form-label">
                    Total Points *
                  </label>
                  <input
                    type="number"
                    id="points"
                    name="points"
                    value={assignment.points}
                    onChange={handleChange}
                    className={`form-input ${errors.points ? 'error' : ''}`}
                    min="1"
                    max="1000"
                    placeholder="100"
                  />
                  {errors.points && <div className="form-error">{errors.points}</div>}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="form-section">
              <h2 className="section-title">Assignment Details</h2>
              
              <div className="form-group">
                <label htmlFor="description" className="form-label">
                  Short Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={assignment.description}
                  onChange={handleChange}
                  className={`form-textarea ${errors.description ? 'error' : ''}`}
                  rows="3"
                  placeholder="Provide a brief overview of what students need to accomplish..."
                />
                {errors.description && <div className="form-error">{errors.description}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="instructions" className="form-label">
                  Detailed Instructions
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  value={assignment.instructions}
                  onChange={handleChange}
                  className="form-textarea"
                  rows="6"
                  placeholder="Provide step-by-step instructions, requirements, submission format, grading criteria, etc..."
                />
                <div className="form-hint">
                  Include specific requirements, submission format, and grading criteria
                </div>
              </div>
            </div>

            {/* Settings Section */}
            <div className="form-section">
              <h2 className="section-title">Assignment Settings</h2>
              
              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="allowLateSubmission"
                    name="allowLateSubmission"
                    checked={assignment.allowLateSubmission}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <label htmlFor="allowLateSubmission" className="checkbox-label">
                    Allow late submissions
                  </label>
                </div>
                <div className="form-hint">
                  Students can submit after the due date with potential point deduction
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Attachments & Resources</label>
                <div className="attachment-area">
                  <div className="attachment-placeholder">
                    <div className="attachment-icon">📎</div>
                    <p>Drag files here or <button type="button" className="link-button">browse</button></p>
                    <small>Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB each)</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-secondary btn-lg"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary btn-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="loading-spinner"></span>
                  Creating Assignment...
                </>
              ) : (
                'Create Assignment'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AssignmentCreate;