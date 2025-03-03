import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export interface CourseCardProps {
  courseId: string;
  grade: string;
  subject: string;
  subjectName: string;
  teacherName: string;
  description: string;
  year: string;
  courseImg: string;
}

function CourseCard({
  courseId,
  grade,
  subject,
  subjectName,
  teacherName,
  description,
  year,
  courseImg,
}: CourseCardProps) {
  const navigate = useNavigate();
  return (
    <Box
      my={5}
      p={5}
      maxW={"full"}
      bg="light_bg_card"
      rounded={"16px"}
      cursor={"pointer"}
      onClick={() => navigate(`/dashboard/course/${year}/${courseId}`)}
    >
      <Flex align={"center"} justify="space-around">
        <Image
          boxSize={"32"}
          objectFit={"cover"}
          src={courseImg}
          alt={subject}
          rounded="12px"
        />
        <Box ml={3}>
          <Flex flexDirection={"column"} align="start" gap={1}>
            <Button
              bgGradient={" linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"}
              color="white"
              rounded={"10px"}
              colorScheme="yellow"
              w="112px"
              h={"26px"}
            >
              <Text fontFamily={"body"} fontWeight="600" fontSize={"12px"}>
                Grade {grade}
              </Text>
            </Button>
            <Heading
              fontSize={"24px"}
              fontFamily={"body"}
              as={"h2"}
              color="black"
              maxLines={1}
            >
              {subjectName}
            </Heading>
            <Heading
              fontSize={"18px"}
              fontFamily={"body"}
              as={"h4"}
              color="black"
              maxLines={1}
            >
              {teacherName}
            </Heading>
            <Text
              fontFamily={"body"}
              fontSize="10px"
              fontWeight={"600"}
              color="#545454"
              h={"44px"}
              
               lineClamp="3"
            >
              {description}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CourseCard;
