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
  }