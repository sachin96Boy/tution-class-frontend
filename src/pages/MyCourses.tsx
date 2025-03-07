import {
  Box,
  Button,
  ButtonGroup,
  Flex,
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
import { Field } from "@/components/ui/field";
import InputComponent from "@/components/formcontrol/InputComponent";

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
  const initialValues: Values = {
    teacherName: "",
    subjectName: "",
    year: "",
  };
  const onSubmit: any = (values: Values, action: FormikHelpers<Values>) => {
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

  let filteredCourseData = (
    <Box>
      <Flex alignItems={"center"}>
        <Heading as={"h2"}>Item not Found, What Do you want me to do?</Heading>
      </Flex>
    </Box>
  );

  if (teacherName || subjectName || year) {
    filteredCourseData = (
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
    );
  }

  return (
    <Box mx={[2, 4, 6, 10]} w="full">
      {" "}
      {/* Responsive margin */}
      <Heading
        as={"h2"}
        fontSize={["20px", "24px", "28px", "32px"]}
        my={[2, 4]}
      >
        {" "}
        {/* Responsive font size */}
        Course List
      </Heading>
      <Box className="filter" my={[4, 6, 8, 10]}>
        {" "}
        {/* Responsive margin */}
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {(formik) => (
            <Form autoComplete="off">
              <Flex
                align={"center"}
                flexDirection={["column", "column", "row"]}
                justify="space-between"
                gap={[3, 5, 10]}
              >
                <Flex
                  flexDirection={["column", "column", "column", "row"]}
                  gap={[2, 3, 4]}
                  w={["full", "full", "auto"]}
                >
                  <InputComponent
                    htmlFor={"teacherName"}
                    labelText={"Teacher Name"}
                    InputType={"text"}
                    InputValue={formik.values.teacherName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder={"Select Teacher"}
                    isTouched={formik.touched.teacherName}
                    isError={formik.errors.teacherName}
                  />
                  <InputComponent
                    htmlFor={"subjectName"}
                    labelText={"Subject Name"}
                    InputType={"text"}
                    InputValue={formik.values.subjectName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder={"Select Subject"}
                    isTouched={formik.touched.subjectName}
                    isError={formik.errors.subjectName}
                  />
                </Flex>
                <ButtonGroup
                  mt={[4, 7]}
                  variant={"outline"}
                  flexWrap="wrap" /* Allow buttons to wrap on smaller screens */
                  gap={[2, 3]}
                  borderWidth={"1px"}
                  borderColor={"light_bg_blue"}
                  rounded={"12px"}
                >
                  {["2021", "2022", "2023", "2024"].map((yr) => (
                    <Button
                      key={yr}
                      color={"#CDCDCD"}
                      border={"1px"}
                      borderColor="#B6D7FF"
                      onClick={() => {
                        formik.setFieldValue("year", yr);
                      }}
                      flex={[
                        "1 1 45%",
                        "0 0 auto",
                      ]} /* Responsive button sizing */
                    >
                      {yr}
                    </Button>
                  ))}
                </ButtonGroup>
                <Flex
                  flexDirection={["column", "column", "column", "row"]}
                  gap={[2, 3, 4]}
                  w={["full", "full", "auto"]}
                >
                  <Button
                    type="submit"
                    mt={[4, 7]}
                    loading={formik.isSubmitting}
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
                      fontSize={["12px", "14px"]}
                      fontWeight={"bold"}
                    >
                      Apply Filters
                    </Text>
                  </Button>
                  <Button
                    type="button"
                    mt={[4, 7]}
                    colorPalette="red"
                    rounded="10px"
                    boxShadow={"0px 5px 20px rgba(32, 92, 166, 0.5)"}
                    color={"white"}
                    onClick={handleClearFilter}
                  >
                    <Text
                      fontFamily={"body"}
                      fontSize={["12px", "14px"]}
                      fontWeight={"bold"}
                    >
                      Clear Filters
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            </Form>
          )}
        </Formik>
      </Box>
      <Box className="course-list" my={[4, 6, 8, 10]}>
        {" "}
        {/* Responsive margin */}
        {filteredCourseData}
      </Box>
    </Box>
  );
}

export default MyCourses;
