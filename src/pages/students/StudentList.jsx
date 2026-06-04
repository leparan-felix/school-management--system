// src/pages/students/StudentList.jsx
import React, { useState } from 'react';
// import TableSearch from '../../components/shared/TableSearch';

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    { id: 'STD-1001', name: 'Alice Johnson', class: 'SS2', admissionDate: '2023-09-01', status: 'active', parentPhone: '+234 803 123 4567' },
    { id: 'STD-1002', name: 'Benson Okoro', class: 'JSS3', admissionDate: '2022-09-05', status: 'active', parentPhone: '+234 806 987 6543' },
    { id: 'STD-1003', name: 'Chiamaka Nwosu', class: 'SS1', admissionDate: '2024-01-15', status: 'suspended', parentPhone: '+234 701 234 5678' },
    { id: 'STD-1004', name: 'Daniel Ibrahim', class: 'JSS1', admissionDate: '2024-09-02', status: 'active', parentPhone: '+234 812 345 6789' },
    { id: 'STD-1005', name: 'Fatima Bello', class: 'SS3', admissionDate: '2021-09-01', status: 'graduated', parentPhone: '+234 809 876 5432' },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusClass = (status) => {
    if (status === 'active') return 'badge--paid';
    if (status === 'suspended') return 'badge--overdue';
    return 'badge--pending';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Student Directory</h1>
        <div className="page-actions">
          <button className="btn btn-primary">+ Add Student</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--students">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">142</div>
        </div>
        <div className="stat-card stat-card--revenue">
          <div className="stat-label">Active</div>
          <div className="stat-value">136</div>
        </div>
        <div className="stat-card stat-card--overdue">
          <div className="stat-label">Suspended</div>
          <div className="stat-value">3</div>
        </div>
        <div className="stat-card stat-card--pending">
          <div className="stat-label">Graduated</div>
          <div className="stat-value">52</div>
        </div>
      </div>

      <div className="card">
        <TableSearch 
          value={searchTerm} 
          onChange={setSearchTerm} 
          placeholder="Search by name, ID, or class..." 
        />

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Admission Date</th>
                <th>Status</th>
                <th>Parent Contact</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((std) => (
                <tr key={std.id}>
                  <td>{std.id}</td>
                  <td>{std.name}</td>
                  <td>{std.class}</td>
                  <td>{std.admissionDate}</td>
                  <td><span className={`badge ${getStatusClass(std.status)}`}>{std.status}</span></td>
                  <td>{std.parentPhone}</td>
                  <td>
                    <button className="btn btn-secondary">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentList;