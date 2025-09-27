// components/CommunicationCreate.jsx 
import React, { useState, useEffect } from 'react';
import { useMessages } from './MessageContext';
import './Communication.css';

function CommunicationCreate({ onCancel, onSend, user }) {
  const [message, setMessage] = useState({
    recipientId: '',      
    recipientType: 'student',
    subject: '',
    messageType: 'general',
    content: '',
    priority: 'normal',
    requiresAcknowledgment: false
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [usersLoading, setUsersLoading] = useState(true);
  const { fetchUsers } = useMessages();

  // Fetch real users from backend
  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsersLoading(true);
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error loading users:', error);
      } finally {
        setUsersLoading(false);
      }
    };

    loadUsers();
  }, [fetchUsers]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMessage({
      ...message,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validation
    if (!message.recipientId) {
      alert('Please select a recipient');
      setLoading(false);
      return;
    }

    if (!message.subject.trim()) {
      alert('Please enter a subject');
      setLoading(false);
      return;
    }

    if (!message.content.trim()) {
      alert('Please enter message content');
      setLoading(false);
      return;
    }

    // Prepare message data for sending
    const messageData = {
      recipientId: message.recipientId,
      subject: message.subject.trim(),
      content: message.content.trim(),
      messageType: message.messageType,
      priority: message.priority,
      requiresAcknowledgment: message.requiresAcknowledgment
    };

    console.log('Sending message with data:', messageData);
    
    if (onSend) {
      const result = await onSend(messageData);
      
      if (result.success) {
        // Reset form on success
        setMessage({
          recipientId: '',
          recipientType: 'student',
          subject: '',
          messageType: 'general',
          content: '',
          priority: 'normal',
          requiresAcknowledgment: false
        });
        
        // Optional: show success message
        alert('Message sent successfully!');
      } else {
        alert('Failed to send message: ' + (result.error || 'Unknown error'));
      }
    }
    
    setLoading(false);
  };

  // Group users by role for better organization
  const usersByRole = {
    teacher: users.filter(u => u.role === 'teacher'),
    student: users.filter(u => u.role === 'student'),
    parent: users.filter(u => u.role === 'parent')
  };

  // Get selected role users
  const currentRoleUsers = usersByRole[message.recipientType] || [];

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
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="parent">Parent</option>
                <option value="all">All Users</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="recipientId">Recipient:</label>
              <select
                id="recipientId"
                name="recipientId"
                value={message.recipientId}
                onChange={handleChange}
                required
                disabled={loading || usersLoading}
              >
                <option value="">Select recipient</option>
                {message.recipientType === 'all' ? (
                  // Show all users
                  users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.role})
                    </option>
                  ))
                ) : (
                  // Show users filtered by selected role
                  currentRoleUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name} {user.role !== message.recipientType && `(${user.role})`}
                    </option>
                  ))
                )}
              </select>
              
              {usersLoading && (
                <div className="loading-text">Loading users...</div>
              )}
              
              {!usersLoading && currentRoleUsers.length === 0 && message.recipientType !== 'all' && (
                <div className="no-users-text">
                  No {message.recipientType}s found in the system
                </div>
              )}
              
              {!usersLoading && users.length === 0 && message.recipientType === 'all' && (
                <div className="no-users-text">
                  No users found in the system
                </div>
              )}
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
                disabled={loading}
              >
                <option value="general">General Communication</option>
                <option value="academic">Academic Performance</option>
                <option value="behavior">Behavior Report</option>
                <option value="attendance">Attendance Issue</option>
                <option value="reminder">Reminder</option>
                <option value="praise">Positive Feedback</option>
                <option value="urgent">Urgent Matter</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority:</label>
              <select
                id="priority"
                name="priority"
                value={message.priority}
                onChange={handleChange}
                disabled={loading}
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
              disabled={loading}
              placeholder="Brief subject of your message..."
              maxLength="200"
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
              disabled={loading}
              placeholder="Write your message here... Be clear and concise."
              maxLength="2000"
            />
            <div className="char-counter">
              {message.content.length}/2000 characters
            </div>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input
                type="checkbox"
                name="requiresAcknowledgment"
                checked={message.requiresAcknowledgment}
                onChange={handleChange}
                disabled={loading}
              />
              Requires acknowledgment/signature
            </label>
            <small>Recipient will need to confirm they've read this message</small>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn-send"
              disabled={loading || usersLoading}
            >
              {loading ? (
                <>
                  <span className="loading-spinner"></span>
                  Sending...
                </>
              ) : (
                'Send Message'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommunicationCreate;