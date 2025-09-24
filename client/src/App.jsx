import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import "./App.css";

// --- Demo component to show backend data ---
function StudentList() {
  const [students, setStudents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch("http://127.0.0.1:5000/api/students")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch students");
        return res.json();
      })
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading students...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <ul>
      {students.map((s) => (
        <li key={s.id}>
          {s.name} — {s.student_class}
        </li>
      ))}
    </ul>
  );
}

// --- Main App ---
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navigation />

          {/* Demo section */}
          <div style={{ padding: "1rem" }}>
            <h2>Students (from backend)</h2>
            <StudentList />
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
