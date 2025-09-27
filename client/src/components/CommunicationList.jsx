// CommunicationList.jsx 
import React from 'react';
import { useMessages } from './MessageContext';
import './Communication.css';

function CommunicationList({ onSendNew, onView }) {
  const { conversations, markAsRead, loading } = useMessages();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewMessage = async (conversationId) => {
    if (onView) {
      onView(conversationId);
    }
    // Mark as read when viewing
    // You might want to implement this differently based on your backend
  };

  if (loading) {
    return <div className="loading">Loading messages...</div>;
  }

  return (
    <div className="communication-list-container">
      <div className="list-header">
        <h2>Messages</h2>
        <button onClick={onSendNew} className="btn-send-new">
          + Send New Message
        </button>
      </div>

      <div className="messages-list">
        {conversations.map(conversation => (
          <div 
            key={conversation.id} 
            className={`message-card ${conversation.unreadCount > 0 ? 'unread' : ''}`}
            onClick={() => handleViewMessage(conversation.id)}
          >
            <div className="message-header">
              <div className="message-info">
                <div className="message-avatar">
                  {conversation.participantName.charAt(0).toUpperCase()}
                </div>
                <div className="message-details">
                  <h3>{conversation.participantName}</h3>
                  <p className="last-message">{conversation.lastMessage}</p>
                </div>
              </div>
              <div className="message-status">
                <span className="message-date">
                  {formatDate(conversation.lastMessageDate)}
                </span>
                {conversation.unreadCount > 0 && (
                  <span className="unread-badge">{conversation.unreadCount}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {conversations.length === 0 && (
        <div className="empty-state">
          <p>No messages yet.</p>
          <button onClick={onSendNew} className="btn-send-new">
            Send Your First Message
          </button>
        </div>
      )}
    </div>
  );
}

export default CommunicationList;