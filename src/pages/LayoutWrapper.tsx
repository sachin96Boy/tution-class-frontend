import {
  getAllExpenceTypes,
  getAllGrades,
  getAllSubjects,
} from "@/features/comon/commonAction";
import { getCompanyDetails } from "@/features/config/configAction";
import { getAllTeachers } from "@/features/teacher/teacherAction";
import { AppDispatch, RootState } from "@/store";
import { Center, Flex, ProgressCircle } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
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
    <>
      {" "}
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
    </>
  );
}

export default LayoutWrapper;
