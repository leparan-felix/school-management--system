import React from "react";

const DashboardStat = ({ label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow text-center">
    <p className="text-gray-500">{label}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

export default DashboardStat;
