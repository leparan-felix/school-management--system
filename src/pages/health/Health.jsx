import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/health.json';

const emptyIncident = {
  student: '',
  issue: '',
  status: 'Observed',
};

const buttonStyle = {
  padding: '10px 16px',
  background: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
};

const tableCardStyle = {
  background: '#fff',
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  overflowX: 'auto',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
};

const rowHeaderStyle = {
  background: '#f8fafc',
  textAlign: 'left',
};

const cellStyle = {
  padding: '10px',
  borderBottom: '1px solid #e2e8f0',
};

const rowButtonStyle = {
  padding: '6px 10px',
  background: '#f59e0b',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  marginRight: '8px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  boxSizing: 'border-box',
};

const Health = () => {
  const [incidents, setIncidents] = useJsonData('health-incidents', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIncident, setEditingIncident] = useState(null);
  const [form, setForm] = useState(emptyIncident);

  const handleAdd = () => {
    setEditingIncident(null);
    setForm(emptyIncident);
    setIsModalOpen(true);
  };

  const handleEdit = (incident) => {
    setEditingIncident(incident);
    setForm(incident);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setIncidents((prev) => prev.filter((incident) => incident.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingIncident) {
      setIncidents((prev) => prev.map((incident) => (incident.id === editingIncident.id ? { ...incident, ...form } : incident)));
    } else {
      setIncidents((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', color: '#1e293b' }}>🏥 Health / Sickbay Management</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Track student wellness visits and nurse follow-up notes.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Incident</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Student</th>
              <th style={cellStyle}>Issue</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((incident) => (
              <tr key={incident.id}>
                <td style={cellStyle}>{incident.student}</td>
                <td style={cellStyle}>{incident.issue}</td>
                <td style={cellStyle}>{incident.status}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(incident)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(incident.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingIncident ? 'Edit Health Incident' : 'Add Health Incident'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Student" value={form.student} onChange={(event) => setForm({ ...form, student: event.target.value })} style={inputStyle} />
          <input required placeholder="Issue" value={form.issue} onChange={(event) => setForm({ ...form, issue: event.target.value })} style={inputStyle} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={inputStyle}>
            <option value="Observed">Observed</option>
            <option value="Treated">Treated</option>
            <option value="Referred">Referred</option>
          </select>
          <button type="submit" style={buttonStyle}>{editingIncident ? 'Save incident' : 'Create incident'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default Health;
