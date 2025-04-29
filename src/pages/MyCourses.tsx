import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import CourseCard, {
  CourseCardProps,
} from "../components/mycourse/courseard/CourseCard";

import courseSearch from "@/assets/home/course/search_course_1.svg";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { IListItemProp } from "@/features/config/configAction";

import * as Yup from "yup";
import Spinner from "@/components/spinner/Spinner";
import {
  getcourseDatabyTeacherandSubject,
  getCourseDataByTeacherandSubjectProps,
  getStudentCourses,
  IgetCourseProps,
} from "@/features/course/courseAction";
import { Field } from "@/components/ui/field";

function MyCourses() {
  const [items, setItems] = useState<IgetCourseProps[]>([]);

  const dispatch = useDispatch<AppDispatch>();

  const { userInfo } = useSelector((state: RootState) => state.auth);

  const { teachers } = useSelector((state: RootState) => state.teacher);
  const { subjects } = useSelector((state: RootState) => state.common);

  const { loading, studentSearchedCourses, studentGrantedCourses } =
    useSelector((state: RootState) => state.course);

  let teachersSelectList: Array<IListItemProp> = teachers?.map((teacher) => {
    return {
      key: teacher.teacher_id,
      value: teacher.full_name,
      image_path: teacher.profile_img,
    };
  });
  let subjectSelectList: Array<IListItemProp> = subjects?.map((subject) => {
    return {
      key: subject.subject_id,
      value: subject.subject_name,
      image_path: null,
    };
  });

  let currentYear = new Date().getFullYear();

  let yearArray = [
    currentYear - 3,
    currentYear - 2,
    currentYear - 1,
    currentYear,
  ];

  const initialValues: getCourseDataByTeacherandSubjectProps = {
    teacher_id: {
      key: "",
      value: "",
      image_path: null,
    },
    subject_id: {
      key: "",
      value: "",
      image_path: null,
    },
    year: "",
  };

  const validationSchema = Yup.object().shape({
    teacher_id: Yup.object().shape({
      key: Yup.string().required("Teacher is not valid"),
      value: Yup.string().required("Teacher name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    subject_id: Yup.object().shape({
      key: Yup.string().required("Subject is not valid"),
      value: Yup.string().required("Subject name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    year: Yup.string().required("Year is required"),
  });

  const onSubmit: any = async (
    values: getCourseDataByTeacherandSubjectProps,
    action: any
  ) => {
    await dispatch(getcourseDatabyTeacherandSubject(values));

    action.setSubmitting(false);
    action.resetForm();
  };

  useEffect(() => {
    if (userInfo && userInfo != null) {
      dispatch(
        getStudentCourses({
          enc_student_id: userInfo?.student_id,
        })
      );
    }
  }, [dispatch]);

  useEffect(() => {
    setItems(studentSearchedCourses);
  }, [studentSearchedCourses]);

  useEffect(() => {
    setItems(studentGrantedCourses);
  }, [studentGrantedCourses]);

  const handleClearFilter = () => {
    setItems([]);
  };

  const EmptydCourseData = () => (
    <Box>
      <Flex direction={"column"} alignItems={"center"}>
        <Image
          boxSize={["200px", "300px", "450px"]}
          src={courseSearch}
          alt="Course not found"
        />
        <Text>Course not Found</Text>
      </Flex>
    </Box>
  );

  const ResultData = () => {
    return (
      <>
        {loading ? (
          <Spinner />
        ) : items.length <= 0 ? (
          <EmptydCourseData />
        ) : (
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
            ]}
            gap={3}
          >
            {items.map((course, index) => (
              <GridItem key={index}>
                <CourseCard
                  courseId={course.course_id}
                  grade={course.Grade.grade}
                  subject={course.Subject.subject_id}
                  subjectName={course.Subject.subject_name}
                  teacherName={course.Teacher.full_name}
                  description={course.description}
                  year={course.year.toString()}
                  courseImg={course.course_img_path}
                />
              </GridItem>
            ))}
          </Grid>
        )}
      </>
    );
  };

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
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
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
                  <InputWithSelect
                    htmlFor={"teacher_id"}
                    labelText={"Teacher Name"}
                    InputType={"text"}
                    InputValue={formik.values.teacher_id.value}
                    onBlur={formik.handleBlur}
                    placeHolder={"Select Teacher"}
                    isTouched={
                      formik.touched.teacher_id?.value ||
                      formik.touched.teacher_id?.key
                    }
                    isError={
                      formik.errors.teacher_id?.value ||
                      formik.errors.teacher_id?.key
                    }
                    formik={formik}
                    fieldValue={"teacher_id"}
                    dataList={teachersSelectList}
                  />
                  <InputWithSelect
                    htmlFor={"subject_id"}
                    labelText={"Subject Name"}
                    InputType={"text"}
                    InputValue={formik.values.subject_id.value}
                    onBlur={formik.handleBlur}
                    placeHolder={"Select Subject"}
                    isTouched={
                      formik.touched.subject_id?.value ||
                      formik.touched.subject_id?.key
                    }
                    isError={
                      formik.errors.subject_id?.value ||
                      formik.errors.subject_id?.key
                    }
                    formik={formik}
                    fieldValue={"subject_id"}
                    dataList={subjectSelectList}
                  />
                </Flex>
                <Field
                  invalid={formik.touched.year || !!formik.errors?.year}
                  htmlFor="year"
                  errorText={formik.errors.year}
                >
                  <ButtonGroup
                    mt={[4, 7]}
                    variant={"outline"}
                    flexWrap="wrap" /* Allow buttons to wrap on smaller screens */
                    gap={[2, 3]}
                    borderWidth={"1px"}
                    borderColor={"light_bg_blue"}
                    rounded={"12px"}
                  >
                    {yearArray.map((yr) => (
                      <Button
                        key={yr}
                        color={
                          formik.values.year == yr.toString()
                            ? "white"
                            : "#CDCDCD"
                        }
                        bgColor={
                          formik.values.year == yr.toString()
                            ? "border_focus_color"
                            : "light_bg_card"
                        }
                        border={"1px"}
                        borderColor={"border_focus_color"}
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
                </Field>
                <Flex
                  flexDirection={["column", "column", "column", "row"]}
                  gap={[2, 3, 4]}
                  w={["full", "full", "auto"]}
                >
                  <Button
                    type="button"
                    onClick={() => formik.handleSubmit()}
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
        <ResultData />
      </Box>
    </Box>
  );
}

export default MyCourses;
