// src/pages/students/StudentProfile.jsx
import React from 'react';

const StudentProfile = () => {
  // In real app, this would come from URL params + API
  const student = {
    id: 'STD-1001',
    name: 'Alice Johnson',
    class: 'SS2',
    dateOfBirth: '2007-05-12',
    gender: 'Female',
    address: '15, Adebayo Street, Lekki, Lagos',
    parentName: 'Mrs. Grace Johnson',
    parentPhone: '+234 803 123 4567',
    email: 'alice.j@example.com',
    admissionDate: '2023-09-01',
    status: 'active',
    photo: null, // or URL
  };

  const academicRecords = [
    { term: '2024/2025 - First Term', subjects: 9, gpa: 4.2, rank: '3rd' },
    { term: '2023/2024 - Third Term', subjects: 9, gpa: 4.5, rank: '1st' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Student Profile</h1>
        <div className="page-actions">
          <button className="btn btn-secondary">Edit Profile</button>
          <button className="btn btn-primary">Generate Report</button>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Personal Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div><strong>Full Name:</strong> {student.name}</div>
          <div><strong>Student ID:</strong> {student.id}</div>
          <div><strong>Class:</strong> {student.class}</div>
          <div><strong>Date of Birth:</strong> {student.dateOfBirth}</div>
          <div><strong>Gender:</strong> {student.gender}</div>
          <div><strong>Admission Date:</strong> {student.admissionDate}</div>
          <div><strong>Status:</strong> <span className="badge badge--paid">Active</span></div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Contact & Guardian</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
          <div><strong>Address:</strong> {student.address}</div>
          <div><strong>Parent/Guardian:</strong> {student.parentName}</div>
          <div><strong>Phone:</strong> {student.parentPhone}</div>
          <div><strong>Email:</strong> {student.email || '—'}</div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Academic Summary</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Term</th>
                <th>Subjects</th>
                <th>GPA</th>
                <th>Class Rank</th>
              </tr>
            </thead>
            <tbody>
              {academicRecords.map((rec, i) => (
                <tr key={i}>
                  <td>{rec.term}</td>
                  <td>{rec.subjects}</td>
                  <td>{rec.gpa}</td>
                  <td>{rec.rank}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;