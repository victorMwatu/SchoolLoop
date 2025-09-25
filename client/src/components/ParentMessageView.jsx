import React, { useState } from 'react';
import './Parent.css';

function ParentMessageView({ user, onBack }) {
  // Sample messages from teachers - later Person 3 will connect to backend
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: 'Mrs. Johnson (Mathematics)',
      subject: 'John\'s Academic Progress',
      messageType: 'progress_update',
      priority: 'normal',
      sentDate: '2025-09-24',
      isRead: false,
      requiresAcknowledgment: true,
      isAcknowledged: false,
      content: 'I wanted to update you on John\'s progress in mathematics this semester. He has shown significant improvement in his problem-solving skills and is actively participating in class discussions. His test scores have improved by 15% since the beginning of the term.',
      acknowledgmentText: 'Please acknowledge that you have read this progress update.'
    },
    {
      id: 2,
      from: 'Mr. Davis (Science)',
      subject: 'Lab Safety Reminder',
      messageType: 'announcement',
      priority: 'high',
      sentDate: '2025-09-23',
      isRead: true,
      requiresAcknowledgment: true,
      isAcknowledged: false,
      content: 'Dear parents, we will be conducting chemistry experiments next week that require special safety equipment. Please ensure your child brings safety goggles and a lab coat. If you need to purchase these items, they are available at the school store.',
      acknowledgmentText: 'I acknowledge that I have read the lab safety requirements and will ensure my child has the necessary equipment.'
    },
    {
      id: 3,
      from: 'Ms. Wilson (English Literature)',
      subject: 'Excellent Essay Submission',
      messageType: 'praise',
      priority: 'normal',
      sentDate: '2025-09-22',
      isRead: true,
      requiresAcknowledgment: false,
      isAcknowledged: false,
      content: 'John submitted an outstanding character analysis essay on "To Kill a Mockingbird". His understanding of the themes and character development was impressive. He earned an A- on this assignment. Keep encouraging him to read more classic literature!'
    },
    {
      id: 4,
      from: 'Principal Anderson',
      subject: 'Parent-Teacher Conference Scheduling',
      messageType: 'meeting_request',
      priority: 'high',
      sentDate: '2025-09-21',
      isRead: false,
      requiresAcknowledgment: true,
      isAcknowledged: false,
      content: 'Parent-teacher conferences are scheduled for October 5-7. Please log into the school portal to schedule your preferred time slots with your child\'s teachers. Conferences will be held both in-person and virtually.',
      acknowledgmentText: 'I acknowledge that I have received the parent-teacher conference information and will schedule my appointments by September 30th.'
    },
    {
      id: 5,
      from: 'Mr. Brown (History)',
      subject: 'Field Trip Permission Required',
      messageType: 'permission_slip',
      priority: 'urgent',
      sentDate: '2025-09-20',
      isRead: true,
      requiresAcknowledgment: true,
      isAcknowledged: true,
      acknowledgedDate: '2025-09-21',
      content: 'We have planned an educational field trip to the National History Museum on October 15th. The trip will cost $25 per student and includes transportation and museum entry. Please complete the attached permission slip and return it by October 1st.',
      acknowledgmentText: 'I give permission for my child to participate in the field trip and understand the associated costs and requirements.'
    }
  ]);

  const getMessageTypeIcon = (messageType) => {
    switch (messageType) {
      case 'progress_update': return '📊';
      case 'announcement': return '📢';
      case 'praise': return '🌟';
      case 'meeting_request': return '📅';
      case 'permission_slip': return '📝';
      case 'concern': return '⚠️';
      default: return '💌';
    }
  };

  const markAsRead = (messageId) => {
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, isRead: true }
        : message
    ));
  };

  const acknowledgeMessage = (messageId) => {
    const today = new Date().toISOString().split('T')[0];
    setMessages(messages.map(message => 
      message.id === messageId 
        ? { ...message, isAcknowledged: true, acknowledgedDate: today, isRead: true }
        : message
    ));
  };

  const handleReply = (messageId, senderName) => {
    alert(`Reply functionality to ${senderName} will be implemented in the inbox system.`);
  };

  // Calculate overview statistics
  const unreadMessages = messages.filter(m => !m.isRead).length;
  const pendingAcknowledgments = messages.filter(m => m.requiresAcknowledgment && !m.isAcknowledged).length;
  const acknowledgedMessages = messages.filter(m => m.isAcknowledged).length;
  const totalMessages = messages.length;

  return (
    <div className="parent-view-container">
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h2>Messages from Teachers</h2>
      </div>

      {/* Overview Cards */}
      <div className="messages-overview">
        <div className="overview-card unread">
          <h3>{unreadMessages}</h3>
          <p>Unread Messages</p>
        </div>
        <div className="overview-card response-needed">
          <h3>{pendingAcknowledgments}</h3>
          <p>Pending Acknowledgments</p>
        </div>
        <div className="overview-card acknowledged">
          <h3>{acknowledgedMessages}</h3>
          <p>Acknowledged</p>
        </div>
        <div className="overview-card total">
          <h3>{totalMessages}</h3>
          <p>Total Messages</p>
        </div>
      </div>

      {/* Messages List */}
      <div className="messages-list">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message-card ${!message.isRead ? 'unread' : ''} ${message.requiresAcknowledgment && !message.isAcknowledged ? 'requires-acknowledgment' : ''}`}
          >
            <div className="message-header">
              <div className="message-info">
                <span className="message-icon">{getMessageTypeIcon(message.messageType)}</span>
                <div className="message-details">
                  <h3>{message.subject}</h3>
                  <p className="sender">{message.from}</p>
                  <p className="date">{new Date(message.sentDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="message-status">
                <span className={`priority-badge priority-${message.priority}`}>
                  {message.priority}
                </span>
                {!message.isRead && (
                  <span className="unread-badge">New</span>
                )}
                {message.requiresAcknowledgment && !message.isAcknowledged && (
                  <span className="acknowledgment-badge">Acknowledgment Required</span>
                )}
                {message.isAcknowledged && (
                  <span className="acknowledged-badge">Acknowledged</span>
                )}
              </div>
            </div>

            <div className="message-content">
              <p className="message-text">{message.content}</p>
              
              {message.requiresAcknowledgment && (
                <div className="acknowledgment-section">
                  <h4>{message.isAcknowledged ? 'Acknowledgment Completed' : 'Acknowledgment Required'}</h4>
                  <p>{message.acknowledgmentText}</p>
                  {message.isAcknowledged && (
                    <p><strong>Acknowledged on:</strong> {new Date(message.acknowledgedDate).toLocaleDateString()}</p>
                  )}
                </div>
              )}
            </div>

            <div className="message-actions">
              {message.requiresAcknowledgment && (
                <button 
                  className="btn-acknowledge"
                  onClick={() => acknowledgeMessage(message.id)}
                  disabled={message.isAcknowledged}
                >
                  {message.isAcknowledged ? '✓ Acknowledged' : 'Acknowledge'}
                </button>
              )}
              <button 
                className="btn-reply"
                onClick={() => handleReply(message.id, message.from)}
              >
                Reply
              </button>
              <button 
                className="btn-mark-read"
                onClick={() => markAsRead(message.id)}
                disabled={message.isRead}
              >
                {message.isRead ? 'Read' : 'Mark as Read'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="empty-state">
          <p>No messages found.</p>
          <p>You will receive notifications here when teachers send messages.</p>
        </div>
      )}
    </div>
  );
}

export default ParentMessageView;