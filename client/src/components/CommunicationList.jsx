import React, { useState } from 'react';
import './Communication.css';

function CommunicationList({ onSendNew, onView }) {
  // Sample data - later Person 3 will connect to backend
  const [messages] = useState([
    {
      id: 1,
      recipient: 'Sarah Smith (Parent)',
      recipientType: 'parent',
      subject: 'Math Progress Update',
      messageType: 'academic',
      priority: 'normal',
      sentDate: '2025-09-24',
      status: 'delivered',
      requiresAcknowledgment: true,
      acknowledged: false,
      content: 'Sarah has shown excellent improvement in mathematics this week...'
    },
    {
      id: 2,
      recipient: 'John Doe (Student)',
      recipientType: 'student',
      subject: 'Great Work Today!',
      messageType: 'praise',
      priority: 'normal',
      sentDate: '2025-09-24',
      status: 'read',
      requiresAcknowledgment: false,
      acknowledged: false,
      content: 'John participated excellently in today\'s science experiment...'
    },
    {
      id: 3,
      recipient: 'Mike Johnson (Parent)',
      recipientType: 'parent',
      subject: 'Homework Reminder',
      messageType: 'reminder',
      priority: 'high',
      sentDate: '2025-09-23',
      status: 'delivered',
      requiresAcknowledgment: true,
      acknowledged: true,
      content: 'Please ensure Mike completes his English assignment by tomorrow...'
    }
  ]);

  const getMessageTypeIcon = (type) => {
    const icons = {
      general: '',
      behavior: '',
      academic: '',
      attendance: '',
      reminder: '',
      praise: ''
    };
    return icons[type] || '';
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getStatusClass = (status, requiresAck, acknowledged) => {
    if (requiresAck && !acknowledged) {
      return 'status-pending-ack';
    }
    if (requiresAck && acknowledged) {
      return 'status-acknowledged';
    }
    return `status-${status}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="communication-list-container">
      <div className="list-header">
        <h2>Sent Messages</h2>
        <button onClick={onSendNew} className="btn-send-new">
          + Send New Message
        </button>
      </div>

      <div className="messages-list">
        {messages.map(message => (
          <div key={message.id} className="message-card">
            <div className="message-header">
              <div className="message-info">
                <span className="message-icon">
                  {getMessageTypeIcon(message.messageType)}
                </span>
                <div className="message-details">
                  <h3>{message.subject}</h3>
                  <p className="recipient">To: {message.recipient}</p>
                </div>
              </div>
              <div className="message-status">
                <span className={`priority-badge ${getPriorityClass(message.priority)}`}>
                  {message.priority}
                </span>
                <span className={`status-badge ${getStatusClass(message.status, message.requiresAcknowledgment, message.acknowledged)}`}>
                  {message.requiresAcknowledgment ? 
                    (message.acknowledged ? 'Acknowledged' : 'Pending Signature') : 
                    message.status
                  }
                </span>
              </div>
            </div>

            <div className="message-content">
              <p className="message-preview">
                {message.content.substring(0, 120)}
                {message.content.length > 120 ? '...' : ''}
              </p>
            </div>

            <div className="message-meta">
              <div className="message-date">
                 Sent: {formatDate(message.sentDate)}
              </div>
              <div className="message-type">
                Type: {message.messageType}
              </div>
              {message.requiresAcknowledgment && (
                <div className="acknowledgment-required">
                   Requires Acknowledgment
                </div>
              )}
            </div>

            <div className="message-actions">
              <button 
                onClick={() => onView && onView(message.id)} 
                className="btn-view-message"
              >
                View Full Message
              </button>
              {message.requiresAcknowledgment && !message.acknowledged && (
                <button className="btn-remind">
                  Send Reminder
                </button>
              )}
              <button className="btn-reply">
                Reply/Follow Up
              </button>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="empty-state">
          <p>No messages sent yet.</p>
          <button onClick={onSendNew} className="btn-send-new">
            Send Your First Message
          </button>
        </div>
      )}
    </div>
  );
}

export default CommunicationList;