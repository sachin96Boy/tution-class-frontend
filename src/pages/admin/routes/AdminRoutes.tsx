import { RootState } from "@/store";
import AdminRoute from "@/utils/AdminRoutes";
import { Center, Flex, ProgressCircle } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AdminAccounting from "../pages/AdminAccounting";
import AdminAdvertiments from "../pages/AdminAdvertiments";
import AdminAttandance from "../pages/AdminAttandance";
import AdminCommonSection from "../pages/AdminCommonSection";
import AdminCourses from "../pages/AdminCourses";
import AdminCoursesData from "../pages/AdminCoursesData";
import AdminDashboard from "../pages/AdminDashboard";
import AdminReports from "../pages/AdminReports";
import AdminRequests from "../pages/AdminRequests";
import AdminSetting from "../pages/AdminSetting";
import AdminTeachers from "../pages/AdminTeachers";
import AdminTimeTableData from "../pages/AdminTimeTableData";
import AdminTimeTables from "../pages/AdminTimeTables";
import AdminUsers from "../pages/AdminUsers";
import AssignmentData from "../pages/AssignmentData";
import Assignments from "../pages/Assignments";
import AdminAdvStudent from "../pages/student/AdminAdvStudent";
import AdminnicStudent from "../pages/student/AdminnicStudent";
import Students from "../pages/Students";

function AdminRoutes() {


  const { loading, error, errorMsg } = useSelector(
    (state: RootState) => state.config
  );



  return (
    <>
      {loading ? (
        <Flex minH={"100vh"} align={"center"} justify={"center"}>
          <Center>
            <ProgressCircle.Root value={null}>
              <ProgressCircle.Circle>
                <ProgressCircle.Track />
                <ProgressCircle.Range stroke="orange" />
              </ProgressCircle.Circle>
            </ProgressCircle.Root>
          </Center>
        </Flex>
      ) : error ? (
        <Center>{errorMsg.toString()}</Center>
      ) : (
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
              <Route path="/requests" element={<AdminRequests />} />
              <Route
                path="/students/advance/:id"
                element={<AdminAdvStudent />}
              />
              <Route path="/students/nic/:id" element={<AdminnicStudent />} />
              <Route path="/assignments/data" element={<AssignmentData />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/courses" element={<AdminCourses />} />
              <Route path="/courses/data" element={<AdminCoursesData />} />
              <Route path="/common" element={<AdminCommonSection />} />
              <Route path="/accounting" element={<AdminAccounting />} />
              <Route path="/settings" element={<AdminSetting />} />
              <Route
                path="*"
                element={<Navigate to={"/admin/dashboard"} replace />}
              />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default AdminRoutes;
