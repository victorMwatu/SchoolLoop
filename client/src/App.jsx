// App.jsx 
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import ParentDashboard from './components/ParentDashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import { MessageProvider } from './components/MessageContext';
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
    if (!user) return <Navigate to="/login" replace />;
    
    switch (user.role) {
      case 'teacher':
        return <TeacherDashboard user={user} />;
      case 'student':
        return <StudentDashboard user={user} />;
      case 'parent':
        return <ParentDashboard user={user} />;
      default:
        return <Dashboard user={user} />;
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
        <MessageProvider user={user}>
          
          {user && <Navigation user={user} setUser={setUser} />}
          
          <Routes>
            <Route
              path="/"
              element={!user ? <Home /> : <Navigate to="/dashboard" replace />}
            />
            <Route 
              path="/login" 
              element={!user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" replace />}
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup setUser={setUser} /> : <Navigate to="/dashboard" replace />}
            />
            <Route
              path="/dashboard"
              element={getDashboardComponent()}
            />
          </Routes>
        </MessageProvider>
      </div>
    </Router>
  );
}

export default App;