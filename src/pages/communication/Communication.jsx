import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/communication.json';

const emptyMessage = {
  title: '',
  audience: '',
  date: '',
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

const Communication = () => {
  const [messages, setMessages] = useJsonData('communication-messages', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [form, setForm] = useState(emptyMessage);

  const handleAdd = () => {
    setEditingMessage(null);
    setForm(emptyMessage);
    setIsModalOpen(true);
  };

  const handleEdit = (message) => {
    setEditingMessage(message);
    setForm(message);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingMessage) {
      setMessages((prev) => prev.map((message) => (message.id === editingMessage.id ? { ...message, ...form } : message)));
    } else {
      setMessages((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', color: '#1e293b' }}>🔔 Announcements & Messaging</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Create and manage school announcements for parents, teachers, and students.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Message</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Title</th>
              <th style={cellStyle}>Audience</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td style={cellStyle}>{message.title}</td>
                <td style={cellStyle}>{message.audience}</td>
                <td style={cellStyle}>{message.date}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(message)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(message.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMessage ? 'Edit Message' : 'Add Message'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} style={inputStyle} />
          <input required placeholder="Audience" value={form.audience} onChange={(event) => setForm({ ...form, audience: event.target.value })} style={inputStyle} />
          <input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>{editingMessage ? 'Save message' : 'Create message'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default Communication;
