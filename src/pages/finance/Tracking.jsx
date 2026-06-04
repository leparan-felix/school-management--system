// src/pages/finance/Tracking.jsx
import React, { useState } from 'react';

const TrackingPage = () => {
  const [students] = useState([
    {
      id: 'STD-1001',
      name: 'Alice Johnson',
      class: 'SS2',
      totalFees: 45000,
      paid: 35000,
      balance: 10000,
      status: 'partial'
    },
    {
      id: 'STD-1002',
      name: 'Benson Okoro',
      class: 'JSS3',
      totalFees: 32000,
      paid: 32000,
      balance: 0,
      status: 'paid'
    },
    {
      id: 'STD-1003',
      name: 'Chiamaka Nwosu',
      class: 'SS1',
      totalFees: 48000,
      paid: 20000,
      balance: 28000,
      status: 'overdue'
    },
    {
      id: 'STD-1004',
      name: 'Daniel Ibrahim',
      class: 'JSS1',
      totalFees: 28000,
      paid: 0,
      balance: 28000,
      status: 'unpaid'
    }
  ]);

  const getBalanceClass = (status) => {
    if (status === 'paid') return 'badge--paid';
    if (status === 'overdue') return 'badge--overdue';
    if (status === 'partial') return 'badge--pending';
    return 'badge--overdue';
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Fee Tracking Dashboard</h1>
        <div className="page-actions">
          <button className="btn btn-secondary">Export Report</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--students">
          <div className="stat-label">Total Students</div>
          <div className="stat-value">142</div>
        </div>
        <div className="stat-card stat-card--revenue">
          <div className="stat-label">Collected</div>
          <div className="stat-value">₦2,845,000</div>
        </div>
        <div className="stat-card stat-card--overdue">
          <div className="stat-label">Outstanding</div>
          <div className="stat-value">₦620,000</div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student ID</th>
                <th>Name</th>
                <th>Class</th>
                <th>Total Fees</th>
                <th>Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((std) => (
                <tr key={std.id}>
                  <td>{std.id}</td>
                  <td>{std.name}</td>
                  <td>{std.class}</td>
                  <td>₦{std.totalFees.toLocaleString()}</td>
                  <td>₦{std.paid.toLocaleString()}</td>
                  <td>₦{std.balance.toLocaleString()}</td>
                  <td><span className={`badge ${getBalanceClass(std.status)}`}>{std.status.charAt(0).toUpperCase() + std.status.slice(1)}</span></td>
                  <td>
                    <button className="btn btn-secondary">View Details</button>
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

export default TrackingPage;