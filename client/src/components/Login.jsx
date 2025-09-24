import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student'
  });
const { login } = useAuth();
const navigate = useVavigate();
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');

{error && <div className="error-message">{error}</div>}

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  
  const result = await login(formData);
  
  if (result.success) {
    navigate('/');
  } else {
    setError(result.error);
  }
  setLoading(false);
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
          
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  );
}

export default Login;