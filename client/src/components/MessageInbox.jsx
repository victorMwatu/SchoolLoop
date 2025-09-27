// components/MessageInbox.jsx
import React, { useState } from 'react';
import { useMessages } from './MessageContext';
import CommunicationCreate from './CommunicationCreate';
import CommunicationList from './CommunicationList';
import './MessageInbox.css';

function MessageInbox({ user, onBack }) {
  const [currentView, setCurrentView] = useState('inbox');
  const { conversations, unreadCount } = useMessages();

  const handleSendNew = () => {
    setCurrentView('compose');
  };

  const handleCancelCompose = () => {
    setCurrentView('inbox');
  };

  const handleMessageSent = (message) => {
    setCurrentView('inbox');
    // The context will automatically refresh conversations
  };

  if (currentView === 'compose') {
    return (
      <div className="message-inbox-container">
        <div className="inbox-header">
          <button onClick={handleCancelCompose} className="btn-back">
            ← Back to Inbox
          </button>
          <h2>Compose Message</h2>
        </div>
        <CommunicationCreate 
          onCancel={handleCancelCompose}
          onSend={handleMessageSent}
          user={user}
        />
      </div>
    );
  }

  return (
    <div className="message-inbox-container">
      <div className="inbox-header">
        <button onClick={onBack} className="btn-back">
          ← Back to Dashboard
        </button>
        <div className="header-content">
          <h2>Messages</h2>
          <span className="unread-badge">{unreadCount} unread</span>
        </div>
        <button onClick={handleSendNew} className="btn-compose">
          + Compose
        </button>
      </div>
      
      <CommunicationList 
        onSendNew={handleSendNew}
        conversations={conversations}
        user={user}
      />
    </div>
  );
}

export default MessageInbox;