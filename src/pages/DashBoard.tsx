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

function DashBoard() {
  const [items, setItems] = React.useState([]);

  React.useEffect(()=>{
    const items = JSON.parse(`${localStorage.getItem('user')}`);
    if (items) {
     setItems(items);
    }
  },[]);



  return (
    <Box
      className="PageBody"
      overflow={"hidden"}
      display="flex"
      flexDirection={"column"}
      w="full"
      h={"100vh"}
    >
      <Header />
      <Box
        className="containerNew"
        display={"flex"}
        flex="1"
        overflow={"hidden"}
        w="100vw"
      >
        {/* add sidebar component Here*/}
        <SideBar items={items}/>
        <Box
          className="otherSection"
          display={"flex"}
          flex="1"
          overflowY={"auto"}
        >
          <Routes>
            {/* add different routes that need to be loade for different pages */}
            <Route path="course/:year/:courseId" element={<CourseDetails />} />
            <Route path="myAccount" element={<MyAccount  items={items}/>} />
            <Route path="myCourses" element={<MyCourses />} />
            <Route path="teacherList" element={<TeacherList />} />
            <Route path="/support" element={<Support />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/*" element={<Navigate to={"/dashboard"} replace/>} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default DashBoard;
