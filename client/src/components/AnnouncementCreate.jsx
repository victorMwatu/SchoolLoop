import React, { useState } from 'react';
import './AnnouncementCreate.css';
import '../styles/design-system.css';

function AnnouncementCreate({ onCancel, onSave }) {
  const [announcement, setAnnouncement] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'normal',
    targetAudience: 'all',
    allowComments: true,
    sendNotification: true,
    publishDate: new Date().toISOString().split('T')[0],
    expirationDate: ''
  });

  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [charCount, setCharCount] = useState(0);

  const maxCharacters = 500;

  const validateForm = () => {
    const newErrors = {};
    
    if (!announcement.title.trim()) {
      newErrors.title = 'Announcement title is required';
    }
    
    if (!announcement.content.trim()) {
      newErrors.content = 'Announcement content is required';
    }
    
    if (announcement.content.length > maxCharacters) {
      newErrors.content = `Content must be ${maxCharacters} characters or less`;
    }
    
    if (announcement.expirationDate && new Date(announcement.expirationDate) <= new Date(announcement.publishDate)) {
      newErrors.expirationDate = 'Expiration date must be after publish date';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setAnnouncement({
      ...announcement,
      [name]: newValue
    });
    
    // Update character count for content
    if (name === 'content') {
      setCharCount(value.length);
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e, saveAsDraft = false) => {
    e.preventDefault();
    
    if (!saveAsDraft && !validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setIsDraft(saveAsDraft);
    
    try {
      // For now, we'll just log it. Later Person 3 will connect to backend
      console.log('Creating announcement:', { ...announcement, isDraft: saveAsDraft });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSave) {
        onSave({
          ...announcement,
          id: Date.now(),
          createdDate: new Date().toISOString(),
          status: saveAsDraft ? 'draft' : 'published',
          isDraft: saveAsDraft
        });
      }
      
      // Reset form
      setAnnouncement({
        title: '',
        content: '',
        category: 'general',
        priority: 'normal',
        targetAudience: 'all',
        allowComments: true,
        sendNotification: true,
        publishDate: new Date().toISOString().split('T')[0],
        expirationDate: ''
      });
      setCharCount(0);
      
    } catch (error) {
      console.error('Error creating announcement:', error);
    } finally {
      setIsSubmitting(false);
      setIsDraft(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'general': return '📢';
      case 'academic': return '📚';
      case 'event': return '📅';
      case 'emergency': return '⚠️';
      case 'celebration': return '🎉';
      default: return '📢';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'low': return 'var(--status-success)';
      case 'normal': return 'var(--primary-blue)';
      case 'high': return 'var(--status-warning)';
      case 'urgent': return 'var(--status-error)';
      default: return 'var(--primary-blue)';
    }
  };

  return (
    <div className="announcement-create-wrapper">
      <div className="announcement-create-container">
        {/* Header */}
        <div className="announcement-header">
          <div className="header-content">
            <h1 className="font-heading font-bold text-4xl">Create Announcement</h1>
            <p className="text-lg text-gray-600">Share important information with your school community</p>
          </div>
          <button 
            type="button" 
            onClick={onCancel} 
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            ← Back
          </button>
        </div>

        {/* Main Form */}
        <div className="announcement-form-container">
          <form onSubmit={(e) => handleSubmit(e, false)} className="announcement-form">
            
            {/* Title Section */}
            <div className="form-section title-section">
              <div className="section-icon">{getCategoryIcon(announcement.category)}</div>
              <div className="title-input-group">
                <input
                  type="text"
                  name="title"
                  value={announcement.title}
                  onChange={handleChange}
                  className={`announcement-title-input ${errors.title ? 'error' : ''}`}
                  placeholder="Enter announcement title..."
                  maxLength="100"
                />
                {errors.title && <div className="form-error">{errors.title}</div>}
              </div>
            </div>

            {/* Content Section */}
            <div className="form-section content-section">
              <label className="content-label">
                Announcement Content
                <span className="char-counter">
                  {charCount}/{maxCharacters}
                </span>
              </label>
              <textarea
                name="content"
                value={announcement.content}
                onChange={handleChange}
                className={`announcement-content-textarea ${errors.content ? 'error' : ''}`}
                placeholder="Write your announcement here... Share news, updates, reminders, or celebrations with your school community."
                rows="8"
                maxLength={maxCharacters}
              />
              {errors.content && <div className="form-error">{errors.content}</div>}
            </div>

            {/* Settings Grid */}
            <div className="settings-grid">
              
              {/* Category & Priority */}
              <div className="settings-group">
                <h3 className="settings-title">Category & Priority</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Category</label>
                    <select
                      name="category"
                      value={announcement.category}
                      onChange={handleChange}
                      className="form-select category-select"
                    >
                      <option value="general">📢 General</option>
                      <option value="academic">📚 Academic</option>
                      <option value="event">📅 Events</option>
                      <option value="emergency">⚠️ Emergency</option>
                      <option value="celebration">🎉 Celebration</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Priority Level</label>
                    <select
                      name="priority"
                      value={announcement.priority}
                      onChange={handleChange}
                      className="form-select priority-select"
                      style={{ borderLeftColor: getPriorityColor(announcement.priority) }}
                    >
                      <option value="low">Low Priority</option>
                      <option value="normal">Normal</option>
                      <option value="high">High Priority</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Audience & Timing */}
              <div className="settings-group">
                <h3 className="settings-title">Audience & Timing</h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Target Audience</label>
                    <select
                      name="targetAudience"
                      value={announcement.targetAudience}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="all">All (Students & Parents)</option>
                      <option value="students">Students Only</option>
                      <option value="parents">Parents Only</option>
                      <option value="teachers">Teachers Only</option>
                      <option value="staff">Staff Only</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Publish Date</label>
                    <input
                      type="date"
                      name="publishDate"
                      value={announcement.publishDate}
                      onChange={handleChange}
                      className="form-input"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Expiration Date (Optional)</label>
                  <input
                    type="date"
                    name="expirationDate"
                    value={announcement.expirationDate}
                    onChange={handleChange}
                    className={`form-input ${errors.expirationDate ? 'error' : ''}`}
                    min={announcement.publishDate}
                  />
                  {errors.expirationDate && <div className="form-error">{errors.expirationDate}</div>}
                  <div className="form-hint">
                    Leave blank for permanent announcement
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="settings-group">
                <h3 className="settings-title">Options</h3>
                
                <div className="checkbox-grid">
                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="allowComments"
                      name="allowComments"
                      checked={announcement.allowComments}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <label htmlFor="allowComments" className="checkbox-label">
                      <span className="checkbox-title">Allow Comments</span>
                      <span className="checkbox-desc">Let community members respond</span>
                    </label>
                  </div>

                  <div className="checkbox-item">
                    <input
                      type="checkbox"
                      id="sendNotification"
                      name="sendNotification"
                      checked={announcement.sendNotification}
                      onChange={handleChange}
                      className="form-checkbox"
                    />
                    <label htmlFor="sendNotification" className="checkbox-label">
                      <span className="checkbox-title">Send Notification</span>
                      <span className="checkbox-desc">Email/SMS alerts to audience</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview Section */}
            <div className="preview-section">
              <h3 className="preview-title">Preview</h3>
              <div className="announcement-preview">
                <div className="preview-header">
                  <span className="preview-category">{getCategoryIcon(announcement.category)} {announcement.category}</span>
                  <span className={`preview-priority priority-${announcement.priority}`}>
                    {announcement.priority}
                  </span>
                </div>
                <h4 className="preview-announcement-title">
                  {announcement.title || "Your announcement title will appear here..."}
                </h4>
                <p className="preview-content">
                  {announcement.content || "Your announcement content will appear here..."}
                </p>
                <div className="preview-meta">
                  <span>To: {announcement.targetAudience}</span>
                  <span>•</span>
                  <span>{new Date(announcement.publishDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button 
                type="button" 
                onClick={onCancel} 
                className="btn btn-secondary btn-lg"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              
              <button 
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="btn btn-draft btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting && isDraft ? (
                  <>
                    <span className="loading-spinner"></span>
                    Saving Draft...
                  </>
                ) : (
                  'Save as Draft'
                )}
              </button>
              
              <button 
                type="submit" 
                className="btn btn-primary btn-lg btn-publish"
                disabled={isSubmitting}
              >
                {isSubmitting && !isDraft ? (
                  <>
                    <span className="loading-spinner"></span>
                    Publishing...
                  </>
                ) : (
                  'Post Announcement'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AnnouncementCreate;