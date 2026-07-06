import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/academic.json';

const emptyExam = {
  subject: '',
  date: '',
  venue: '',
  status: 'Scheduled',
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

export default function Exams() {
  const [academic, setAcademic] = useJsonData('academic-exams', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null);
  const [form, setForm] = useState(emptyExam);

  const exams = academic.exams;

  const handleAdd = () => {
    setEditingExam(null);
    setForm(emptyExam);
    setIsModalOpen(true);
  };

  const handleEdit = (exam) => {
    setEditingExam(exam);
    setForm(exam);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAcademic((prev) => ({
      ...prev,
      exams: prev.exams.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingExam) {
      setAcademic((prev) => ({
        ...prev,
        exams: prev.exams.map((item) => (item.id === editingExam.id ? { ...item, ...form } : item)),
      }));
    } else {
      setAcademic((prev) => ({
        ...prev,
        exams: [{ id: Date.now(), ...form }, ...prev.exams],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>✍️ Examination Management</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Create exam schedules and keep assessment logistics up to date.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Exam</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Subject</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Venue</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id}>
                <td style={cellStyle}>{exam.subject}</td>
                <td style={cellStyle}>{exam.date}</td>
                <td style={cellStyle}>{exam.venue}</td>
                <td style={cellStyle}>{exam.status}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(exam)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(exam.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingExam ? 'Edit Exam' : 'Add Exam'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} style={inputStyle} />
          <input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} style={inputStyle} />
          <input required placeholder="Venue" value={form.venue} onChange={(event) => setForm({ ...form, venue: event.target.value })} style={inputStyle} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={inputStyle}>
            <option value="Scheduled">Scheduled</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
          </select>
          <button type="submit" style={buttonStyle}>{editingExam ? 'Save exam' : 'Create exam'}</button>
        </form>
      </Modal>
    </div>
  );
}
