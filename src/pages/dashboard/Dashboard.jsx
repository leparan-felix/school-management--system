import React from "react";
import DashboardStat from "../../components/ui/DashboardStat";

const Dashboard = () => {
  const stats = [
    { label: "Total Students", value: 245 },
    { label: "Staff Members", value: 32 },
    { label: "Classes", value: 18 },
    { label: "Fees Collected", value: "KES 540,000" },
  ];

  return (
    <div>
      <h1 className="dashboard-title" style={{ margin: "0 0 20px 0", color: "#1e293b" }}>Dashboard Overview</h1>
      <div className="dashboard-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
        {stats.map((s, i) => (
          <DashboardStat key={i} {...s} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
