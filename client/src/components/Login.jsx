import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ setUser }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    const response = await fetch('https://schoolloop-2.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password
      })
    });

    // Add detailed error logging
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Login error details:', {
        status: response.status,
        statusText: response.statusText,
        errorData: errorData
      });
      setError(errorData.msg || `Login failed (${response.status})`);
      return;
    }

    const data = await response.json();
    console.log('Login success:', data); // Log success to see actual response

    localStorage.setItem('token', data.access_token);
    localStorage.setItem('user', JSON.stringify({
      id: data.user_id,
      email: formData.email,
      role: data.role,
      name: data.name 
    }));

    setUser({
      id: data.user_id,
      email: formData.email,
      role: data.role,
      name: data.name 
    });

    navigate('/dashboard');
  } catch (err) {
    console.error('Network error:', err);
    setError('Network error. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login to SchoolLoop</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="role">I am a:</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {error && <div className="error-message">{error}</div>}

        <div className="form-links">
          <p>Don't have an account? <a href="/signup">Sign up here</a></p>
          <p><a href="/">← Back to Home</a></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
