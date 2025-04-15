import TimetableDataFormComponent from "@/components/admin/forms/TimetableFormComponent";
import TimeTableYearPicker from "@/components/admin/forms/TimeTableYearPicker";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import TimeTableBody from "@/components/admin/timetable/TimeTableDataBody";
import TimeTableYearlyTableBody from "@/components/admin/timetable/TimeTableYearlyBody";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses } from "@/features/course/courseAction";
import { getTimeTableDataById } from "@/features/timetable/timetableAction";
import { Itimetabledata } from "@/features/timetable/timeTableSlice";
import { AppDispatch, RootState } from "@/store";
import { Box, Button, Flex, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function AdminTimeTableData() {
  const dispatch = useDispatch<AppDispatch>();

  const location = useLocation();

  const queryString = location.search;
  const params = new URLSearchParams(queryString);
  const enc_id = params.get("id");
  const real_enc_id = enc_id
    ? decodeURIComponent(enc_id.replace(/ /g, "+"))
    : ""; // Fix spaces back to +

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

  const [currentPage, setCurrentPage] = useState(1);

  const [items, setItems] = useState<Array<Itimetabledata>>(timeTableData);

  const handleChange = (details: { page: number }) => {
    const start = (details.page - 1) * 10;
    const newItems = timeTableData.slice(start, start + 10);

    setItems(newItems);
    setCurrentPage(details.page);
  };

  useEffect(() => {
    handleChange({
      page: 1,
    });
  }, [timeTableData]);

  useEffect(() => {
    if (enc_id != null) {
      dispatch(
        getTimeTableDataById({
          enc_timetable_id: real_enc_id,
        })
      );
    }

    dispatch(getAllCourses(""));
  }, [enc_id, dispatch]);

  const handleSearch = (value: string) => {};

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Timetable Data"}
          formComponent={
            <TimetableDataFormComponent
              enc_timetable_id={real_enc_id}
              courseTypeList={coursesSelectList}
            />
          }
          modalTitle={"Add Timetable Data"}
        >
          <Button colorPalette={"blue"}>Add TimeTableData</Button>
        </Modalsheet>
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
            tableBodyComponent={<TimeTableBody data={items} />}
            data={timeTableData}
            handleSearch={handleSearch}
          />
        )}
      </Box>
    </Flex>
  );
}

export default AdminTimeTableData;
