// src/pages/finance/Invoices.jsx
import React, { useState } from 'react';

const InvoicesPage = () => {
  const [invoices] = useState([
    { id: 'INV-001', student: 'Alice Johnson', amount: 1200, status: 'paid', due: '2025-10-15' },
    { id: 'INV-002', student: 'Bob Smith', amount: 850, status: 'pending', due: '2025-11-01' },
    { id: 'INV-003', student: 'Carol Davis', amount: 2500, status: 'overdue', due: '2025-09-30' },
  ]);

  const getStatusClass = (status) => {
    return `badge badge--${status}`;
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Manage Invoices</h1>
        <div className="page-actions">
          <button className="btn btn-primary">+ New Invoice</button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card stat-card--revenue">
          <div className="stat-label">Total Revenue</div>
          <div className="stat-value">$87,500</div>
        </div>
        <div className="stat-card stat-card--pending">
          <div className="stat-label">Pending</div>
          <div className="stat-value">$12,300</div>
        </div>
        <div className="stat-card stat-card--overdue">
          <div className="stat-label">Overdue</div>
          <div className="stat-value">$3,200</div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Invoice #</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.id}</td>
                  <td>{inv.student}</td>
                  <td>${inv.amount.toFixed(2)}</td>
                  <td><span className={getStatusClass(inv.status)}>{inv.status}</span></td>
                  <td>{inv.due}</td>
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

export default InvoicesPage;