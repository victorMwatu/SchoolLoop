import React, { useState } from 'react';
import './Parent.css';
import './MessageChat.css';
import '../styles/design-system.css';

function ParentMessageView({ user, onBack }) {
  // Sample conversation threads - later Person 3 will connect to backend
  const [conversations, setConversations] = useState([
    {
      id: 1,
      teacher: {
        name: 'Mrs. Johnson',
        subject: 'Mathematics',
        avatar: null, // Will show initials
        initials: 'MJ'
      },
      lastMessage: 'Great progress on the algebra homework!',
      lastMessageDate: '2025-09-25T14:30:00',
      unreadCount: 2,
      isOnline: true
    },
    {
      id: 2,
      teacher: {
        name: 'Mr. Davis',
        subject: 'Science',
        avatar: null,
        initials: 'MD'
      },
      lastMessage: 'Please bring safety goggles for next week\'s lab',
      lastMessageDate: '2025-09-25T10:15:00',
      unreadCount: 0,
      isOnline: false
    },
    {
      id: 3,
      teacher: {
        name: 'Ms. Wilson',
        subject: 'English Literature',
        avatar: null,
        initials: 'MW'
      },
      lastMessage: 'Excellent character analysis essay!',
      lastMessageDate: '2025-09-24T16:20:00',
      unreadCount: 0,
      isOnline: true
    },
    {
      id: 4,
      teacher: {
        name: 'Principal Anderson',
        subject: 'Administration',
        avatar: null,
        initials: 'PA'
      },
      lastMessage: 'Parent-teacher conference scheduled for Oct 5th',
      lastMessageDate: '2025-09-23T09:00:00',
      unreadCount: 1,
      isOnline: false
    }
  ]);

  // Sample chat messages for active conversation
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      senderId: 'teacher_1',
      senderName: 'Mrs. Johnson',
      senderType: 'teacher',
      content: 'Hello! I wanted to update you on John\'s progress in mathematics this semester.',
      timestamp: '2025-09-25T09:00:00',
      isRead: true
    },
    {
      id: 2,
      senderId: 'teacher_1',
      senderName: 'Mrs. Johnson',
      senderType: 'teacher',
      content: 'He has shown significant improvement in his problem-solving skills and is actively participating in class discussions. His test scores have improved by 15% since the beginning of the term.',
      timestamp: '2025-09-25T09:01:00',
      isRead: true
    },
    {
      id: 3,
      senderId: 'parent_1',
      senderName: 'Parent',
      senderType: 'parent',
      content: 'That\'s wonderful to hear! We\'ve been working with him on his homework every evening.',
      timestamp: '2025-09-25T12:30:00',
      isRead: true
    },
    {
      id: 4,
      senderId: 'teacher_1',
      senderName: 'Mrs. Johnson',
      senderType: 'teacher',
      content: 'It really shows! Keep up the great work. I have some additional practice worksheets if you think John would benefit from them.',
      timestamp: '2025-09-25T13:45:00',
      isRead: true
    },
    {
      id: 5,
      senderId: 'teacher_1',
      senderName: 'Mrs. Johnson',
      senderType: 'teacher',
      content: 'Also, we have a math competition coming up next month. John shows great potential and I\'d love to recommend him if he\'s interested.',
      timestamp: '2025-09-25T14:30:00',
      isRead: false
    }
  ]);

  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Helper functions
  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    
    if (messageDate.getTime() === today.getTime()) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit', 
        hour12: true 
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getInitialsColor = (name) => {
    const colors = [
      '#2563EB', '#DC2626', '#059669', '#D97706', 
      '#7C3AED', '#BE185D', '#0891B2', '#65A30D'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const selectConversation = (conversation) => {
    setActiveConversation(conversation);
    // Mark conversation as read
    setConversations(conversations.map(conv => 
      conv.id === conversation.id 
        ? { ...conv, unreadCount: 0 }
        : conv
    ));
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: chatMessages.length + 1,
      senderId: 'parent_1',
      senderName: 'Parent',
      senderType: 'parent',
      content: newMessage,
      timestamp: new Date().toISOString(),
      isRead: true
    };
    
    setChatMessages([...chatMessages, newMsg]);
    setNewMessage('');
    
    // Update last message in conversation
    setConversations(conversations.map(conv => 
      conv.id === activeConversation.id 
        ? { ...conv, lastMessage: newMessage, lastMessageDate: new Date().toISOString() }
        : conv
    ));
    
    // Simulate teacher typing response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const teacherResponse = {
        id: chatMessages.length + 2,
        senderId: activeConversation.teacher.name.toLowerCase().replace(' ', '_'),
        senderName: activeConversation.teacher.name,
        senderType: 'teacher',
        content: 'Thank you for the message! I\'ll get back to you soon.',
        timestamp: new Date().toISOString(),
        isRead: false
      };
      setChatMessages(prev => [...prev, teacherResponse]);
    }, 2000);
  };

  // Calculate statistics
  const totalUnread = conversations.reduce((sum, conv) => sum + conv.unreadCount, 0);
  const totalConversations = conversations.length;
  const activeTeachers = conversations.filter(conv => conv.teacher.isOnline).length;

  return (
    <div className="chat-container">
      {/* Header */}
      <div className="chat-header">
        <button className="btn btn-secondary btn-sm" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <div className="header-info">
          <h1 className="font-heading font-bold text-2xl text-gray-800">Messages</h1>
          <div className="header-stats">
            <span className="stat-item">
              <span className="stat-number">{totalUnread}</span>
              <span className="stat-label">Unread</span>
            </span>
            <span className="stat-divider">•</span>
            <span className="stat-item">
              <span className="stat-number">{activeTeachers}</span>
              <span className="stat-label">Online</span>
            </span>
          </div>
        </div>
      </div>

      {/* Chat Layout */}
      <div className="chat-layout">
        {/* Conversations Sidebar */}
        <div className="conversations-sidebar">
          <div className="sidebar-header">
            <h2 className="sidebar-title">Conversations</h2>
            <span className="conversation-count">{totalConversations}</span>
          </div>
          
          <div className="conversations-list">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`conversation-item ${activeConversation.id === conversation.id ? 'active' : ''}`}
                onClick={() => selectConversation(conversation)}
              >
                <div className="conversation-avatar">
                  <div 
                    className="avatar-circle"
                    style={{ backgroundColor: getInitialsColor(conversation.teacher.name) }}
                  >
                    {conversation.teacher.initials}
                  </div>
                  {conversation.teacher.isOnline && <div className="online-indicator"></div>}
                </div>
                
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h3 className="teacher-name">{conversation.teacher.name}</h3>
                    <span className="last-message-time">
                      {formatMessageTime(conversation.lastMessageDate)}
                    </span>
                  </div>
                  <div className="conversation-preview">
                    <span className="subject-label">{conversation.teacher.subject}</span>
                    <p className="last-message">{conversation.lastMessage}</p>
                  </div>
                </div>
                
                {conversation.unreadCount > 0 && (
                  <div className="unread-badge">{conversation.unreadCount}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {/* Chat Header */}
          <div className="chat-area-header">
            <div className="active-conversation-info">
              <div 
                className="teacher-avatar"
                style={{ backgroundColor: getInitialsColor(activeConversation.teacher.name) }}
              >
                {activeConversation.teacher.initials}
              </div>
              <div className="teacher-details">
                <h3 className="teacher-name">{activeConversation.teacher.name}</h3>
                <p className="teacher-subject">
                  {activeConversation.teacher.subject}
                  {activeConversation.teacher.isOnline && (
                    <span className="online-status">• Online</span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Container */}
          <div className="messages-container">
            {chatMessages.map(message => (
              <div 
                key={message.id} 
                className={`message-bubble ${message.senderType === 'teacher' ? 'teacher-message' : 'parent-message'}`}
              >
                <div className="message-content">
                  <p>{message.content}</p>
                  <span className="message-time">
                    {formatMessageTime(message.timestamp)}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="message-bubble teacher-message typing">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="message-input-area">
            <form onSubmit={handleSendMessage} className="message-form">
              <div className="input-container">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={`Message ${activeConversation.teacher.name}...`}
                  className="message-input"
                />
                <button 
                  type="button"
                  className="attachment-button"
                  title="Attach file"
                >
                  📎
                </button>
              </div>
              <button 
                type="submit" 
                className="send-button"
                disabled={!newMessage.trim()}
              >
                <span className="send-icon">➤</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ParentMessageView;