import React, { useMemo } from "react";
import DashboardStat from "../../components/ui/DashboardStat";
import useJsonData from "../../hooks/useJsonData";
import studentsData from "../../data/students.json";
import staffData from "../../data/staff.json";
import academicData from "../../data/academic.json";
import financeData from "../../data/finance.json";

const Dashboard = () => {
  const [students] = useJsonData("school-students", studentsData);
  const [staff] = useJsonData("school-staff", staffData);
  const [academic] = useJsonData("academic-classes", academicData);
  const [finance] = useJsonData("finance-data", financeData);

  const stats = useMemo(() => {
    const collected = finance.tracking?.reduce((sum, item) => sum + Number(String(item.amount).replace(/[^0-9]/g, "")), 0) ?? 0;
    return [
      { label: "Total Students", value: students.length },
      { label: "Staff Members", value: staff.length },
      { label: "Classes", value: academic.classes?.length ?? 0 },
      { label: "Fees Collected", value: `KES ${collected.toLocaleString()}` },
    ];
  }, [students, staff, academic, finance]);

  return (
    <div style={{ display: "grid", gap: "20px" }}>
      <div>
        <h1 className="dashboard-title" style={{ margin: "0 0 8px 0", color: "#1e293b" }}>Dashboard Overview</h1>
        <p style={{ margin: 0, color: "#64748b" }}>A live summary of student, staff, academic, and finance activity.</p>
      </div>
      <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {stats.map((item, index) => (
          <DashboardStat key={`${item.label}-${index}`} {...item} />
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h3 style={{ margin: "0 0 8px" }}>Upcoming Focus</h3>
          <p style={{ margin: "4px 0", color: "#64748b" }}>Review student attendance, fee balances, and lesson schedules.</p>
        </div>
        <div style={{ background: "#fff", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
          <h3 style={{ margin: "0 0 8px" }}>System Status</h3>
          <p style={{ margin: "4px 0", color: "#64748b" }}>All core modules are now connected to editable local data.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
