import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/academic.json';

const emptySlot = {
  day: '',
  period: '',
  className: '',
  subject: '',
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

export default function Timetable() {
  const [academic, setAcademic] = useJsonData('academic-timetable', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [form, setForm] = useState(emptySlot);

  const timetable = academic.timetable;

  const handleAdd = () => {
    setEditingSlot(null);
    setForm(emptySlot);
    setIsModalOpen(true);
  };

  const handleEdit = (slot) => {
    setEditingSlot(slot);
    setForm(slot);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setAcademic((prev) => ({
      ...prev,
      timetable: prev.timetable.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingSlot) {
      setAcademic((prev) => ({
        ...prev,
        timetable: prev.timetable.map((item) => (item.id === editingSlot.id ? { ...item, ...form } : item)),
      }));
    } else {
      setAcademic((prev) => ({
        ...prev,
        timetable: [{ id: Date.now(), ...form }, ...prev.timetable],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>🗓️ Master Timetable</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Manage weekly class blocks and lesson scheduling.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Slot</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Day</th>
              <th style={cellStyle}>Period</th>
              <th style={cellStyle}>Class</th>
              <th style={cellStyle}>Subject</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((slot) => (
              <tr key={slot.id}>
                <td style={cellStyle}>{slot.day}</td>
                <td style={cellStyle}>{slot.period}</td>
                <td style={cellStyle}>{slot.className}</td>
                <td style={cellStyle}>{slot.subject}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(slot)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(slot.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingSlot ? 'Edit Schedule Slot' : 'Add Schedule Slot'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Day" value={form.day} onChange={(event) => setForm({ ...form, day: event.target.value })} style={inputStyle} />
          <input required placeholder="Period" value={form.period} onChange={(event) => setForm({ ...form, period: event.target.value })} style={inputStyle} />
          <input required placeholder="Class" value={form.className} onChange={(event) => setForm({ ...form, className: event.target.value })} style={inputStyle} />
          <input required placeholder="Subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>{editingSlot ? 'Save slot' : 'Create slot'}</button>
        </form>
      </Modal>
    </div>
  );
}
