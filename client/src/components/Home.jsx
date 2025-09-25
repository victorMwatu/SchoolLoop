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
            <h1 className="school-logo">🚀 Moringa SchoolLoop</h1>
            <p className="school-tagline">Africa's Premier Tech Bootcamp</p>
          </div>
          <div className="nav-links">
            <a href="#features" className="nav-link">Programs</a>
            <a href="#courses" className="nav-link">Courses</a>
            <a href="#about" className="nav-link">About</a>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/signup" className="nav-link signup-link">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Shape Your Future with <span className="highlight">Africa's Top Tech Bootcamp</span>
          </h1>
          <p className="hero-subtitle">
            Whether you are a student or professional, Moringa School offers world-class
            tech training tailored to your journey.
          </p>
          <p className="hero-description">
            Master Software Engineering, Data Science, Cybersecurity, AI, and more. 
            Join thousands of graduates who've transformed their careers with our 
            intensive, hands-on bootcamp programs.
          </p>
          
          {/* Tech Learning Features */}
          <div className="tech-features">
            <div className="feature-item">
              <span className="feature-icon">⏰</span>
              <span>Full-time Bootcamps</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🗓️</span>
              <span>Part-time Classes</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">💻</span>
              <span>Remote Learning</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏫</span>
              <span>In-person Training</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Start Your Journey</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-illustration">
            � � ⚡ � �️
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="section-content">
          <h2 className="section-title">Everything You Need for Tech Education Management</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👨‍💻</div>
              <h3>For Instructors</h3>
              <ul>
                <li>Create coding assignments & projects</li>
                <li>Share technical resources</li>
                <li>Track coding progress & skills</li>
                <li>Conduct code reviews</li>
                <li>Manage bootcamp curriculum</li>
              </ul>

            </div>
            
            <div className="feature-card">
              <div className="feature-icon">�</div>
              <h3>For Students</h3>
              <ul>
                <li>Access coding challenges</li>
                <li>Submit GitHub repositories</li>
                <li>Join pair programming sessions</li>
                <li>Track technical skills growth</li>
                <li>Connect with tech mentors</li>
              </ul>

            </div>
            
            <div className="feature-card">
              <div className="feature-icon">�</div>
              <h3>For Career Services</h3>
              <ul>
                <li>Monitor coding progress</li>
                <li>Track job readiness</li>
                <li>View portfolio development</li>
                <li>Access bootcamp updates</li>
                <li>Support career transition</li>
              </ul>

            </div>
          </div>
        </div>
      </section>

      {/* Tech Courses Section */}
      <section id="courses" className="courses-section">
        <div className="section-content">
          <h2 className="section-title">Our Tech Programs</h2>
          <p className="section-subtitle">Choose from our industry-leading bootcamp programs</p>

          <div className="course-details">
            <div className="course-info">
              <h3>Full-Stack Software Engineering</h3>
              <p>Master modern web development with React, Node.js, Python, and database technologies. Build real-world applications and deploy to the cloud.</p>
              <div className="course-features">
                <span className="course-tag">15 Weeks</span>
                <span className="course-tag">Full-time</span>
                <span className="course-tag">Job Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* School Info Section - Moringa School Info */}
      <section className="school-info-section">
        <div className="section-content">
          <h2 className="section-title">About Moringa School</h2>
          <div className="school-info-grid">
            <div className="info-card">
              <div className="info-icon">🚀</div>
              <h3>Our Mission</h3>
              <p>
                To nurture Africa's tech talent by providing world-class coding bootcamps 
                that bridge the gap between education and industry needs. We create 
                skilled developers ready for the global tech market.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">�</div>
              <h3>Hands-on Learning</h3>
              <p>
                Learn by building real projects. Our curriculum focuses on practical 
                skills with mentorship from industry experts, pair programming, 
                and project-based assessments.
              </p>
            </div>
            
            <div className="info-card">
              <div className="info-icon">🌍</div>
              <h3>Impact & Community</h3>
              <p>
                Join a vibrant community of 3000+ alumni working at top tech companies 
                across Africa and globally. 85% job placement rate within 6 months 
                of graduation.
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