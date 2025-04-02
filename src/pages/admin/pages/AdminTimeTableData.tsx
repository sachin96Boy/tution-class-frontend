import TimetableDataFormComponent from "@/components/admin/forms/TimetableFormComponent";
import TimeTableYearPicker from "@/components/admin/forms/TimeTableYearPicker";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TimeTableYearlyTableBody from "@/components/admin/timetable/TimeTableYearlyBody";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses } from "@/features/course/courseAction";
import { getTimeTableDataById } from "@/features/timetable/timetableAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function AdminTimeTableData() {
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const enc_id = params.get("id");

  const { courses } = useSelector((state: RootState) => state.course);

  const { loading, timeTableData } = useSelector(
    (state: RootState) => state.timetable
  );

  let coursesSelectList: Array<IListItemProp> = courses?.map((course) => {
    return {
      key: course.course_id,
      value: course.title,
      image_path: course.course_img_path,
    };
  });

  useEffect(() => {
    dispatch(
      getTimeTableDataById({
        enc_timetable_id: enc_id,
      })
    );

    dispatch(getAllCourses(""));
  }, [enc_id, dispatch]);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Timetable Data"}
          formComponent={
            <TimetableDataFormComponent courseTypeList={coursesSelectList} />
          }
          modalTitle={"Add Timetable Data"}
        />
      </Box>
      <Box>
        {loading ? (
          <Spinner />
        ) : (
          <OverlayTable
            title={"Timetable Data"}
            captions={["#", "day", "course", "start", "end"]}
            tableBodyComponent={<TimeTableYearlyTableBody data={[]} />}
            data={[]}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminTimeTableData;
