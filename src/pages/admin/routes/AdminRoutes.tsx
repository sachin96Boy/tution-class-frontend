import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminDashboard from "../pages/AdminDashboard";
import AdminAttandance from "../pages/AdminAttandance";
import AdminTeachers from "../pages/AdminTeachers";
import AdminTimeTables from "../pages/AdminTimeTables";
import AdminCourses from "../pages/AdminCourses";
import AdminAccounting from "../pages/AdminAccounting";
import AdminReports from "../pages/AdminReports";
import AdminUsers from "../pages/AdminUsers";
import Students from "../pages/Students";
import Assignments from "../pages/Assignments";
import AdminRoute from "@/utils/AdminRoutes";
import AdminAdvertiments from "../pages/AdminAdvertiments";
import AdminTimeTableData from "../pages/AdminTimeTableData";
import AdminCommonSection from "../pages/AdminCommonSection";
import AdminCoursesData from "../pages/AdminCoursesData";
import AssignmentData from "../pages/AssignmentData";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/teachers" element={<AdminTeachers />} />
          <Route path="/time-table/data" element={<AdminTimeTableData />} />
          <Route path="/time-table" element={<AdminTimeTables />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/attandance" element={<AdminAttandance />} />
          <Route path="/advertisments" element={<AdminAdvertiments />} />
          <Route path="/reports" element={<AdminReports />} />
          <Route path="/users" element={<AdminUsers />} />
          <Route path="/students" element={<Students />} />
          <Route path="/assignments/data" element={<AssignmentData />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/courses" element={<AdminCourses />} />
          <Route path="/courses/data" element={<AdminCoursesData />} />
          <Route path="/common" element={<AdminCommonSection />} />
          <Route path="/accounting" element={<AdminAccounting />} />
          <Route
            path="*"
            element={<Navigate to={"/admin/dashboard"} replace />}
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
