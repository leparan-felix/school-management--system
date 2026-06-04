// src/pages/students/Grades.jsx
import React, { useState } from 'react';

const Grades = () => {
  const [selectedTerm, setSelectedTerm] = useState('2024/2025 - First Term');

  const terms = [
    '2024/2025 - First Term',
    '2023/2024 - Third Term',
    '2023/2024 - Second Term',
    '2023/2024 - First Term',
  ];

  const grades = [
    { subject: 'Mathematics', ca1: 28, ca2: 26, exam: 62, total: 116, grade: 'A', remark: 'Excellent' },
    { subject: 'English Language', ca1: 24, ca2: 25, exam: 58, total: 107, grade: 'B', remark: 'Very Good' },
    { subject: 'Physics', ca1: 22, ca2: 20, exam: 50, total: 92, grade: 'B', remark: 'Good' },
    { subject: 'Chemistry', ca1: 25, ca2: 23, exam: 55, total: 103, grade: 'B', remark: 'Very Good' },
    { subject: 'Biology', ca1: 26, ca2: 24, exam: 57, total: 107, grade: 'B', remark: 'Very Good' },
    { subject: 'Literature', ca1: 20, ca2: 18, exam: 45, total: 83, grade: 'C', remark: 'Credit' },
    { subject: 'Government', ca1: 27, ca2: 25, exam: 60, total: 112, grade: 'A', remark: 'Excellent' },
    { subject: 'CRS', ca1: 29, ca2: 28, exam: 65, total: 122, grade: 'A', remark: 'Excellent' },
    { subject: 'Agric Science', ca1: 23, ca2: 22, exam: 48, total: 93, grade: 'B', remark: 'Good' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Student Grades</h1>
        <div className="page-actions">
          <select 
            className="form-select" 
            style={{ width: 'auto', padding: '0.5rem 0.75rem' }}
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
          >
            {terms.map(term => (
              <option key={term} value={term}>{term}</option>
            ))}
          </select>
          <button className="btn btn-secondary">Download Report</button>
        </div>
      </div>

      <div className="card">
        <div style={{ marginBottom: '16px' }}>
          <p><strong>Student:</strong> Alice Johnson (STD-1001) • SS2</p>
          <p><strong>Term:</strong> {selectedTerm}</p>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>CA1</th>
                <th>CA2</th>
                <th>Exam</th>
                <th>Total</th>
                <th>Grade</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g, i) => (
                <tr key={i}>
                  <td>{g.subject}</td>
                  <td>{g.ca1}</td>
                  <td>{g.ca2}</td>
                  <td>{g.exam}</td>
                  <td><strong>{g.total}</strong></td>
                  <td><span className="badge badge--paid">{g.grade}</span></td>
                  <td>{g.remark}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--gray-200)' }}>
          <p><strong>Overall GPA:</strong> 4.2 • <strong>Class Position:</strong> 3rd out of 42</p>
        </div>
      </div>
    </div>
  );
};

export default Grades;