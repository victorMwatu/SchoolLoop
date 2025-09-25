import React, { useState } from 'react';
import './Communication.css';

function CommunicationCreate({ onCancel, onSend }) {
  const [message, setMessage] = useState({
    recipient: '',
    recipientType: 'student',
    subject: '',
    messageType: 'general',
    content: '',
    priority: 'normal',
    requiresAcknowledgment: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMessage({
      ...message,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending message:', message);
    
    if (onSend) {
      onSend(message);
    }
    
    // Reset form
    setMessage({
      recipient: '',
      recipientType: 'student',
      subject: '',
      messageType: 'general',
      content: '',
      priority: 'normal',
      requiresAcknowledgment: false
    });
  };

  return (
    <div className="communication-create-container">
      <div className="communication-form">
        <h2>Send Message</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="recipientType">Send to:</label>
              <select
                id="recipientType"
                name="recipientType"
                value={message.recipientType}
                onChange={handleChange}
                required
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="class">Entire Class</option>
                <option value="all-parents">All Parents in Class</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="recipient">Recipient:</label>
              <select
                id="recipient"
                name="recipient"
                value={message.recipient}
                onChange={handleChange}
                required
              >
                <option value="">Select recipient</option>
                <option value="john-doe">John Doe</option>
                <option value="sarah-smith">Sarah Smith</option>
                <option value="mike-johnson">Mike Johnson</option>
                <option value="class-5a">Class 5A</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="messageType">Message Type:</label>
              <select
                id="messageType"
                name="messageType"
                value={message.messageType}
                onChange={handleChange}
              >
                <option value="general">General Communication</option>
                <option value="behavior">Behavior Report</option>
                <option value="academic">Academic Performance</option>
                <option value="attendance">Attendance Issue</option>
                <option value="reminder">Reminder</option>
                <option value="praise">Positive Feedback</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                name="priority"
                value={message.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={message.subject}
              onChange={handleChange}
              required
              placeholder="Brief subject of your message..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="content">Message:</label>
            <textarea
              id="content"
              name="content"
              value={message.content}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Write your message here..."
            />
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="requiresAcknowledgment"
                checked={message.requiresAcknowledgment}
                onChange={handleChange}
              />
              Requires parent acknowledgment/signature
            </label>
          </div>

          <div className="form-actions">
            <button type="button" onClick={onCancel} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-send">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommunicationCreate;