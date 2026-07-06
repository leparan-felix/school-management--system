import React, { useMemo, useState } from 'react';
import Modal from '../../components/ui/Modal';
import useJsonData from '../../hooks/useJsonData';
import studentsData from '../../data/students.json';

const initialGrades = [
  { id: 1, studentName: 'Leparan Sopia', subject: 'Mathematics', score: '87', grade: 'A', term: 'Term 1' },
  { id: 2, studentName: 'Jane Kimani', subject: 'English', score: '82', grade: 'A-', term: 'Term 1' },
];

const emptyGrade = {
  studentName: '',
  subject: '',
  score: '',
  grade: '',
  term: 'Term 1',
};

export default function Grades() {
  const [students] = useJsonData('school-students', studentsData);
  const [grades, setGrades] = useJsonData('student-grades', initialGrades);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGrade, setEditingGrade] = useState(null);
  const [form, setForm] = useState(emptyGrade);

  const averageScore = useMemo(() => {
    if (!grades.length) return '0%';
    const values = grades.map((entry) => Number(entry.score));
    return `${Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)}%`;
  }, [grades]);

  const handleOpenAdd = () => {
    setEditingGrade(null);
    setForm(emptyGrade);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (grade) => {
    setEditingGrade(grade);
    setForm(grade);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    setGrades((prev) => prev.filter((entry) => entry.id !== id));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingGrade) {
      setGrades((prev) => prev.map((entry) => (entry.id === editingGrade.id ? { ...entry, ...form } : entry)));
    } else {
      setGrades((prev) => [{ id: Date.now(), ...form }, ...prev]);
    }
    setIsModalOpen(false);
    setEditingGrade(null);
    setForm(emptyGrade);
  };

  return (
    <div style={{ display: 'grid', gap: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <div>
          <h2 style={{ margin: '0 0 8px', color: '#1e293b' }}>📝 Grading Analysis Matrix</h2>
          <p style={{ margin: 0, color: '#64748b' }}>Track term performance and keep department review records updated.</p>
        </div>
        <button onClick={handleOpenAdd} style={{ padding: '10px 14px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          + Add Grade
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <p style={{ margin: '0 0 6px', color: '#64748b' }}>Average Score</p>
          <h3 style={{ margin: 0 }}>{averageScore}</h3>
        </div>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
          <p style={{ margin: '0 0 6px', color: '#64748b' }}>Students on Record</p>
          <h3 style={{ margin: 0 }}>{students.length}</h3>
        </div>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', padding: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
        <h3 style={{ margin: '0 0 12px' }}>Grade Entries</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Student</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Subject</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Score</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Grade</th>
              <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grades.map((entry) => (
              <tr key={entry.id}>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{entry.studentName}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{entry.subject}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{entry.score}%</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>{entry.grade}</td>
                <td style={{ padding: '10px', borderBottom: '1px solid #f1f5f9' }}>
                  <button onClick={() => handleOpenEdit(entry)} style={{ marginRight: '8px', padding: '6px 10px', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Edit</button>
                  <button onClick={() => handleDelete(entry.id)} style={{ padding: '6px 10px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingGrade ? 'Edit Grade' : 'Add Grade'}>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
          <select value={form.studentName} onChange={(event) => setForm({ ...form, studentName: event.target.value })} style={inputStyle}>
            <option value="">Select student</option>
            {students.map((student) => (
              <option key={student.id} value={student.name}>{student.name}</option>
            ))}
          </select>
          <input required placeholder="Subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} style={inputStyle} />
          <input required placeholder="Score" value={form.score} onChange={(event) => setForm({ ...form, score: event.target.value })} style={inputStyle} />
          <input required placeholder="Grade" value={form.grade} onChange={(event) => setForm({ ...form, grade: event.target.value })} style={inputStyle} />
          <input required placeholder="Term" value={form.term} onChange={(event) => setForm({ ...form, term: event.target.value })} style={inputStyle} />
          <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>{editingGrade ? 'Save Grade' : 'Create Grade'}</button>
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
