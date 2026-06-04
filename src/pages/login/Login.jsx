import React, { useState } from 'react';

const Login = () => {
  // State hook definitions (Week 3, Fig 5)
  const [admissionNo, setAdmissionNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [strengthFeedback, setStrengthFeedback] = useState('');
  const [strengthColor, setStrengthColor] = useState('#94a3b8');

  // Password structural evaluation logic (Week 3, Fig 2)
  const checkPasswordStrength = (value) => {
    setPassword(value);
    if (!value) {
      setStrengthFeedback('');
      return;
    }
    
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
    if (strongRegex.test(value)) {
      setStrengthFeedback('🟢 Strong Security Profile');
      setStrengthColor('#10b981'); // Emerald
    } else if (value.length >= 6) {
      setStrengthFeedback('🟡 Moderate: Introduce capitalizations & numerals');
      setStrengthColor('#f59e0b'); // Amber
    } else {
      setStrengthFeedback('🔴 Vulnerable Configuration: Minimum 6 keys required');
      setStrengthColor('#f43f5e'); // Rose
    }
  };

  // Form submission interceptor (Week 3, Fig 1)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!admissionNo.trim()) {
      setError('Admission number verification parameter cannot be empty!');
      return;
    }
    if (!password) {
      setError('Security access password field cannot be empty!');
      return;
    }

    setError('');
    console.log('Sending payload securely:', { admissionNo, password });
    alert(`Authentication success! Welcome back registration: ${admissionNo}`);
    window.location.href = '/dashboard';
  };

  return (
    /* Outer wrapper using inline styles to force dead-centering on the screen */
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f1f5f9',
      fontFamily: 'system-ui, sans-serif',
      boxSizing: 'border-box',
      margin: 0,
      padding: '16px',
      zIndex: 99999
    }}>
      
      {/* Form Card Container */}
      <div style={{
        width: '100%',
        maxWidth: '420px',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '32px',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        boxSizing: 'border-box'
      }}>
        
        {/* Branding Typography Blocks */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, tracking: '-0.025em', color: '#0f172a', margin: '0 0 8px 0' }}>
            School Management System
          </h2>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#64748b', margin: 0 }}>
            Centralized Portal Authentication Gateway
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Admission Number Entry Block */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="admissionNo" style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', tracking: '0.05em', color: '#334155', marginBottom: '8px' }}>
              Admission Number
            </label>
            <input
              type="text"
              id="admissionNo"
              name="admissionNo"
              placeholder="e.g., BSCCS/2025/56294"
              value={admissionNo}
              onChange={(e) => setAdmissionNo(e.target.value)}
              style={{
                width: '100%',
                borderRadius: '8px',
                border: error && !admissionNo ? '1px solid #f43f5e' : '1px solid #cbd5e1',
                backgroundColor: error && !admissionNo ? '#fff1f2' : '#ffffff',
                padding: '10px 16px',
                fontSize: '16px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {error && !admissionNo && (
              <span style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#e11d48' }}>
                ⚠️ {error}
              </span>
            )}
          </div>

          {/* Password Security Entry Block */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="password" style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', tracking: '0.05em', color: '#334155', marginBottom: '8px' }}>
              Password Secure Key
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => checkPasswordStrength(e.target.value)}
              style={{
                width: '100%',
                borderRadius: '8px',
                border: error && !password ? '1px solid #f43f5e' : '1px solid #cbd5e1',
                backgroundColor: error && !password ? '#fff1f2' : '#ffffff',
                padding: '10px 16px',
                fontSize: '16px',
                color: '#0f172a',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {error && !password && (
              <span style={{ marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600, color: '#e11d48' }}>
                ⚠️ {error}
              </span>
            )}
            {strengthFeedback && (
              <span style={{ marginTop: '10px', borderRadius: '6px', border: `1px solid ${strengthColor}`, padding: '4px 10px', textAlign: 'center', fontSize: '12px', fontWeight: 500, color: strengthColor, backgroundColor: '#ffffff' }}>
                {strengthFeedback}
              </span>
            )}
          </div>

          {/* Action Submission Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              borderRadius: '8px',
              backgroundColor: '#2563eb',
              padding: '12px 0',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              tracking: '0.05em',
              color: '#ffffff',
              border: 'none',
              cursor: 'pointer',
              marginTop: '8px',
              boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)'
            }}
          >
            Authenticate Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
