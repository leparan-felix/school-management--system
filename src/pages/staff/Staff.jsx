import React, { useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import initialData from '../../data/staff.json';

const emptyMember = {
  name: '',
  role: '',
  status: 'Present',
};

const Staff = () => {
  const [staff, setStaff] = useJsonData('school-staff', initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form, setForm] = useState(emptyMember);

  const presentCount = useMemo(() => staff.filter((member) => member.status === 'Present').length, [staff]);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setForm(emptyMember);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditingMember(member);
    setForm(member);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setStaff((prev) => prev.filter((member) => member.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingMember) {
      setStaff((prev) => prev.map((member) => (member.id === editingMember.id ? { ...member, ...form } : member)));
    } else {
      setStaff((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    setIsModalOpen(false);
    setEditingMember(null);
    setForm(emptyMember);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 style={{ margin: '0 0 8px', color: '#1e293b' }}>👩‍🏫 Staff & Faculty</h1>
          <p style={{ margin: 0, color: '#64748b' }}>Manage staff presence, roles, and teaching assignments.</p>
        </div>
        <button onClick={handleOpenAdd} style={{ padding: '10px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          + Add Staff Member
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <p style={{ margin: '0 0 6px', color: '#64748b' }}>Total Staff</p>
          <h3 style={{ margin: 0 }}>{staff.length}</h3>
        </div>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <p style={{ margin: '0 0 6px', color: '#64748b' }}>Present Today</p>
          <h3 style={{ margin: 0 }}>{presentCount}</h3>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Name</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Role</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => (
              <tr key={member.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{member.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{member.role}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{member.status}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <button onClick={() => handleOpenEdit(member)} style={{ marginRight: '8px', padding: '6px 10px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(member.id)} style={{ padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingMember ? 'Edit Staff Member' : 'Add Staff Member'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={inputStyle} />
          <input required placeholder="Role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} style={inputStyle} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={inputStyle}>
            <option value="Present">Present</option>
            <option value="On Leave">On Leave</option>
            <option value="Away">Away</option>
          </select>
          <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{editingMember ? 'Save Member' : 'Create Member'}</button>
        </form>
      </Modal>
    </div>
  );
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  boxSizing: 'border-box',
};

export default Staff;
