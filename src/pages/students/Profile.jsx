import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import studentsData from '../../data/students.json';

const emptyProfile = {
  name: '',
  admission: '',
  className: '',
  guardian: '',
  contact: '',
  status: 'Active',
  attendance: '',
};

export default function Profile() {
  const [students, setStudents] = useJsonData('school-students', studentsData);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState(emptyProfile);

  useEffect(() => {
    if (!students.length) return;
    if (!selectedStudentId || !students.some((student) => student.id === selectedStudentId)) {
      setSelectedStudentId(students[0].id);
    }
  }, [students, selectedStudentId]);

  const selectedStudent = useMemo(() => {
    return students.find((student) => student.id === selectedStudentId) ?? students[0] ?? null;
  }, [students, selectedStudentId]);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setForm(emptyProfile);
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
      setStudents((prev) => prev.map((student) => (student.id === editingStudent.id ? { ...student, ...form } : student)));
    } else {
      const newStudent = { id: Date.now(), ...form };
      setStudents((prev) => [newStudent, ...prev]);
      setSelectedStudentId(newStudent.id);
    }
    setIsModalOpen(false);
    setEditingStudent(null);
    setForm(emptyProfile);
  };

  const handleDelete = (id) => {
    const nextStudents = students.filter((student) => student.id !== id);
    setStudents(nextStudents);
    if (selectedStudentId === id) {
      setSelectedStudentId(nextStudents[0]?.id ?? null);
    }
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>👤 Student Profile Directory</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Track detailed learner profiles and keep guardian information current.</p>
        </div>
        <button onClick={handleOpenAdd} style={{ padding: '10px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          + Add Profile
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '16px', alignItems: 'start' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <h3 style={{ margin: '0 0 12px' }}>Students</h3>
          <div style={{ display: 'grid', gap: '8px' }}>
            {students.map((student) => (
              <button key={student.id} onClick={() => setSelectedStudentId(student.id)} style={{ textAlign: 'left', padding: '10px', border: selectedStudent?.id === student.id ? '1px solid #2563eb' : '1px solid #e2e8f0', borderRadius: '8px', background: selectedStudent?.id === student.id ? '#eff6ff' : '#fff', cursor: 'pointer' }}>
                <div style={{ fontWeight: 700 }}>{student.name}</div>
                <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{student.className}</div>
              </button>
            ))}
          </div>
        </div>

        <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          {selectedStudent ? (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px' }}>{selectedStudent.name}</h3>
                  <p style={{ margin: 0, color: '#64748b' }}>{selectedStudent.className}</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleOpenEdit(selectedStudent)} style={{ padding: '8px 12px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(selectedStudent.id)} style={{ padding: '8px 12px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Delete</button>
                </div>
              </div>
              <p style={{ margin: '6px 0' }}><strong>Admission:</strong> {selectedStudent.admission}</p>
              <p style={{ margin: '6px 0' }}><strong>Guardian:</strong> {selectedStudent.guardian}</p>
              <p style={{ margin: '6px 0' }}><strong>Contact:</strong> {selectedStudent.contact}</p>
              <p style={{ margin: '6px 0' }}><strong>Status:</strong> {selectedStudent.status}</p>
              <p style={{ margin: '6px 0' }}><strong>Attendance:</strong> {selectedStudent.attendance}</p>
            </>
          ) : (
            <p>No student profile selected.</p>
          )}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingStudent ? 'Edit Profile' : 'Add Profile'}>
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
          <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{editingStudent ? 'Save Profile' : 'Create Profile'}</button>
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
