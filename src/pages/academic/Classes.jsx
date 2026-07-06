import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/academic.json';

const emptyClass = {
  name: '',
  teacher: '',
  strength: '',
  stream: '',
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

export default function Classes() {
  const [academic, setAcademic] = useJsonData('academic-classes', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [form, setForm] = useState(emptyClass);

  const classes = academic.classes;

  const handleAdd = () => {
    setEditingClass(null);
    setForm(emptyClass);
    setIsModalOpen(true);
  };

  const handleEdit = (classItem) => {
    setEditingClass(classItem);
    setForm(classItem);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAcademic((prev) => ({
      ...prev,
      classes: prev.classes.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingClass) {
      setAcademic((prev) => ({
        ...prev,
        classes: prev.classes.map((item) => (item.id === editingClass.id ? { ...item, ...form } : item)),
      }));
    } else {
      setAcademic((prev) => ({
        ...prev,
        classes: [{ id: Date.now(), ...form }, ...prev.classes],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>🏫 Classroom Divisions</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Manage class groups, teacher assignments, and student strength.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Class</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Class Name</th>
              <th style={cellStyle}>Teacher</th>
              <th style={cellStyle}>Strength</th>
              <th style={cellStyle}>Stream</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem.id}>
                <td style={cellStyle}>{classItem.name}</td>
                <td style={cellStyle}>{classItem.teacher}</td>
                <td style={cellStyle}>{classItem.strength}</td>
                <td style={cellStyle}>{classItem.stream}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(classItem)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(classItem.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingClass ? 'Edit Class' : 'Add Class'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Class name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={inputStyle} />
          <input required placeholder="Teacher" value={form.teacher} onChange={(event) => setForm({ ...form, teacher: event.target.value })} style={inputStyle} />
          <input required placeholder="Strength" value={form.strength} onChange={(event) => setForm({ ...form, strength: event.target.value })} style={inputStyle} />
          <input required placeholder="Stream" value={form.stream} onChange={(event) => setForm({ ...form, stream: event.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>{editingClass ? 'Save class' : 'Create class'}</button>
        </form>
      </Modal>
    </div>
  );
}
