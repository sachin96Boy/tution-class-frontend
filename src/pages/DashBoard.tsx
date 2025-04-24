import DashBoardOutlet from "@/components/outlet/Dashboard_outlet";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { Navigate, Route, Routes } from "react-router-dom";
import CourseDetails from "./CourseDetails";
import HomePage from "./HomePage";
import MyAccount from "./MyAccount";
import MyCourses from "./MyCourses";
import Support from "./Support";
import TeacherData from "./TeacherData";
import TeacherList from "./TeacherList";

function DashBoard() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route element={<DashBoardOutlet />}>
          {/* add different routes that need to be loade for different pages */}
          <Route path="/course/:year/:courseId" element={<CourseDetails />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/myCourses" element={<MyCourses />} />
          <Route path="/teacherList" element={<TeacherList />} />
          <Route path="/teacher/:id" element={<TeacherData />} />
          <Route path="/support" element={<Support />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<Navigate to={"/dashboard"} replace />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default DashBoard;
