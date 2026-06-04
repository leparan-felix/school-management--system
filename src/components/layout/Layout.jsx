// src/components/layout/Layout.jsx
import React from 'react';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

export default Layout;