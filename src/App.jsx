import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// Layout Wrapper Shell
import Layout from "./components/Layout/Layout";

// Authentication Gateway
import Login from "./pages/login/Login";

// Main Dashboard
import Dashboard from "./pages/dashboard/Dashboard";

// 👨‍🎓 Student Categorized Views
import StudentList from "./pages/students/List";
import StudentGrades from "./pages/students/Grades";
import StudentProfile from "./pages/students/Profile";

// 💰 Finance Categorized Views
import FinanceInvoices from "./pages/finance/Invoices";
import FinanceReceipts from "./pages/finance/Receipts";
import FinanceTracking from "./pages/finance/Tracking";

// 📚 Academic Categorized Views
import AcademicClasses from "./pages/academic/Classes";
import AcademicExams from "./pages/academic/Exams";
import AcademicSubjects from "./pages/academic/Subjects";
import AcademicTimetable from "./pages/academic/Timetable";

// Fallback Module Component for Unchanged Layouts (Staff, Health, Library, Transport, Reports, Comm)
import Staff from "./pages/staff/Staff";
import Health from "./pages/health/Health";
import Library from "./pages/library/Library";
import Transport from "./pages/transport/Transport";
import Communication from "./pages/communication/Communication";
import Reports from "./pages/reports/Reports";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Auth Screen */}
          <Route path="/login" element={<Login />} />

          {/* Secure App Shell Frame */}
          <Route element={<Layout />}>
            {/* Auto-redirect root to core dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />

            {/* 👨‍🎓 Student Sub-Pages Category Layout */}
            <Route path="/students">
              <Route index element={<Navigate to="list" replace />} />
              <Route path="list" element={<StudentList />} />
              <Route path="grades" element={<StudentGrades />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>

            {/* 💰 Finance Sub-Pages Category Layout */}
            <Route path="/finance">
              <Route index element={<Navigate to="tracking" replace />} />
              <Route path="invoices" element={<FinanceInvoices />} />
              <Route path="receipts" element={<FinanceReceipts />} />
              <Route path="tracking" element={<FinanceTracking />} />
            </Route>

            {/* 📚 Academic Sub-Pages Category Layout */}
            <Route path="/academic">
              <Route index element={<Navigate to="classes" replace />} />
              <Route path="classes" element={<AcademicClasses />} />
              <Route path="exams" element={<AcademicExams />} />
              <Route path="subjects" element={<AcademicSubjects />} />
              <Route path="timetable" element={<AcademicTimetable />} />
            </Route>

            {/* Global Fallback Modules */}
            <Route path="/staff" element={<Staff />} />
            <Route path="/health" element={<Health />} />
            <Route path="/library" element={<Library />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/communication" element={<Communication />} />
            <Route path="/reports" element={<Reports />} />
          </Route>

          {/* Fallback 404 Screen */}
          <Route path="*" element={<div style={{ padding: "2rem" }}>404: Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
