import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
