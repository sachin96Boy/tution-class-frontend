import CourseDataFormComponent from "@/components/admin/forms/CourseDataFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TimeTableBody from "@/components/admin/timetable/TimeTableDataBody";
import {
  getcourseDatabyCourseId,
  IgetCourseDataProps,
} from "@/features/course/courseAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function AdminCoursesData() {
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const enc_id = params.get("id");

  const { loading, courseData } = useSelector(
    (state: RootState) => state.course
  );

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<IgetCourseDataProps>>(courseData);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = courseData.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [courseData]);

  useEffect(() => {
    if (enc_id != null) {
      dispatch(
        getcourseDatabyCourseId({
          enc_course_id: enc_id,
        })
      );
    }
  }, [enc_id, dispatch]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Course Data"}
          formComponent={<CourseDataFormComponent enc_course_id={enc_id} />}
          modalTitle={"Add Course Data"}
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            currentPage={currentPage}
            handlePageChange={handleChange}
            title={"Timetable Data"}
            captions={["#", "day", "course", "start", "end"]}
            tableBodyComponent={<TimeTableBody data={[]} />}
            data={courseData}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminCoursesData;
