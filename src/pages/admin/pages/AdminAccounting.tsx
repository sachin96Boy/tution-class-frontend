import { Flex, Tabs } from "@chakra-ui/react";
import React, { useEffect } from "react";
import AdminPayments from "./AdminPayments";
import AdminExpences from "./AdminExpences";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses } from "@/features/course/courseAction";
import { getAllStudents } from "@/features/student/studentAction";

function AdminAccounting() {
  const dispatch = useDispatch<AppDispatch>();

  const { courses } = useSelector((state: RootState) => state.course);
  const { students } = useSelector((state: RootState) => state.student);
  const { teachers } = useSelector((state: RootState) => state.teacher);

  let coursesSelectList: Array<IListItemProp> = courses?.map((course) => {
    return {
      key: course.course_id,
      value: course.title,
      image_path: course.course_img_path,
    };
  });
  let studentSelectList: Array<IListItemProp> = students?.map((student) => {
    return {
      key: student.student_id,
      value: student.full_name,
      image_path: null,
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
    dispatch(getAllStudents(""));
  }, []);

  return (
    <Flex gap={4} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <Tabs.Root
        padding={4}
        gap={2}
        fitted
        defaultValue={"payments"}
        variant={"subtle"}
      >
        <Tabs.List bg={"gray.200"} rounded={"2xl"} padding={"2"} width={"full"}>
          <Tabs.Trigger value="payments">Payments</Tabs.Trigger>
          <Tabs.Trigger value="expences">Expences</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="payments">
          <AdminPayments
            coursesSelectList={coursesSelectList}
            studentSelectList={studentSelectList}
          />
        </Tabs.Content>
        <Tabs.Content value="expences">
          <AdminExpences expenceTypeList={[]} teacherList={teacherSelectList} />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default AdminAccounting;
