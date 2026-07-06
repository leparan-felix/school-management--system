import React, { useMemo } from 'react';
import DashboardStat from '../../components/ui/DashboardStat';
import useJsonData from '../../hooks/useJsonData';
import studentsData from '../../data/students.json';
import staffData from '../../data/staff.json';
import academicData from '../../data/academic.json';
import financeData from '../../data/finance.json';
import { FiUsers, FiUserCheck, FiBook, FiTrendingUp } from 'react-icons/fi';

const Dashboard = () => {
  const [students] = useJsonData('school-students', studentsData);
  const [staff] = useJsonData('school-staff', staffData);
  const [academic] = useJsonData('academic-classes', academicData);
  const [finance] = useJsonData('finance-data', financeData);

  const collected = useMemo(() => {
    return (finance.tracking ?? []).reduce((sum, item) => sum + Number(String(item.amount).replace(/[^0-9]/g, '')), 0);
  }, [finance]);

  const stats = [
    { label: 'Total Students', value: students.length, icon: <FiUsers size={20} />, color: '#0ea5a4', subtitle: 'Active learners' },
    { label: 'Staff Members', value: staff.length, icon: <FiUserCheck size={20} />, color: '#7c3aed', subtitle: 'Teaching & admin' },
    { label: 'Classes', value: academic.classes?.length ?? 0, icon: <FiBook size={20} />, color: '#f97316', subtitle: 'Class groups' },
    { label: 'Fees Collected', value: `KES ${collected.toLocaleString()}`, icon: <FiTrendingUp size={20} />, color: '#2563eb', subtitle: 'This term' },
  ];

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      <header style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <h1 style={{ margin: 0, color: '#0f172a' }}>Welcome back — overview</h1>
        <p style={{ margin: 0, color: '#64748b' }}>Quick stats to help you focus on what matters most today.</p>
      </header>

      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
        {stats.map((s, i) => (
          <DashboardStat key={i} label={s.label} value={s.value} icon={s.icon} color={s.color} subtitle={s.subtitle} />
        ))}
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 6px 20px rgba(2,6,23,0.06)' }}>
          <h3 style={{ margin: '0 0 8px' }}>Activity Feed</h3>
          <p style={{ margin: 0, color: '#64748b' }}>Recent actions: student enrollments, invoices, and timetable changes will appear here.</p>
        </div>

        <aside style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 6px 20px rgba(2,6,23,0.06)' }}>
          <h3 style={{ margin: '0 0 8px' }}>Today</h3>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#64748b' }}>
            <li>• 3 new student registrations</li>
            <li>• 1 invoice overdue</li>
            <li>• Timetable updated for Grade 10</li>
          </ul>
        </aside>
      </section>
    </div>
  );
};

export default Dashboard;
