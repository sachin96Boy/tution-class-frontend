import AttandanceMarkForm from "@/components/admin/forms/AttandanceMarkForm";
import QrScanner from "@/components/admin/scanner/QrScanner";
import { toaster } from "@/components/ui/toaster";
import {
  getCourseDataBasedOnTime,
  markAttandance,
} from "@/features/attandance/attandanceAction";
import { IListItemProp } from "@/features/config/configAction";
import { getAllCourses } from "@/features/course/courseAction";
import { getAllStudents } from "@/features/student/studentAction";
import { AppDispatch, RootState } from "@/store";
import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  createListCollection,
  Flex,
  Icon,
  Portal,
  Select,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Pen, QrCode } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

function AdminAttandance() {
  const [showScanner, setShowScanner] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");

  const dispatch = useDispatch<AppDispatch>();

  const { courses } = useSelector((state: RootState) => state.course);
  const { students } = useSelector((state: RootState) => state.student);

  const {
    loading,
    student,
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

  const date = new Date();
  const year = date.getFullYear();

  const timeTableCourses = createListCollection({
    items: stCourses,
    itemToValue: (item) => item.course_id,
    itemToString: (item) => item.title,
  });

  useEffect(() => {
    dispatch(getAllCourses(""));
    dispatch(getAllStudents(""));
  }, [dispatch]);

  useEffect(() => {
    if (student != null) {
      dispatch(
        getCourseDataBasedOnTime({
          year: year,
          timestamp: date,
        })
      );
    }
  }, [student, dispatch]);

  const markVisibility = () => {
    setShowScanner(!showScanner);
  };

  const handleAttandanceMark = async () => {
    if (selectedCourse == "") {
      toaster.create({
        type: "error",
        title: "Please Select a course",
      });
      return;
    }
    if (student != null) {
      await dispatch(
        markAttandance({
          course_id: selectedCourse,
          student_id: student?.student_id,
          date: date,
        })
      );
    }
  };

  const HandlePopUp = () => {
    return (
      <>
        {student ? (
          <Box>
            <VStack gap={2}>
              <Box>
                <Flex gap={2} align={"center"}>
                  <Avatar.Root shape="full" size="lg">
                    <Avatar.Fallback name={student.full_name} />
                    <Avatar.Image
                      src={student.AdditionalStudentDatum.profile_image}
                    />
                  </Avatar.Root>
                  <Text fontSize="sm" color="gray.400" fontWeight="normal">
                    {student.full_name}
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Select.Root
                  onValueChange={(obj) => setSelectedCourse(obj.value[0])}
                  value={[selectedCourse]}
                  collection={timeTableCourses}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Select Course</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Type" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner width={"full"}>
                    <Select.Content>
                      {timeTableCourses.items.map((item) => (
                        <Select.Item item={item} key={item.course_id}>
                          {item.title}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Box>
              <Box>
                <Button onClick={handleAttandanceMark} colorPalette={"blue"}>
                  Mark Attandance
                </Button>
              </Box>
            </VStack>
          </Box>
        ) : (
          <Box></Box>
        )}
      </>
    );
  };

  const CustomQRCardComponent = () => {
    return (
      <Card.Root>
        <Card.Header>
          <Button colorPalette={"blue"} onClick={markVisibility}>
            {showScanner ? "Hide scanner" : "Show scanner"}
          </Button>
        </Card.Header>
        <Card.Body>
          <HandlePopUp />
          <QrScanner visibility={showScanner} />
        </Card.Body>
      </Card.Root>
    );
  };

  return (
    <Flex width={"full"} gap={4} flexDir={"column"}>
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
