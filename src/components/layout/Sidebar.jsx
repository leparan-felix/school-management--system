import React from "react";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/students", label: "Students" },
    { to: "/staff", label: "Staff" },
    { to: "/academic/classes", label: "Academics" },
    { to: "/finance", label: "Finance" },
    { to: "/library", label: "Library" },
    { to: "/transport", label: "Transport" },
  ];

  return (
    <aside className="sidebar">
      <h2 className="sidebar-title">School Admin panel</h2>
      <nav>
        <ul className="sidebar-list">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
              >
                {link.label}
                
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
