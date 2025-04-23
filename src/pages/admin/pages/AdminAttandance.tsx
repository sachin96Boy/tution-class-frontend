import AttandanceMarkForm from "@/components/admin/forms/AttandanceMarkForm";
import QrScanner from "@/components/admin/scanner/QrScanner";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses } from "@/features/course/courseAction";
import { getAllStudents } from "@/features/student/studentAction";
import { AppDispatch, RootState } from "@/store";
import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Icon,
  Portal,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { Pen, QrCode } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

function AdminAttandance() {
  const [showScanner, setShowScanner] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { courses } = useSelector((state: RootState) => state.course);
  const { students } = useSelector((state: RootState) => state.student);

  const {
    loading,
    studennt,
    error,
    courses: stCourses,
    success,
  } = useSelector((state: RootState) => state.attandance);

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

  useEffect(() => {
    dispatch(getAllCourses(""));
    dispatch(getAllStudents(""));
  }, []);

  const markVisibility = () => {
    setShowScanner(!showScanner);
  };

  const containerRef = useRef(null);

  const HandlePopUp = () => {
    return (
      <Portal container={containerRef}>
        <Box>Portal content</Box>
      </Portal>
    );
  };

  const CustomQRCardComponent = () => {
    return (
      <Card.Root maxW={"lg"}>
        <Card.Header>
          <Button colorPalette={"blue"} onClick={markVisibility}>
            {showScanner ? "Hide scanner" : "Show scanner"}
          </Button>
        </Card.Header>
        <Card.Body>
          <HandlePopUp />
          <QrScanner visibility={showScanner} />
          <Box ref={containerRef} />
        </Card.Body>
      </Card.Root>
    );
  };

  return (
    <Flex
      width={"full"}
      align={"center"}
      justify={"center"}
      minH={"100vh"}
      gap={4}
      flexDir={"column"}
    >
      <Tabs.Root
        fitted
        variant={"subtle"}
        defaultValue={"qr"}
        padding={4}
        gap={2}
      >
        <Tabs.List bg={"gray.200"} rounded={"2xl"} padding={"2"} width={"full"}>
          <Tabs.Trigger value="qr">
            <Icon>
              <QrCode />
            </Icon>
            Mark Attandance based on QR
          </Tabs.Trigger>
          <Tabs.Trigger value="manual">
            <Icon>
              <Pen />
            </Icon>
            Manual Attandance Mark
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="qr">
          <CustomQRCardComponent />
        </Tabs.Content>
        <Tabs.Content value="manual">
          <Card.Root>
            <Card.Body>
              <AttandanceMarkForm
                studentList={studentSelectList}
                courseList={coursesSelectList}
              />
            </Card.Body>
          </Card.Root>
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  );
}

export default AdminAttandance;
