import React, { useState } from 'react';
import './Student.css';

function StudentMessageView({ onBack }) {
  // Sample messages from teachers - later Person 3 will connect to backend
  const [messages] = useState([
    {
      id: 1,
      from: 'Mrs. Johnson (Mathematics)',
      subject: 'Great Progress This Week!',
      messageType: 'praise',
      priority: 'normal',
      sentDate: '2025-09-24',
      isRead: false,
      requiresResponse: false,
      content: 'John, I wanted to let you know that your work in mathematics has improved significantly this week. Keep up the excellent work!'
    },
    {
      id: 2,
      from: 'Mr. Davis (Science)',
      subject: 'Lab Report Reminder',
      messageType: 'reminder',
      priority: 'high',
      sentDate: '2025-09-24',
      isRead: true,
      requiresResponse: false,
      content: 'Don\'t forget that your lab report on photosynthesis is due this Friday. Make sure to include all sections as discussed in class.'
    },
    {
      id: 3,
      from: 'Ms. Smith (English)',
      subject: 'Essay Feedback Available',
      messageType: 'academic',
      priority: 'normal',
      sentDate: '2025-09-23',
      isRead: true,
      requiresResponse: false,
      content: 'Hi John, I\'ve reviewed your recent essay. Please see me after class to discuss some suggestions for improvement.'
    },
    {
      id: 4,
      from: 'School Administration',
      subject: 'Parent-Teacher Conference',
      messageType: 'general',
      priority: 'normal',
      sentDate: '2025-09-22',
      isRead: false,
      requiresResponse: true,
      content: 'Please inform your parents that parent-teacher conferences are scheduled for next week. Have them contact the office to book an appointment.'
    }
  ]);

  const getMessageTypeIcon = (type) => {
    const icons = {
      general: '',
      academic: '',
      reminder: '',
      praise: '',
      behavior: ''
    };
    return icons[type] || '';
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const markAsRead = (messageId) => {
    console.log('Mark message as read:', messageId);
    // Later Person 3 will implement this with backend
  };

  const unreadCount = messages.filter(m => !m.isRead).length;
  const responseNeededCount = messages.filter(m => m.requiresResponse).length;

  return (
    <div className="student-view-container">
      <div className="view-header">
        <button onClick={onBack} className="btn-back">
          ← Back to Dashboard
        </button>
        <h2>My Messages</h2>
      </div>

      <div className="messages-overview">
        <div className="overview-card unread">
          <h3>{unreadCount}</h3>
          <p>Unread</p>
        </div>
        <div className="overview-card response-needed">
          <h3>{responseNeededCount}</h3>
          <p>Response Needed</p>
        </div>
        <div className="overview-card total">
          <h3>{messages.length}</h3>
          <p>Total Messages</p>
        </div>
      </div>

      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className={`message-card ${!message.isRead ? 'unread' : ''}`}>
            <div className="message-header">
              <div className="message-info">
                <span className="message-icon">
                  {getMessageTypeIcon(message.messageType)}
                </span>
                <div className="message-details">
                  <h3>{message.subject}</h3>
                  <p className="sender">From: {message.from}</p>
                  <p className="date"> {formatDate(message.sentDate)}</p>
                </div>
              </div>
              
              <div className="message-status">
                <span className={`priority-badge ${getPriorityClass(message.priority)}`}>
                  {message.priority}
                </span>
                {!message.isRead && (
                  <span className="unread-badge">New</span>
                )}
                {message.requiresResponse && (
                  <span className="response-badge">Response Needed</span>
                )}
              </div>
            </div>

            <div className="message-content">
              <p className="message-text">{message.content}</p>
            </div>

            <div className="message-actions">
              <button 
                onClick={() => markAsRead(message.id)}
                className="btn-mark-read"
                disabled={message.isRead}
              >
                {message.isRead ? 'Read' : 'Mark as Read'}
              </button>
              
              {message.requiresResponse && (
                <button className="btn-respond">
                  Send Response
                </button>
              )}
              
              <button className="btn-archive">
                Archive
              </button>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="empty-state">
          <p>No messages yet.</p>
          <p>Messages from your teachers will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default StudentMessageView;