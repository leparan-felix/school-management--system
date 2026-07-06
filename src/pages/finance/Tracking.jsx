import React, { useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/finance.json';

const emptyRecord = {
  student: '',
  amount: '',
  dueDate: '',
  status: 'Pending',
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

export default function Tracking() {
  const [finance, setFinance] = useJsonData('finance-tracking', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyRecord);

  const overdue = finance.tracking;
  const totalCollected = useMemo(() => overdue.reduce((sum, item) => sum + Number(item.amount.replace(/[^0-9]/g, '')), 0), [overdue]);
  const outstanding = useMemo(() => overdue.filter((item) => item.status === 'Pending').length, [overdue]);

  const handleAdd = () => {
    setEditingItem(null);
    setForm(emptyRecord);
    setIsModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingItem(record);
    setForm(record);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setFinance((prev) => ({
      ...prev,
      tracking: prev.tracking.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingItem) {
      setFinance((prev) => ({
        ...prev,
        tracking: prev.tracking.map((item) => (item.id === editingItem.id ? { ...item, ...form } : item)),
      }));
    } else {
      setFinance((prev) => ({
        ...prev,
        tracking: [{ id: Date.now(), ...form }, ...prev.tracking],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>📊 Fee Collections Tracker</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Track outstanding fees and manage individual payment records.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Balance</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={cardStyle}>
          <p style={statLabel}>Total tracking records</p>
          <h3 style={statValue}>{overdue.length}</h3>
        </div>
        <div style={cardStyle}>
          <p style={statLabel}>Pending balances</p>
          <h3 style={statValue}>{outstanding}</h3>
        </div>
        <div style={cardStyle}>
          <p style={statLabel}>Collected this term</p>
          <h3 style={statValue}>KES {totalCollected.toLocaleString()}</h3>
        </div>
      </div>

      <div style={tableCardStyle}>
        <h3 style={{ margin: '0 0 12px' }}>Fee Records</h3>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Student</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Due Date</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {overdue.map((item) => (
              <tr key={item.id}>
                <td style={cellStyle}>{item.student}</td>
                <td style={cellStyle}>{item.amount}</td>
                <td style={cellStyle}>{item.dueDate}</td>
                <td style={cellStyle}>{item.status}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(item)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingItem ? 'Edit Fee Record' : 'Add Fee Record'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Student" value={form.student} onChange={(event) => setForm({ ...form, student: event.target.value })} style={inputStyle} />
          <input required placeholder="Amount" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} style={inputStyle} />
          <input required type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} style={inputStyle} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={inputStyle}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
          <button type="submit" style={buttonStyle}>{editingItem ? 'Save record' : 'Create record'}</button>
        </form>
      </Modal>
    </div>
  );
}
