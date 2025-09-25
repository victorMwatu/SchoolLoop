import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Navigation Header */}
      <nav className="home-nav">
        <div className="nav-content">
          <div className="logo-section">
            <h1 className="school-logo">🏫 SchoolLoop</h1>
            <p className="school-tagline">Your School Management System</p>
          </div>
          <div className="nav-links">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="highlight">SchoolLoop</span>
          </h1>
          <p className="hero-subtitle">
            Connecting Teachers, Students, and Parents in One Comprehensive Platform
          </p>
          <p className="hero-description">
            Streamline your school experience with our all-in-one management system. 
            Track assignments, communicate with teachers, monitor progress, and stay 
            updated with school events.
          </p>
          <div className="hero-buttons">
            <Link to="/login" className="btn btn-primary">Get Started</Link>
            <a href="#features" className="btn btn-secondary">Learn More</a>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">
            📚 🎓 👨‍🏫 👩‍🎓 📊
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-content">
          <h2 className="section-title">Everything You Need for School Management</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍🏫</div>
              <h3>For Teachers</h3>
              <ul>
                <li>Create and manage assignments</li>
                <li>Communicate with parents</li>
                <li>Track student progress</li>
                <li>Send announcements</li>
              </ul>
              <Link to="/login" className="feature-btn">Teacher Login</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👩‍🎓</div>
              <h3>For Students</h3>
              <ul>
                <li>View assignments and due dates</li>
                <li>Submit homework online</li>
                <li>Read teacher messages</li>
                <li>Track academic progress</li>
              </ul>
              <Link to="/login" className="feature-btn">Student Login</Link>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👨‍👩‍👧‍👦</div>
              <h3>For Parents</h3>
              <ul>
                <li>Monitor child's assignments</li>
                <li>Communicate with teachers</li>
                <li>View academic progress</li>
                <li>Acknowledge school notices</li>
              </ul>
              <Link to="/login" className="feature-btn">Parent Login</Link>
            </div>
          </div>
        </div>
      </section>

      {/* School Info Section - Customizable for your school */}
      <section className="school-info-section">
        <div className="section-content">
          <h2 className="section-title">About Our School</h2>
          <div className="school-info-grid">
            <div className="info-card">
              <div className="info-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>
                To provide quality education and foster a collaborative environment 
                between teachers, students, and parents through innovative technology.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">📈</div>
              <h3>Academic Excellence</h3>
              <p>
                Track student progress with real-time updates, comprehensive 
                grade reporting, and detailed academic analytics.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🤝</div>
              <h3>Community</h3>
              <p>
                Building strong connections between all stakeholders in the 
                educational process through effective communication tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="section-content">
          <h2 className="section-title">How SchoolLoop Works</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Sign Up & Login</h3>
                <p>Create your account as a Teacher, Student, or Parent</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Access Your Dashboard</h3>
                <p>Get a personalized dashboard based on your role</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Stay Connected</h3>
                <p>Communicate, track progress, and manage assignments</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Options Section */}
      <section className="login-section">
        <div className="section-content">
          <h2 className="section-title">Ready to Get Started?</h2>
          <p className="login-description">
            Choose your role to access your personalized dashboard
          </p>
          <div className="login-options">
            <Link to="/login" className="login-card teacher-login">
              <div className="login-icon">👨‍🏫</div>
              <h3>Teacher Portal</h3>
              <p>Manage classes, assignments, and student progress</p>
            </Link>
            
            <Link to="/login" className="login-card student-login">
              <div className="login-icon">👩‍🎓</div>
              <h3>Student Portal</h3>
              <p>View assignments, grades, and school updates</p>
            </Link>
            
            <Link to="/login" className="login-card parent-login">
              <div className="login-icon">👨‍👩‍👧‍👦</div>
              <h3>Parent Portal</h3>
              <p>Monitor your child's academic journey</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>SchoolLoop</h3>
            <p>Making school management simple and effective for everyone.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign Up</Link></li>
              <li><a href="#features">Features</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Info</h4>
            <p>📧 Email: info@yourschool.edu</p>
            <p>📞 Phone: (555) 123-4567</p>
            <p>📍 Address: [Your School Address]</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 SchoolLoop. All rights reserved. | Customizable for Your School</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;