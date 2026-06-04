import React from "react";
import DashboardStat from "../../components/ui/DashboardStat";
import Layout from "../../components/layout/Layout";

const Dashboard = () => {
  const stats = [
    { label: "Total Students", value: 245 },
    { label: "Staff Members", value: 32 },
    { label: "Classes", value: 18 },
    { label: "Fees Collected", value: "KES 540,000" },
  ];

  return (
    <Layout>
      <h1 className="dashboard-title">Dashboard Overview</h1>
      <div className="dashboard-grid">
        {stats.map((s, i) => (
          <DashboardStat key={i} {...s} />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
