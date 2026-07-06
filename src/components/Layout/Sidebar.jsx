import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  // Local state to toggle visibility matrices for category lists
  const [openMenus, setOpenMenus] = useState({
    students: false,
    finance: false,
    academic: false,
  });

  const toggleMenu = (menuKey) => {
    setOpenMenus((prev) => ({ ...prev, [menuKey]: !prev[menuKey] }));
  };

  const activeCategoryStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "between",
    width: "100%",
    padding: "10px 15px",
    background: "transparent",
    border: "none",
    borderRadius: "6px",
    fontSize: "14px",
    color: "#94a3b8",
    textAlign: "left",
    cursor: "pointer",
    boxSizing: "border-box",
  };

  const subLinkStyle = ({ isActive }) => ({
    display: "block",
    padding: "8px 15px 8px 45px",
    textDecoration: "none",
    fontSize: "13px",
    borderRadius: "4px",
    color: isActive ? "#ffffff" : "#64748b",
    backgroundColor: isActive ? "#2563eb" : "transparent",
  });

  return (
    <aside style={{ width: "260px", background: "#1e293b", padding: "20px 10px", minHeight: "100vh", boxSizing: "border-box" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        
        {/* Simple Link: Dashboard Overview */}
        <NavLink to="/dashboard" style={({ isActive }) => ({ display: "flex", alignItems: "center", gap: "12px", padding: "10px 15px", textDecoration: "none", borderRadius: "6px", fontSize: "14px", color: isActive ? "#ffffff" : "#94a3b8", backgroundColor: isActive ? "#2563eb" : "transparent" })}>
          <span>📊</span><span>Dashboard Overview</span>
        </NavLink>

        {/* --- CATEGORY 1: STUDENTS --- */}
        <div>
          <button onClick={() => toggleMenu("students")} style={activeCategoryStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
              <span>👨‍🎓</span><span>Student Manager</span>
            </div>
            <span>{openMenus.students ? "▼" : "►"}</span>
          </button>
          {openMenus.students && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
              <NavLink to="/students/list" style={subLinkStyle}>• Roster List</NavLink>
              <NavLink to="/students/grades" style={subLinkStyle}>• Grades Engine</NavLink>
              <NavLink to="/students/profile" style={subLinkStyle}>• Student Profiles</NavLink>
            </div>
          )}
        </div>

        {/* --- CATEGORY 2: FINANCE --- */}
        <div>
          <button onClick={() => toggleMenu("finance")} style={activeCategoryStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
              <span>💰</span><span>Finance System</span>
            </div>
            <span>{openMenus.finance ? "▼" : "►"}</span>
          </button>
          {openMenus.finance && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
              <NavLink to="/finance/tracking" style={subLinkStyle}>• Fee Tracking</NavLink>
              <NavLink to="/finance/invoices" style={subLinkStyle}>• Invoice Ledger</NavLink>
              <NavLink to="/finance/receipts" style={subLinkStyle}>• Receipts Vault</NavLink>
            </div>
          )}
        </div>

        {/* --- CATEGORY : LIBRARY --- */}
        <div>
          <button onClick={() => toggleMenu("library")} style={activeCategoryStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
              <span>📚</span><span>Library Management</span>
            </div>
            <span>{openMenus.library ? "▼" : "►"}</span>
          </button>
          {openMenus.library && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
              <NavLink to="/library/books" style={subLinkStyle}>• Book Inventory</NavLink>
              <NavLink to="/library/checkout" style={subLinkStyle}>• Checkout Records</NavLink>
              <NavLink to="/library/reservations" style={subLinkStyle}>• Reservation System</NavLink>
            </div>
          )}
        </div>
        {/* --- CATEGORY : TRANSPORT --- */}
        <div>
          <button onClick={() => toggleMenu("transport")} style={activeCategoryStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
              <span>🚌</span><span>Transport Logs</span>
            </div>
            <span>{openMenus.transport ? "▼" : "►"}</span>
           
          </button>
          {openMenus.transport && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
              <NavLink to="/transport/routes" style={subLinkStyle}>• Route Planner</NavLink>
              <NavLink to="/transport/vehicles" style={subLinkStyle}>• Vehicle Registry</NavLink>
              <NavLink to="/transport/drivers" style={subLinkStyle}>• Driver Logs</NavLink>
            </div>
          )}
        </div>

        {/* --- CATEGORY 3: ACADEMIC --- */}
        <div>
          <button onClick={() => toggleMenu("academic")} style={activeCategoryStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
              <span>📚</span><span>Academic Desk</span>
            </div>
            <span>{openMenus.academic ? "▼" : "►"}</span>
          </button>
          {openMenus.academic && (
            <div style={{ display: "flex", flexDirection: "column", gap: "4px", marginTop: "4px" }}>
              <NavLink to="/academic/classes" style={subLinkStyle}>• Streams & Classes</NavLink>
              <NavLink to="/academic/subjects" style={subLinkStyle}>• Subject Matrix</NavLink>
              <NavLink to="/academic/exams" style={subLinkStyle}>• Exam Schedules</NavLink>
              <NavLink to="/academic/timetable" style={subLinkStyle}>• Master Timetable</NavLink>
            </div>
          )}
        </div>

        {/* Standalone Links */}
        <NavLink to="/staff" style={({ isActive }) => ({ display: "flex", alignItems: "center", gap: "12px", padding: "10px 15px", textDecoration: "none", borderRadius: "6px", fontSize: "14px", color: isActive ? "#ffffff" : "#94a3b8", backgroundColor: isActive ? "#2563eb" : "transparent" })}>
          <span>👩‍🏫</span><span>Staff Directory</span>
        </NavLink>
        <NavLink to="/health" style={({ isActive }) => ({ display: "flex", alignItems: "center", gap: "12px", padding: "10px 15px", textDecoration: "none", borderRadius: "6px", fontSize: "14px", color: isActive ? "#ffffff" : "#94a3b8", backgroundColor: isActive ? "#2563eb" : "transparent" })}>
          <span>🏥</span><span>Health Logs</span>
        </NavLink>

      </nav>
    </aside>
  );
}
