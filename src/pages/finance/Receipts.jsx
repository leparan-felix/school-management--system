// src/pages/finance/Receipts.jsx
import React, { useState } from 'react';

const ReceiptsPage = () => {
  const [receipts] = useState([
    { id: 'RCT-2025-001', student: 'Alice Johnson', class: 'SS2', amount: 12000, paidOn: '2025-10-18', method: 'Bank Transfer', invoice: 'INV-2025-001' },
    { id: 'RCT-2025-002', student: 'Emeka Obi', class: 'JSS2', amount: 9500, paidOn: '2025-10-25', method: 'Cash', invoice: 'INV-2025-005' },
    { id: 'RCT-2025-003', student: 'Fatima Bello', class: 'SS3', amount: 18000, paidOn: '2025-10-30', method: 'POS', invoice: 'INV-2025-006' },
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Payment Receipts</h1>
        <div className="page-actions">
          <button className="btn btn-primary">+ New Receipt</button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Receipt #</th>
                <th>Student</th>
                <th>Class</th>
                <th>Amount</th>
                <th>Payment Method</th>
                <th>Paid On</th>
                <th>Invoice Ref</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {receipts.map((rcpt) => (
                <tr key={rcpt.id}>
                  <td>{rcpt.id}</td>
                  <td>{rcpt.student}</td>
                  <td>{rcpt.class}</td>
                  <td>₦{rcpt.amount.toLocaleString()}</td>
                  <td>{rcpt.method}</td>
                  <td>{rcpt.paidOn}</td>
                  <td>{rcpt.invoice}</td>
                  <td>
                    <button className="btn btn-secondary">Print</button>
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

export default ReceiptsPage;