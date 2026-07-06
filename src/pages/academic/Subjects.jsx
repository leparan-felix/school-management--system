import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/academic.json';

const emptySubject = {
  name: '',
  level: '',
  lessons: '',
  teacher: '',
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

export default function Subjects() {
  const [academic, setAcademic] = useJsonData('academic-subjects', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);
  const [form, setForm] = useState(emptySubject);

  const subjects = academic.subjects;

  const handleAdd = () => {
    setEditingSubject(null);
    setForm(emptySubject);
    setIsModalOpen(true);
  };

  const handleEdit = (subject) => {
    setEditingSubject(subject);
    setForm(subject);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAcademic((prev) => ({
      ...prev,
      subjects: prev.subjects.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingSubject) {
      setAcademic((prev) => ({
        ...prev,
        subjects: prev.subjects.map((item) => (item.id === editingSubject.id ? { ...item, ...form } : item)),
      }));
    } else {
      setAcademic((prev) => ({
        ...prev,
        subjects: [{ id: Date.now(), ...form }, ...prev.subjects],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>🧬 Core Subjects Matrix</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Manage curriculum subjects, lessons, and assigned teachers.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Subject</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Subject</th>
              <th style={cellStyle}>Level</th>
              <th style={cellStyle}>Lessons / Week</th>
              <th style={cellStyle}>Teacher</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <td style={cellStyle}>{subject.name}</td>
                <td style={cellStyle}>{subject.level}</td>
                <td style={cellStyle}>{subject.lessons}</td>
                <td style={cellStyle}>{subject.teacher}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(subject)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(subject.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSubject ? 'Edit Subject' : 'Add Subject'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Subject" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={inputStyle} />
          <input required placeholder="Level" value={form.level} onChange={(event) => setForm({ ...form, level: event.target.value })} style={inputStyle} />
          <input required placeholder="Lessons per week" value={form.lessons} onChange={(event) => setForm({ ...form, lessons: event.target.value })} style={inputStyle} />
          <input required placeholder="Teacher" value={form.teacher} onChange={(event) => setForm({ ...form, teacher: event.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>{editingSubject ? 'Save subject' : 'Create subject'}</button>
        </form>
      </Modal>
    </div>
  );
}
