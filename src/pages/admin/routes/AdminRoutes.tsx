import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAttandance from "../pages/AdminAttandance";
import AdminPayments from "../pages/AdminPayments";
import AdminExpences from "../pages/AdminExpences";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="attandance" element={<AdminAttandance />} />
        <Route path="payments" element={<AdminPayments />} />
        <Route path="expences" element={<AdminExpences />} />
        <Route path="reports" element={<AdminExpences />} />
        <Route path="users" element={<AdminExpences />} />
        <Route path="students" element={<AdminExpences />} />
        <Route path="assignments" element={<AdminExpences />} />
        <Route path="*" element={<Navigate to={"/admin/dashboard"} replace />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
