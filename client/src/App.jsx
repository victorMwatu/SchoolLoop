import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const getDashboardComponent = () => {
    if (!user) return <Navigate to="/login" />;
    
    switch (user.role) {
      case 'teacher':
        return <TeacherDashboard />;
      case 'student':
        return <StudentDashboard />;
      case 'parent':
        return <ParentDashboard />;
      default:
        return <Dashboard />;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navigation user={user} setUser={setUser} />
        <Routes>
          <Route
            path="/"
            element={getDashboardComponent()}
          />
          <Route 
            path="/login" 
            element={!user ? <Login setUser={setUser} /> : <Navigate to="/" />}
          />
          <Route 
            path="/signup" 
            element={!user ? <Signup setUser={setUser} /> : <Navigate to="/" />}
          />
          <Route
            path="/dashboard"
            element={getDashboardComponent()}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;