import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/reports.json';

const emptyReport = {
  name: '',
  type: '',
  updated: '',
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

const Reports = () => {
  const [reports, setReports] = useJsonData('reports-data', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [form, setForm] = useState(emptyReport);

  const handleAdd = () => {
    setEditingReport(null);
    setForm(emptyReport);
    setIsModalOpen(true);
  };

  const handleEdit = (report) => {
    setEditingReport(report);
    setForm(report);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setReports((prev) => prev.filter((report) => report.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingReport) {
      setReports((prev) => prev.map((report) => (report.id === editingReport.id ? { ...report, ...form } : report)));
    } else {
      setReports((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', color: '#1e293b' }}>📝 Report Cards & Transcripts</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Manage generated school reports and transcript updates.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Report</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Name</th>
              <th style={cellStyle}>Type</th>
              <th style={cellStyle}>Updated</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td style={cellStyle}>{report.name}</td>
                <td style={cellStyle}>{report.type}</td>
                <td style={cellStyle}>{report.updated}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(report)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(report.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingReport ? 'Edit Report' : 'Add Report'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={inputStyle} />
          <input required placeholder="Type" value={form.type} onChange={(event) => setForm({ ...form, type: event.target.value })} style={inputStyle} />
          <input required type="date" value={form.updated} onChange={(event) => setForm({ ...form, updated: event.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>{editingReport ? 'Save report' : 'Create report'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default Reports;
