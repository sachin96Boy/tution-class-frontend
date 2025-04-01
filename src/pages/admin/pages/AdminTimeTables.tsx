import ExpenceTableBody from "@/components/admin/expence/ExpenceTableBody";
import TimetableFormComponent from "@/components/admin/forms/TimetableFormComponent";
import Modalsheet from "@/components/admin/modal/Modalsheet";
import OverlayTable from "@/components/admin/tables/OverlayTable";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses } from "@/features/course/courseAction";
import { AppDispatch, RootState } from "@/store";
import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function AdminTimeTables() {

  const dispatch = useDispatch<AppDispatch>();

  const { teachers } = useSelector((state: RootState) => state.teacher);
  const { courses } = useSelector((state: RootState) => state.course);

  let coursesSelectList: Array<IListItemProp> = courses?.map((course) => {
    return {
      key: course.course_id,
      value: course.title,
      image_path: course.course_img_path,
    };
  });

  let teacherSelectList: Array<IListItemProp> = teachers?.map((teacher) => {
    return {
      key: teacher.teacher_id,
      value: teacher.full_name,
      image_path: teacher.profile_img,
    };
  });

  useEffect(() => {
    dispatch(getAllCourses(""));
  }, []);

  return (
    <Flex gap={2} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Box>
        <Modalsheet
          buttonText={"Add Timetable"}
          formComponent={
            <TimetableFormComponent
              courseTypeList={coursesSelectList}
              teacherList={teacherSelectList}
            />
          }
          modalTitle={"Add Timetable Data"}
        />
      </Box>
      <Box>
        <OverlayTable
          title={"Timetable Data"}
          captions={["Id",  "Teacher", "Action"]}
          tableBodyComponent={<ExpenceTableBody data={[]} />}
          data={[]}
        />
      </Box>
    </Flex>
  );
}

export default AdminTimeTables;
