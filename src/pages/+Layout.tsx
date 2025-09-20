import React, { useEffect } from "react";

import { Analytics } from "@vercel/analytics/react";

import { Provider as UIProvider } from "../components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import { Provider, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../store";

import { PhotoProvider } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "@fontsource/roboto";
import "@fontsource/noto-sans-sinhala";
import { getCompanyDetails } from "@/features/config/configAction";
import { getAllTeachers } from "@/features/teacher/teacherAction";
import {
  getAllExpenceTypes,
  getAllGrades,
  getAllSubjects,
} from "@/features/comon/commonAction";
import { Center, Flex, ProgressCircle } from "@chakra-ui/react";

function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, error, errorMsg } = useSelector(
    (state: RootState) => state.config
  );

  useEffect(() => {
    dispatch(getCompanyDetails());
    dispatch(getAllTeachers(""));
    dispatch(getAllSubjects(""));
    dispatch(getAllExpenceTypes(""));
    dispatch(getAllGrades(""));
  }, []);

  return (
    <React.StrictMode>
      <Analytics />
      <UIProvider>
        <Provider store={store}>
          <PhotoProvider maskOpacity={0.5}>
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
            ) : (
              children
            )}
          </PhotoProvider>
        </Provider>
        <Toaster />
      </UIProvider>
    </React.StrictMode>
  );
}

export default Layout;
