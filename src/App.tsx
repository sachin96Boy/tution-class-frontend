import { Box } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import SideBar from "./components/sidebar/SideBar";
import HomePage from "./pages/HomePage";
import MyAccount from "./pages/MyAccount";
import MyCourses from "./pages/MyCourses";
import Signin from "./pages/Signin";
import firebaseApp from "./firebase/firebase"; 
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import Signup from "./pages/Signup";
import CourseDetails from "./pages/CourseDetails";
import TeacherList from "./pages/TeacherList";

function App() {


  // Initialize Firebase
  // const analytics = getAnalytics(firebaseApp);
  const auth = getAuth(firebaseApp);
  console.log(auth);

  return (
    <Router>
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
          <SideBar />
          <Box
            className="otherSection"
            display={"flex"}
            flex="1"
            overflowY={"auto"}
          >
            <Routes>
              {/* add different routes that need to be loade for different pages */}
              <Route path="/" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/dashboard" element={<HomePage />} />
              <Route path="/myCourses" element={<MyCourses />} />
              <Route
                path="/course/:year/:courseId"
                element={<CourseDetails />}
              />
              <Route path="/myAccount" element={<MyAccount />} />
              <Route path="/teacherList" element={<TeacherList />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
