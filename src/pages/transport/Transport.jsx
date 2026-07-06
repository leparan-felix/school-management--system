import React, { useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/transport.json';

const emptyRoute = {
  route: '',
  driver: '',
  bus: '',
  status: 'On Time',
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

const Transport = () => {
  const [routes, setRoutes] = useJsonData('transport-routes', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState(null);
  const [form, setForm] = useState(emptyRoute);

  const handleAdd = () => {
    setEditingRoute(null);
    setForm(emptyRoute);
    setIsModalOpen(true);
  };

  const handleEdit = (route) => {
    setEditingRoute(route);
    setForm(route);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setRoutes((prev) => prev.filter((route) => route.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingRoute) {
      setRoutes((prev) => prev.map((route) => (route.id === editingRoute.id ? { ...route, ...form } : route)));
    } else {
      setRoutes((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', color: '#1e293b' }}>🚌 Transport Hub</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Manage bus routes, drivers, and service status.</p>
        </div>
        <button onClick={handleAdd} style={buttonStyle}>+ Add Route</button>
      </div>

      <div style={tableCardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr style={rowHeaderStyle}>
              <th style={cellStyle}>Route</th>
              <th style={cellStyle}>Driver</th>
              <th style={cellStyle}>Bus</th>
              <th style={cellStyle}>Status</th>
              <th style={cellStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route.id}>
                <td style={cellStyle}>{route.route}</td>
                <td style={cellStyle}>{route.driver}</td>
                <td style={cellStyle}>{route.bus}</td>
                <td style={cellStyle}>{route.status}</td>
                <td style={cellStyle}>
                  <button onClick={() => handleEdit(route)} style={rowButtonStyle}>Edit</button>
                  <button onClick={() => handleDelete(route.id)} style={{ ...rowButtonStyle, background: '#dc2626' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingRoute ? 'Edit Route' : 'Add Route'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Route" value={form.route} onChange={(event) => setForm({ ...form, route: event.target.value })} style={inputStyle} />
          <input required placeholder="Driver" value={form.driver} onChange={(event) => setForm({ ...form, driver: event.target.value })} style={inputStyle} />
          <input required placeholder="Bus" value={form.bus} onChange={(event) => setForm({ ...form, bus: event.target.value })} style={inputStyle} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={inputStyle}>
            <option value="On Time">On Time</option>
            <option value="Delayed">Delayed</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
          <button type="submit" style={buttonStyle}>{editingRoute ? 'Save route' : 'Create route'}</button>
        </form>
      </Modal>
    </div>
  );
};

export default Transport;
