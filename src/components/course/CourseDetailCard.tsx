import { requestCourseAccess } from "@/features/course/courseAction";
import { AppDispatch, RootState } from "@/store";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ShieldAlert, ShieldCheck, ShieldX } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export interface CourseDetailsProps {
  courseId: string;
  subject: string;
  subjectName: string;
  teacherName: string;
  description: string;
  year: string;
  courseImg: string;
  subcription: string;
}

enum Reqstatus {
  PENDING,
  APPROVED,
  REJECTED,
  NONE,
}

type IactionView = {
  status: string | null;
};

function CourseDetailCard({
  courseId,
  subject,
  subjectName,
  teacherName,
  description,
  year,
  courseImg,
  subcription,
}: CourseDetailsProps) {
  const dispatch = useDispatch<AppDispatch>();

  const { selectedCourse, selectedCourseStatus } = useSelector(
    (state: RootState) => state.course
  );
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const handleAccess = async () => {
    if (selectedCourse != null && userInfo != null) {
      await dispatch(
        requestCourseAccess({
          enc_course_id: selectedCourse?.course_id,
          enc_student_id: userInfo?.student_id,
        })
      );
    }
  };

  const HandleActionView = (props: IactionView) => {
    const { status } = props;

    let ui = <Box />;

    if (status != null) {
      const stat = status.toLowerCase();
      switch (stat) {
        case "none":
          ui = (
            <Button onClick={handleAccess} colorPalette={"blue"}>
              Request Access
            </Button>
          );
          break;

        case "pending":
          ui = (
            <IconButton aria-label="pending" colorPalette={"yellow"}>
              <ShieldAlert />
            </IconButton>
          );
          break;
        case "approved":
          ui = (
            <IconButton aria-label="approved" colorPalette={"green"}>
              <ShieldCheck />
            </IconButton>
          );
          break;
        case "rejected":
          ui = (
            <IconButton aria-label="rejected" colorPalette={"red"}>
              <ShieldX />
            </IconButton>
          );
          break;
      }
    }

    return ui;
  };

  return (
    <Box p={4} maxH={"204px"} bgColor="#E6F1FF" rounded={"16px"} w="full">
      <Flex align={"center"} justify="start">
        <Image
          boxSize={["24", "28", "44"]}
          objectFit={"cover"}
          src={courseImg}
          alt={subject}
          rounded="12px"
        />
        <Box ml={[5, 5, 10]}>
          <Flex flexDirection={"column"} align="start" gap={3}>
            {/* Button wwith subject name */}
            <Button
              bgGradient={
                "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
              }
              color={"white"}
              rounded={"10px"}
              colorScheme={"blue"}
              px={5}
              h={"28px"}
            >
              <Text fontFamily={"body"} fontWeight="400" fontSize={"12px"}>
                {subjectName}
              </Text>
            </Button>
            {/* Teacher name */}
            <Heading
              fontSize={["16px", "16px", "24px"]}
              fontFamily={"body"}
              as={"h2"}
              color="black"
            >
              {teacherName}
            </Heading>
            {/* year and course subscription details */}
            <Heading
              fontFamily={"body"}
              fontSize={["16px", "16px", "18px"]}
              as={"h4"}
              color={"black"}
              lineClamp="1"
            >
              {year} | {subcription} Course
            </Heading>
            {/* course description */}
            <Text
              fontFamily={"body"}
              fontSize="10px"
              fontWeight={"600"}
              color="#545454"
              lineClamp="3"
              h="44px"
              w={["full", "full", "full", "300px"]}
            >
              {description}
            </Text>
          </Flex>
        </Box>
        <Spacer />
        <Flex align={"end"}>
          <HandleActionView status={selectedCourseStatus} />
        </Flex>
      </Flex>
    </Box>
  );
}

export default CourseDetailCard;
