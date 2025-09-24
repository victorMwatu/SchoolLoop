import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/students');
      setStudents(res.data);
    } catch (err) {
      setError('Failed to fetch students');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <h1>Welcome to SchoolLoop</h1>
        <p className="subtitle">Your comprehensive school management platform</p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>👨‍🎓 For Students</h3>
            <p>Access your classes, assignments, and grades all in one place.</p>
          </div>
          <div className="feature-card">
            <h3>👩‍🏫 For Teachers</h3>
            <p>Manage your classes, create assignments, and track student progress.</p>
          </div>
          <div className="feature-card">
            <h3>👨‍👩‍👧‍👦 For Parents</h3>
            <p>Stay updated on your child's academic progress and school activities.</p>
          </div>
        </div>

        <div className="cta-section">
          <p>Ready to get started?</p>
          <div className="cta-buttons">
            <a href="/login" className="btn btn-primary">Login</a>
            <a href="/signup" className="btn btn-secondary">Sign Up</a>
          </div>
        </div>

        <div className="student-section">
          <h2>📋 Student List</h2>
          <button onClick={fetchStudents} className="btn btn-refresh">🔄 Refresh</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <ul className="student-list">
            {students
              .sort((a, b) => a.name.localeCompare(b.name))
              .slice(0, 5)
              .map((s) => (
                <li key={s.id}>{s.name} ({s.email})</li>
              ))}
          </ul>
          {students.length > 5 && (
            <p style={{ fontStyle: 'italic' }}>
              Showing first 5 students. <a href="/students">See all</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
