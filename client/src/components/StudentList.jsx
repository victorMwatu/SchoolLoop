import React, { useEffect, useState } from 'react';

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data));
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Students</h2>
      <ul>
        {students
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((s) => (
            <li key={s.id}>{s.name} ({s.email})</li>
          ))}
      </ul>
    </div>
  );
}

export default StudentList;
