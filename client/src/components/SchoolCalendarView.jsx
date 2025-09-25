import React, { useState } from 'react';
import './Parent.css';

function SchoolCalendarView({ user, onBack }) {
  // Mock calendar events - later Person 3 will connect to backend
  const [calendarEvents] = useState([
    {
      id: 1,
      title: 'Parent-Teacher Conferences',
      date: '2025-10-05',
      endDate: '2025-10-07',
      type: 'meeting',
      description: 'Schedule your appointments with teachers to discuss your child\'s progress.',
      time: 'All Day',
      location: 'Various Classrooms',
      isImportant: true
    },
    {
      id: 2,
      title: 'Fall Break',
      date: '2025-10-12',
      endDate: '2025-10-16',
      type: 'holiday',
      description: 'No classes - Fall break for all students.',
      time: 'All Day',
      location: '',
      isImportant: false
    },
    {
      id: 3,
      title: 'Science Fair',
      date: '2025-10-20',
      type: 'event',
      description: 'Annual science fair showcasing student projects.',
      time: '9:00 AM - 3:00 PM',
      location: 'School Gymnasium',
      isImportant: true
    },
    {
      id: 4,
      title: 'Mid-Term Exams Begin',
      date: '2025-10-25',
      endDate: '2025-10-29',
      type: 'exam',
      description: 'Mid-term examinations for all grades.',
      time: 'Various Times',
      location: 'All Classrooms',
      isImportant: true
    },
    {
      id: 5,
      title: 'Halloween Costume Day',
      date: '2025-10-31',
      type: 'event',
      description: 'Students may wear appropriate costumes to school.',
      time: 'All Day',
      location: 'School-wide',
      isImportant: false
    },
    {
      id: 6,
      title: 'Report Cards Distributed',
      date: '2025-11-05',
      type: 'academic',
      description: 'First quarter report cards will be sent home.',
      time: 'End of Day',
      location: '',
      isImportant: true
    },
    {
      id: 7,
      title: 'Thanksgiving Break',
      date: '2025-11-25',
      endDate: '2025-11-29',
      type: 'holiday',
      description: 'Thanksgiving holiday - no classes.',
      time: 'All Day',
      location: '',
      isImportant: false
    },
    {
      id: 8,
      title: 'Winter Concert',
      date: '2025-12-15',
      type: 'event',
      description: 'Annual winter music concert featuring school bands and choir.',
      time: '7:00 PM',
      location: 'School Auditorium',
      isImportant: true
    }
  ]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting': return '👥';
      case 'holiday': return '🏖️';
      case 'event': return '🎉';
      case 'exam': return '📝';
      case 'academic': return '📊';
      default: return '📅';
    }
  };

  const getEventTypeClass = (type) => {
    switch (type) {
      case 'meeting': return 'event-meeting';
      case 'holiday': return 'event-holiday';
      case 'event': return 'event-school';
      case 'exam': return 'event-exam';
      case 'academic': return 'event-academic';
      default: return 'event-default';
    }
  };

  const formatEventDate = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (end && start.getTime() !== end.getTime()) {
      return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
    }
    return start.toLocaleDateString();
  };

  const isUpcoming = (date) => {
    const today = new Date('2025-09-25'); // Current date
    const eventDate = new Date(date);
    return eventDate >= today;
  };

  const sortedEvents = calendarEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
  const upcomingEvents = sortedEvents.filter(event => isUpcoming(event.date));

  const handleAddToCalendar = (event) => {
    alert(`"Add to Calendar" feature for "${event.title}" will be implemented with calendar integration.`);
  };

  const handleEventDetails = (event) => {
    alert(`Detailed view for "${event.title}" will show full event information and registration options.`);
  };

  return (
    <div className="parent-view-container">
      <div className="view-header">
        <button className="btn-back" onClick={onBack}>
          ← Back to Dashboard
        </button>
        <h2>School Calendar</h2>
      </div>

      {/* Calendar Header */}
      <div className="calendar-header">
        <div className="calendar-controls">
          <select 
            value={selectedMonth} 
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="month-selector"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-selector"
          >
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </div>
        <div className="calendar-info">
          <p>View important school dates, events, and holidays</p>
        </div>
      </div>

      {/* Event Categories Legend */}
      <div className="event-legend">
        <div className="legend-item">
          <span className="legend-dot event-meeting"></span>
          <span>Meetings</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot event-exam"></span>
          <span>Exams</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot event-school"></span>
          <span>School Events</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot event-holiday"></span>
          <span>Holidays</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot event-academic"></span>
          <span>Academic</span>
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="upcoming-events-section">
        <h3>Upcoming Events</h3>
        <div className="events-grid">
          {upcomingEvents.slice(0, 6).map(event => (
            <div key={event.id} className={`calendar-event-card ${getEventTypeClass(event.type)} ${event.isImportant ? 'important' : ''}`}>
              <div className="event-header">
                <div className="event-icon">{getEventTypeIcon(event.type)}</div>
                <div className="event-date-info">
                  <h4>{event.title}</h4>
                  <p className="event-date">{formatEventDate(event.date, event.endDate)}</p>
                  {event.time && <p className="event-time">{event.time}</p>}
                </div>
                {event.isImportant && <div className="important-badge">Important</div>}
              </div>
              
              <div className="event-details">
                <p className="event-description">{event.description}</p>
                {event.location && (
                  <p className="event-location">📍 {event.location}</p>
                )}
              </div>

              <div className="event-actions">
                <button 
                  className="btn-event-details"
                  onClick={() => handleEventDetails(event)}
                >
                  View Details
                </button>
                <button 
                  className="btn-add-calendar"
                  onClick={() => handleAddToCalendar(event)}
                >
                  Add to Calendar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Events List */}
      <div className="all-events-section">
        <h3>All School Events</h3>
        <div className="events-timeline">
          {sortedEvents.map(event => (
            <div key={event.id} className={`timeline-event ${getEventTypeClass(event.type)}`}>
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <span className="timeline-icon">{getEventTypeIcon(event.type)}</span>
                  <h4>{event.title}</h4>
                  <span className="timeline-date">{formatEventDate(event.date, event.endDate)}</span>
                </div>
                <p className="timeline-description">{event.description}</p>
                {event.location && (
                  <p className="timeline-location">📍 {event.location}</p>
                )}
                {event.time && (
                  <p className="timeline-time">🕐 {event.time}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {calendarEvents.length === 0 && (
        <div className="empty-state">
          <p>No calendar events found.</p>
          <p>Check back later for school events and important dates.</p>
        </div>
      )}
    </div>
  );
}

export default SchoolCalendarView;