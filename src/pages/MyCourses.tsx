import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import CourseCard, {
  CourseCardProps,
} from "../components/mycourse/courseard/CourseCard";

interface Values {
  teacherName: string;
  subjectName: string;
  year: string;
}

function MyCourses() {
  const [teacherName, setTeacherName] = useState("");
  const [subjectName, setSubjectName] = useState("");
  const [year, setYear] = useState("");

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
  const initialValues = {
    teacherName: "",
    subjectName: "",
    year: "",
  };
  const onSubmit = (values: Values, action: FormikHelpers<Values>) => {
    setSubjectName(values.subjectName);
    setTeacherName(values.teacherName);
    setYear(values.year);
    action.setSubmitting(false);
    action.resetForm();
  };

  const handleClearFilter = () => {
    setSubjectName("");
    setTeacherName("");
    setYear("");
  };

  return (
    <Box mx={10} w="full">
      <Heading as={"h2"}>Course List</Heading>
      <Box className="filter" my={10}>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <Form autoComplete="off">
              <Flex align={"center"} justify="space-between" gap={10}>
                <FormControl>
                  <FormLabel htmlFor="teacherName">Teacher Name</FormLabel>
                  <Input
                    id="teacherName"
                    type={"text"}
                    value={formik.values.teacherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Select Teacher"
                    borderColor={"#B6D7FF"}
                    border="1px"
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="subjectName">Subject Name</FormLabel>
                  <Input
                    id="subjectName"
                    type={"text"}
                    value={formik.values.subjectName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Select Subject"
                    borderColor={"#B6D7FF"}
                    border="1px"
                  />
                </FormControl>
                <ButtonGroup mt={7} variant={"outline"} isAttached>
                  <Button
                    color={"#CDCDCD"}
                    border={"1px"}
                    borderColor="#B6D7FF"
                    onClick={() => {
                      formik.setFieldValue("year", "2021");
                    }}
                  >
                    2021
                  </Button>
                  <Button
                    color={"#CDCDCD"}
                    border={"1px"}
                    borderColor="#B6D7FF"
                    onClick={() => {
                      formik.setFieldValue("year", "2022");
                    }}
                  >
                    2022
                  </Button>
                  <Button
                    color={"#CDCDCD"}
                    border={"1px"}
                    borderColor="#B6D7FF"
                    onClick={() => {
                      formik.setFieldValue("year", "2023");
                    }}
                  >
                    2023
                  </Button>
                  <Button
                    color={"#CDCDCD"}
                    border={"1px"}
                    borderColor="#B6D7FF"
                    onClick={() => {
                      formik.setFieldValue("year", "2024");
                    }}
                  >
                    2024
                  </Button>
                </ButtonGroup>
                <Button
                  type="submit"
                  mt={7}
                  w={"full"}
                  isLoading={formik.isSubmitting}
                  bgGradient={
                    "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                  }
                  colorScheme={"blue"}
                  rounded="10px"
                  boxShadow={"0px 5px 20px rgba(32, 92, 166, 0.5)"}
                  color={"white"}
                >
                  <Text
                    fontFamily={"body"}
                    fontSize="14pxx"
                    fontWeight={"bold"}
                  >
                    Apply Filters
                  </Text>
                </Button>
                <Button
                  type="button"
                  mt={7}
                  w={"full"}
                  colorScheme="red"
                  rounded="10px"
                  boxShadow={"0px 5px 20px rgba(32, 92, 166, 0.5)"}
                  color={"white"}
                  onClick={handleClearFilter}
                >
                  <Text
                    fontFamily={"body"}
                    fontSize="14pxx"
                    fontWeight={"bold"}
                  >
                    Clear Filters
                  </Text>
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
      <Box className="course-list" my={10}>
        <Grid templateColumns="repeat(3, 1fr)">
          {courseArray
            .filter((courseElement: CourseCardProps) => {
              if (
                courseElement.teacherName
                  .toLowerCase()
                  .includes(teacherName.toLowerCase()) &&
                courseElement.subjectName
                  .toLowerCase()
                  .includes(subjectName.toLowerCase()) &&
                courseElement.year.toLowerCase().includes(year.toLowerCase())
              ) {
                return courseElement;
              } else if (
                teacherName === "" &&
                subjectName === "" &&
                year === ""
              ) {
                return courseElement;
              } else {
                return null;
              }
            })
            .map((course, index) => (
              <GridItem key={index}>
                <CourseCard
                  courseId={course.courseId}
                  grade={course.grade}
                  subject={course.subject}
                  subjectName={course.subjectName}
                  teacherName={course.teacherName}
                  description={course.description}
                  year={course.year}
                  courseImg={course.courseImg}
                />
              </GridItem>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default MyCourses;
