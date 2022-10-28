import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

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
  return (
    <Box  p={4} maxH={"204px"} bg="#E6F1FF" rounded={"16px"} w='full'>
      <Flex align={"center"} justify="start">
        <Image
          boxSize={"44"}
          objectFit={"cover"}
          src={courseImg}
          alt={subject}
          rounded="12px"
        />
        <Box ml={10}>
          <Flex flexDirection={"column"} align="start" gap={3}>
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
            <Heading
              fontSize={"24px"}
              fontFamily={"body"}
              as={"h2"}
              color="black"
            >
              {teacherName}
            </Heading>
            <Heading
              fontFamily={"body"}
              fontSize={"18px"}
              as={"h4"}
              color={"black"}
              noOfLines={1}
            >
              {year} | {subcription} Course
            </Heading>
            <Text
              fontFamily={"body"}
              fontSize="10px"
              fontWeight={"600"}
              color="#545454"
              noOfLines={5}
              h="44px"
              w={"300px"}
            >
              {description}
            </Text>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}

export default CourseDetailCard;
