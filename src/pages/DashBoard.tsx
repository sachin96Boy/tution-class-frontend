import DashBoardOutlet from "@/components/outlet/Dashboard_outlet";
import { RootState } from "@/store";
import ProtectedRoute from "@/utils/ProtectedRoute";
import { Center, Flex, ProgressCircle } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import CourseContentView from "./CourseContentView";
import CourseDetails from "./CourseDetails";
import HomePage from "./HomePage";
import MyAccount from "./MyAccount";
import MyCourses from "./MyCourses";
import Support from "./Support";
import TeacherData from "./TeacherData";
import TeacherList from "./TeacherList";

function DashBoard() {


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
          <Route element={<ProtectedRoute />}>
            <Route element={<DashBoardOutlet />}>
              {/* add different routes that need to be loade for different pages */}
              <Route
                path="/course/:year/:courseId"
                element={<CourseDetails />}
              />
              <Route
                path="/player/:courseId/:dataId"
                element={<CourseContentView />}
              />
              <Route path="/myAccount" element={<MyAccount />} />
              <Route path="/myCourses" element={<MyCourses />} />
              <Route path="/teacherList" element={<TeacherList />} />
              <Route path="/teacher/:id" element={<TeacherData />} />
              <Route path="/support" element={<Support />} />
              <Route path="/" element={<HomePage />} />
              <Route
                path="/*"
                element={<Navigate to={"/dashboard"} replace />}
              />
            </Route>
          </Route>
        </Routes>
      )}
    </>
  );
}

export default DashBoard;
