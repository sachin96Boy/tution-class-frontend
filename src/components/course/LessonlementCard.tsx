import { IgetCourseProps } from "@/features/course/courseAction";
import { CoursePart } from "@/pages/CourseDetails";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

import { NavLink } from "react-router-dom";

interface LessonEementCardProps {
  grade: string;
  lessonName: string;
  date: string;
  viewResource: string;
  attendNow: string;
  imgSrc: string;
  CourseContent: CoursePart;
}

function LessonlementCard({
  grade,
  lessonName,
  date,
  viewResource,
  attendNow,
  imgSrc,
  CourseContent,
}: LessonEementCardProps) {

  const courseId = CourseContent.Course.course_id;
  const encodedId = encodeURIComponent(courseId);

  return (
    <Box
      m={2}
      p={4}
      maxW={["100%", "100%", "300px"]} // Responsive max width
      bg="#FFFFFF"
      rounded={"16px"}
      boxShadow="sm"
      _hover={{ boxShadow: "md" }}
      transition="box-shadow 0.2s"
    >
      <Flex flexDir={"column"} align="center">
        {/* Image Section */}
        <Image
          objectFit={"cover"}
          rounded={"12px"}
          src={imgSrc}
          alt={lessonName}
          w={["100%", "100%", "238px"]} // Responsive width
          h={["120px", "120px", "109px"]} // Responsive height
        />

        {/* Content Section */}
        <Flex
          align={"start"}
          justify={"space-between"}
          w="100%"
          mt={3}
          gap={2}
          flexDir={["column", "column", "column", "row"]} // Stack vertically on small screens
        >
          {/* Left Section (Grade, Lesson Name, Date, View Resource) */}
          <Box flex={1}>
            <Button
              bgGradient={
                "linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
              }
              color={"white"}
              rounded={"10px"}
              colorScheme={"yellow"}
              px={3}
              h={"20px"}
              mb={2}
            >
              <Text fontFamily={"body"} fontWeight="400" fontSize={"12px"}>
                {grade}
              </Text>
            </Button>
            <Heading
              as={"h3"}
              color="#000000"
              fontFamily={"body"}
              fontSize={["16px", "16px", "20px"]} // Responsive font size
              fontWeight="600"
              mb={1}
            >
              {lessonName}
            </Heading>
            <Text
              color={"#7E7E7E"}
              fontFamily={"body"}
              fontSize="12px"
              fontWeight={"400"}
              mb={2}
            >
              {date}
            </Text>
            <Link
              color="blue.500"
              fontSize="14px"
              fontWeight="500"
              _hover={{ textDecoration: "underline" }}
              onClick={() => window.open(viewResource)}
            >
              View Resource
            </Link>
          </Box>

          {/* Right Section (Attend Now Button) */}
          <Flex align={"center"} justify={"center"} ml={[-2, -2, -2, 0]}>
            <NavLink to={`/dashboard/player/${encodedId}/${attendNow}`}>
              <Button
                w={["100%", "100%", "75px"]} // Full width on small screens
                h={"52px"}
                color={"white"}
                rounded={"5px"}
                bg="blackAlpha.800"
                _hover={{ bg: "blackAlpha.900" }}
                px={3}
                // onClick={() => window.open(attendNow)}
              >
                <Text fontFamily={"body"} fontWeight="600" fontSize={"12px"}>
                  Attend Now
                </Text>
              </Button>
            </NavLink>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default LessonlementCard;
