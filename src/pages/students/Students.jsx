import React from 'react';
const Students = () => {
  const roster = [
    { id: 'STU001', name: 'John Doe', class: 'Grade 10-A', fees: 'Paid' },
    { id: 'STU002', name: 'Jane Smith', class: 'Grade 11-B', fees: 'Pending' }
  ];
  return (
    <div>
      <h1>👨‍🎓 Student Registry</h1>
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <div style={{ padding: '15px', background: '#e0f2fe', borderRadius: '8px' }}>Total Active: <b>245</b></div>
        <div style={{ padding: '15px', background: '#fef3c7', borderRadius: '8px' }}>New Admissions: <b>12</b></div>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr style={{ background: '#f1f5f9', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>ID</th><th style={{ padding: '12px' }}>Name</th><th style={{ padding: '12px' }}>Class</th><th style={{ padding: '12px' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {roster.map(s => (
            <tr key={s.id} style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{ padding: '12px' }}>{s.id}</td><td style={{ padding: '12px' }}>{s.name}</td><td style={{ padding: '12px' }}>{s.class}</td><td style={{ padding: '12px', color: s.fees === 'Paid' ? 'green' : 'orange' }}>{s.fees}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Students;
