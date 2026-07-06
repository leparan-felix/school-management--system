import React from 'react';

const DashboardStat = ({ label, value, icon, color = '#2563eb', subtitle }) => {
  const cardStyle = {
    display: 'flex',
    gap: '12px',
    alignItems: 'center',
    padding: '18px',
    borderRadius: '12px',
    color: '#fff',
    background: `linear-gradient(135deg, ${color} 0%, rgba(255,255,255,0.06) 100%)`,
    boxShadow: '0 8px 24px rgba(16,24,40,0.08)',
  };

  const iconWrap = {
    width: 56,
    height: 56,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.12)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20,
  };

  const valueStyle = { fontSize: 22, fontWeight: 700, margin: 0 };
  const labelStyle = { margin: 0, opacity: 0.9 };
  const subtitleStyle = { margin: 0, fontSize: 12, opacity: 0.85 };

  return (
    <div style={cardStyle}>
      <div style={iconWrap}>{icon}</div>
      <div style={{ flex: 1 }}>
        <p style={labelStyle}>{label}</p>
        <h3 style={valueStyle}>{value}</h3>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>
    </div>
  );
};

export default DashboardStat;
