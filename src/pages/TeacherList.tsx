import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import CourseCard, {
  CourseCardProps,
} from "../components/mycourse/courseard/CourseCard";
import { Field } from "@/components/ui/field";

function TeacherList() {
  const [teacherName, setTeacherName] = useState("");

  const courseArray: Array<CourseCardProps> = [
    {
      courseId: "1",
      grade: "10",
      subject: "Math",
      subjectName: "Mathamatics",
      teacherName: "Mr. John",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even",
      courseImg: "https://picsum.photos/200",
      year: "2020",
    },
    {
      courseId: "2",
      grade: "11",
      subject: "Tamil",
      subjectName: "Tamil for biginers",
      teacherName: "Mr. Smith",
      description: "This is a description",
      courseImg: "https://picsum.photos/200",
      year: "2020",
    },
    {
      courseId: "3",
      grade: "12",
      subject: "Math",
      subjectName: "Mathamatics",
      teacherName: "Mr. Matta",
      description: "This is a description",
      courseImg: "https://picsum.photos/200",
      year: "2020",
    },
    {
      courseId: "4",
      grade: "06",
      subject: "Math",
      subjectName: "Mathamatics for biginers",
      teacherName: "Mr. John",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even",
      courseImg: "https://picsum.photos/200",
      year: "2022",
    },
    {
      courseId: "5",
      grade: "06",
      subject: "Science",
      subjectName: "Science for biginers",
      teacherName: "Mr. John",
      description: "This is a description",
      courseImg: "https://picsum.photos/200",
      year: "2021",
    },
    {
      courseId: "6",
      grade: "10",
      subject: "Science",
      subjectName: "Science and Technology",
      teacherName: "Mr. Abraham",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even",
      courseImg: "https://picsum.photos/200",
      year: "2021",
    },
  ];

  return (
    <Box mx={10} w="full">
      <Heading as={"h2"}>Teacher List</Heading>
      <Box className="filter" my={3}>
        <Flex gap={3} align="center">
          <Field label="teacherName">
            <Input
              id="teacherName"
              w={"full"}
              type={"text"}
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Select Teacher"
              borderColor={"#B6D7FF"}
              border="1px"
            />
          </Field>
        </Flex>
      </Box>
      <Box className="tacher-list" my={10}>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={3}
        >
          {courseArray
            .filter((teacherElement: CourseCardProps) => {
              if (
                teacherElement.teacherName
                  .toLowerCase()
                  .includes(teacherName.toLowerCase())
              ) {
                return teacherElement;
              } else {
                return null;
              }
            })
            .map((teacherElement, index) => (
              <GridItem key={index}>
                <CourseCard
                  courseId={teacherElement.courseId}
                  grade={teacherElement.grade}
                  subject={teacherElement.subject}
                  subjectName={teacherElement.subjectName}
                  teacherName={teacherElement.teacherName}
                  description={teacherElement.description}
                  courseImg={teacherElement.courseImg}
                  year={teacherElement.year}
                />
              </GridItem>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default TeacherList;
