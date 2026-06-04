import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import StudentList from "./StudentList";
import StudentProfile from "./StudentProfile";
import Grades from "./Grades";
import Layout from "../../components/layout/Layout";

const Students = () => {
  return (
    <Layout>
      <div className="students-container">
        <h1 className="students-title">Student Management</h1>

        {/* Mini navigation */}
        <nav className="students-nav">
          <Link to="list" className="students-link">List</Link>
          <Link to="profile" className="students-link">Profile</Link>
          <Link to="grades" className="students-link">Grades</Link>
        </nav>

        {/* Nested routes */}
        <div className="students-content">
          <Routes>
            <Route index element={<StudentList />} />  {/* Default view */}
            <Route path="list" element={<StudentList />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="grades" element={<Grades />} />
          </Routes>
        </div>
      </div>
    </Layout>
  );
};

export default Students;
