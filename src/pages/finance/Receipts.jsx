import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/finance.json';

const emptyReceipt = {
  receiptId: '',
  student: '',
  amount: '',
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

export default function Receipts() {
  const [finance, setFinance] = useJsonData('finance-receipts', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReceipt, setEditingReceipt] = useState(null);
  const [form, setForm] = useState(emptyReceipt);

  const receipts = finance.receipts;

  const handleAdd = () => {
    setEditingReceipt(null);
    setForm(emptyReceipt);
    setIsModalOpen(true);
  };

  const handleEdit = (receipt) => {
    setEditingReceipt(receipt);
    setForm({ receiptId: receipt.receiptId, student: receipt.student, amount: receipt.amount, date: receipt.date });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setFinance((prev) => ({
      ...prev,
      receipts: prev.receipts.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingReceipt) {
      setFinance((prev) => ({
        ...prev,
        receipts: prev.receipts.map((item) => (item.id === editingReceipt.id ? { ...item, ...form } : item)),
      }));
    } else {
      setFinance((prev) => ({
        ...prev,
        receipts: [{ id: Date.now(), ...form }, ...prev.receipts],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>🧾 Payment Receipts Vault</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Create and manage completed receipt records.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Receipt</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Receipt</th>
              <th style={cellStyle}>Student</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Date</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {receipts.map((item) => (
              <tr key={item.id}>
                <td style={cellStyle}>{item.receiptId}</td>
                <td style={cellStyle}>{item.student}</td>
                <td style={cellStyle}>{item.amount}</td>
                <td style={cellStyle}>{item.date}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(item)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(item.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingReceipt ? 'Edit Receipt' : 'Add Receipt'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Receipt ID" value={form.receiptId} onChange={(event) => setForm({ ...form, receiptId: event.target.value })} style={inputStyle} />
          <input required placeholder="Student" value={form.student} onChange={(event) => setForm({ ...form, student: event.target.value })} style={inputStyle} />
          <input required placeholder="Amount" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} style={inputStyle} />
          <input required type="date" value={form.date} onChange={(event) => setForm({ ...form, date: event.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>{editingReceipt ? 'Save receipt' : 'Create receipt'}</button>
        </form>
      </Modal>
    </div>
  );
}
