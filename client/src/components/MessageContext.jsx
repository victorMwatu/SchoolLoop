// components/MessageContext.jsx (COMPLETE UPDATED VERSION)
import React, { createContext, useContext, useState, useEffect } from 'react';

const MessageContext = createContext();

export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error('useMessages must be used within a MessageProvider');
  }
  return context;
};

export const MessageProvider = ({ children, user }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  // API configuration matching your backend
  const API_CONFIG = {
    baseURL: 'http://localhost:5000',
    endpoints: {
      getConversations: '/api/messages/conversations',
      sendMessage: '/api/messages/send', 
      markAsRead: '/api/messages/{id}/read',
      getConversationMessages: '/api/messages/conversation/{id}'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  };

  // Fetch conversations from backend
  const fetchConversations = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.getConversations}`,
        {
          headers: {
            ...API_CONFIG.headers,
            ...getAuthHeader()
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setConversations(data.conversations || []);
        setUnreadCount(data.unreadCount || 0);
      } else {
        console.error('Failed to fetch conversations:', response.status);
      }
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
    }
  };

  // UPDATED: Send message to backend with proper recipientId handling
  const sendMessage = async (messageData) => {
    try {
      console.log('Sending message data:', messageData);
      
      // Ensure recipientId is a number
      const recipientId = parseInt(messageData.recipientId);
      if (isNaN(recipientId)) {
        return { success: false, error: 'Invalid recipient ID' };
      }

      const messagePayload = {
        receiver_id: recipientId,
        subject: messageData.subject || 'No Subject',
        content: messageData.content,
        message_type: messageData.messageType || 'general',
        priority: messageData.priority || 'normal'
      };

      console.log('Message payload:', messagePayload);

      const response = await fetch(
        `${API_CONFIG.baseURL}${API_CONFIG.endpoints.sendMessage}`,
        {
          method: 'POST',
          headers: {
            ...API_CONFIG.headers,
            ...getAuthHeader(),
          },
          body: JSON.stringify(messagePayload),
        }
      );
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const result = await response.json();
        console.log('Message sent successfully:', result);
        await fetchConversations(); // Refresh conversations
        return { success: true, data: result };
      } else {
        const errorText = await response.text();
        console.error('Send message failed:', response.status, errorText);
        return { success: false, error: `Server error: ${response.status} - ${errorText}` };
      }
    } catch (error) {
      console.error('Send message error:', error);
      return { success: false, error: error.message };
    }
  };

  // Mark message as read
  const markAsRead = async (messageId) => {
    try {
      const endpoint = API_CONFIG.endpoints.markAsRead.replace('{id}', messageId);
      await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        method: 'PUT',
        headers: {
          ...API_CONFIG.headers,
          ...getAuthHeader(),
        },
      });
      await fetchConversations(); // Refresh to update unread count
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  // Get messages for a specific conversation
  const fetchConversationMessages = async (conversationId) => {
    try {
      const endpoint = API_CONFIG.endpoints.getConversationMessages.replace('{id}', conversationId);
      const response = await fetch(`${API_CONFIG.baseURL}${endpoint}`, {
        headers: {
          ...API_CONFIG.headers,
          ...getAuthHeader(),
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.messages || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching conversation messages:', error);
      return [];
    }
  };

  // Fetch users for recipient dropdown
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/api/users`, {
        headers: {
          ...API_CONFIG.headers,
          ...getAuthHeader(),
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.users || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversations();
      // Set up polling for new messages (every 30 seconds)
      const interval = setInterval(fetchConversations, 30000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const value = {
    conversations,
    activeConversation,
    unreadCount,
    loading,
    sendMessage,
    markAsRead,
    setActiveConversation,
    refreshConversations: fetchConversations,
    fetchConversationMessages,
    fetchUsers
  };

  return (
    <MessageContext.Provider value={value}>
      {children}
    </MessageContext.Provider>
  );
};