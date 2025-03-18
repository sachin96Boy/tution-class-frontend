import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAttandance from "../pages/AdminAttandance";
import AdminPayments from "../pages/AdminPayments";
import AdminExpences from "../pages/AdminExpences";
import AdminTeachers from "../pages/AdminTeachers";
import AdminTimeTables from "../pages/AdminTimeTables";
import AdminCourses from "../pages/AdminCourses";
import AdminAccounting from "../pages/AdminAccounting";
import AdminReports from "../pages/AdminReports";
import AdminUsers from "../pages/AdminUsers";
import Students from "../pages/Students";
import Assignments from "../pages/Assignments";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="teachers" element={<AdminTeachers />} />
        <Route path="time-table" element={<AdminTimeTables />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="attandance" element={<AdminAttandance />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="expences" element={<AdminExpences />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="students" element={<Students />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="courses" element={<AdminCourses />} />
        <Route path="accounting" element={<AdminAccounting />} />
        <Route
          path="*"
          element={<Navigate to={"/admin/dashboard"} replace />}
        />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
