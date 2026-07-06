import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/library.json';

const emptyBook = {
  title: '',
  borrower: '',
  due: '',
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

const Library = () => {
  const [books, setBooks] = useJsonData('library-books', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form, setForm] = useState(emptyBook);

  const handleAdd = () => {
    setEditingBook(null);
    setForm(emptyBook);
    setIsModalOpen(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setForm(book);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingBook) {
      setBooks((prev) => prev.map((book) => (book.id === editingBook.id ? { ...book, ...form } : book)));
    } else {
      setBooks((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', color: '#1e293b' }}>📖 Library Catalog</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Track borrowed books and due dates.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Book</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Title</th>
              <th style={cellStyle}>Borrower</th>
              <th style={cellStyle}>Due Date</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td style={cellStyle}>{book.title}</td>
                <td style={cellStyle}>{book.borrower}</td>
                <td style={cellStyle}>{book.due}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(book)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(book.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingBook ? 'Edit Book' : 'Add Book'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Title" value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} style={inputStyle} />
          <input required placeholder="Borrower" value={form.borrower} onChange={(event) => setForm({ ...form, borrower: event.target.value })} style={inputStyle} />
          <input required type="date" value={form.due} onChange={(event) => setForm({ ...form, due: event.target.value })} style={inputStyle} />
          <button type="submit" style={buttonStyle}>{editingBook ? 'Save book' : 'Create book'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default Library;
