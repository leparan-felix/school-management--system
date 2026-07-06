import React, { useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import studentsData from '../../data/students.json';

const emptyForm = {
  name: '',
  admission: '',
  className: '',
  guardian: '',
  contact: '',
  status: 'Active',
  attendance: '',
};

export default function List() {
  const [students, setStudents] = useJsonData('school-students', studentsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setEditingStudent(student);
    setForm({ ...student });
    setIsModalOpen(true);
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (editingStudent) {
      setStudents((prev) =>
        prev.map((student) => (student.id === editingStudent.id ? { ...student, ...form } : student))
      );
    } else {
      const newStudent = {
        id: Date.now(),
        ...form,
      };
      setStudents((prev) => [newStudent, ...prev]);
    }

    setIsModalOpen(false);
    setForm(emptyForm);
    setEditingStudent(null);
  };

  const handleDelete = (id) => {
    setStudents((prev) => prev.filter((student) => student.id !== id));
  };

  const totalAttendance = useMemo(() => {
    if (!students.length) return '0%';
    const values = students.map((student) => Number(student.attendance.replace('%', '')));
    return `${Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)}%`;
  }, [students]);

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>📋 Student Enrollment Roster</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Manage learners, guardians, attendance, and status updates.</p>
        </div>
        <button onClick={handleOpenAdd} style={{ padding: '10px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          + Add Student
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <p style={{ margin: '0 0 6px', color: '#64748b' }}>Total Students</p>
          <h3 style={{ margin: 0 }}>{students.length}</h3>
        </div>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <p style={{ margin: '0 0 6px', color: '#64748b' }}>Average Attendance</p>
          <h3 style={{ margin: 0 }}>{totalAttendance}</h3>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 12px' }}>Current Students</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Student</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Class</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Guardian</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Attendance</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{student.name}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{student.className}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{student.guardian}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{student.status}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{student.attendance}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <button onClick={() => handleOpenEdit(student)} style={{ marginRight: '8px', padding: '6px 10px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(student.id)} style={{ padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingStudent ? 'Edit Student' : 'Add Student'}>
        <form onSubmit={handleSave} style={{ display: 'grid', gap: '10px' }}>
          <input required placeholder="Full name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} style={inputStyle} />
          <input required placeholder="Admission number" value={form.admission} onChange={(event) => setForm({ ...form, admission: event.target.value })} style={inputStyle} />
          <input required placeholder="Class" value={form.className} onChange={(event) => setForm({ ...form, className: event.target.value })} style={inputStyle} />
          <input required placeholder="Guardian" value={form.guardian} onChange={(event) => setForm({ ...form, guardian: event.target.value })} style={inputStyle} />
          <input required placeholder="Contact" value={form.contact} onChange={(event) => setForm({ ...form, contact: event.target.value })} style={inputStyle} />
          <input required placeholder="Attendance" value={form.attendance} onChange={(event) => setForm({ ...form, attendance: event.target.value })} style={inputStyle} />
          <select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })} style={inputStyle}>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div style={{ display: 'flex', gap: '10px', marginTop: '6px' }}>
            <button type="submit" style={{ flex: 1, padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{editingStudent ? 'Save Changes' : 'Save Student'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  boxSizing: 'border-box',
};
