import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/finance.json';

const emptyInvoice = {
  invoiceId: '',
  student: '',
  amount: '',
  status: 'Pending',
  dueDate: '',
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

export default function Invoices() {
  const [finance, setFinance] = useJsonData('finance-invoices', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [form, setForm] = useState(emptyInvoice);

  const invoices = finance.invoices;

  const handleAdd = () => {
    setEditingInvoice(null);
    setForm(emptyInvoice);
    setIsModalOpen(true);
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setForm(invoice);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setFinance((prev) => ({
      ...prev,
      invoices: prev.invoices.filter((item) => item.id !== id),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingInvoice) {
      setFinance((prev) => ({
        ...prev,
        invoices: prev.invoices.map((item) => (item.id === editingInvoice.id ? { ...item, ...form } : item)),
      }));
    } else {
      setFinance((prev) => ({
        ...prev,
        invoices: [{ id: Date.now(), ...form }, ...prev.invoices],
      }));
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>📄 Invoices Ledger</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Create and update invoice records for students.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Invoice</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Invoice ID</th>
              <th style={cellStyle}>Student</th>
              <th style={cellStyle}>Amount</th>
              <th style={cellStyle}>Due Date</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td style={cellStyle}>{invoice.invoiceId}</td>
                <td style={cellStyle}>{invoice.student}</td>
                <td style={cellStyle}>{invoice.amount}</td>
                <td style={cellStyle}>{invoice.dueDate}</td>
                <td style={cellStyle}>{invoice.status}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(invoice)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(invoice.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingInvoice ? 'Edit Invoice' : 'Add Invoice'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Invoice ID" value={form.invoiceId} onChange={(event) => setForm({ ...form, invoiceId: event.target.value })} style={inputStyle} />
          <input required placeholder="Student" value={form.student} onChange={(event) => setForm({ ...form, student: event.target.value })} style={inputStyle} />
          <input required placeholder="Amount" value={form.amount} onChange={(event) => setForm({ ...form, amount: event.target.value })} style={inputStyle} />
          <input required type="date" value={form.dueDate} onChange={(event) => setForm({ ...form, dueDate: event.target.value })} style={inputStyle} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={inputStyle}>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
          <button type="submit" style={buttonStyle}>{editingInvoice ? 'Save invoice' : 'Create invoice'}</button>
        </form>
      </Modal>
    </div>
  );
}
