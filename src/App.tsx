import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgotPassword";
import AuthRoute from "./utils/AuthRoute";
import AdminSigninScreen from "./pages/admin/AdminSigninScreen";
import AdminRoutes from "./pages/admin/routes/AdminRoutes";
import FrontViewPage from "./pages/front_view/FrontViewPage";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";
import { Box, Center, Flex, ProgressCircle, Text } from "@chakra-ui/react";
import { getCompanyDetails } from "./features/config/configAction";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, errorMsg } = useSelector(
    (state: RootState) => state.config
  );

  useEffect(() => {
    dispatch(getCompanyDetails(""));
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <Flex minH={"100vh"} align={'center'} justify={'center'}>
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
        <Text>{errorMsg}</Text>
      ) : (
        <Routes>
          {/* add different routes that need to be loade for different pages */}
          <Route path="dashboard/*" element={<DashBoard />} />
          <Route path="admin/*" element={<AdminRoutes />} />
          <Route element={<AuthRoute />}>
            <Route path="signup" element={<Signup />} />
            <Route path="forgotpassword" element={<ForgotPassword />} />
            <Route path="login" element={<Signin />} />
            <Route path="corporate" element={<AdminSigninScreen />} />
            <Route path="/" element={<FrontViewPage />} />
            <Route path="*" element={<Navigate to={"/"} replace />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;
