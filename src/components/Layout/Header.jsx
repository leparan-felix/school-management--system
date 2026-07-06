import React from 'react';

export default function Header() {
  return (
    <header style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 30px', 
      height: '65px',
      background: '#ffffff', 
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.05)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '22px' }}>🏫</span>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#0f172a', letterSpacing: '-0.5px' }}>
          EduPulse <span style={{ color: '#2563eb', fontSize: '12px', fontWeight: '500', verticalAlign: 'super', marginLeft: '4px' }}>v1.0</span>
        </h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b' }}>Administrator Profile</div>
          <div style={{ fontSize: '11px', color: '#64748b' }}>System Superuser</div>
        </div>
        <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold', color: '#475569' }}>
          AD
        </div>
      </div>
    </header>
  );
}
