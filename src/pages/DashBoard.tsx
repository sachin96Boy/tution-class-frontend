import { Box } from "@chakra-ui/react";
import React from "react";
import Header from "../components/header/Header";
import SideBar from "../components/sidebar/SideBar";
import { Navigate, Route, Routes } from "react-router-dom";
import MyCourses from "./MyCourses";
import CourseDetails from "./CourseDetails";
import MyAccount from "./MyAccount";
import TeacherList from "./TeacherList";
import HomePage from "./HomePage";
import Support from "./Support";
import DashBoardOutlet from "@/components/outlet/Dashboard_outlet";
import ProtectedRoute from "@/utils/ProtectedRoute";

function DashBoard() {
  return (
    <Routes>
      <Route element={<DashBoardOutlet />}>
        {/* add different routes that need to be loade for different pages */}
        <Route element={<ProtectedRoute />}>
          <Route path="course/:year/:courseId" element={<CourseDetails />} />
          <Route path="myAccount" element={<MyAccount />} />
          <Route path="myCourses" element={<MyCourses />} />
        </Route>
        <Route path="teacherList" element={<TeacherList />} />
        <Route path="/support" element={<Support />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<Navigate to={"/dashboard"} replace />} />
      </Route>
    </Routes>
  );
}

export default DashBoard;
