import {
  Box,
  Heading,
  HStack,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import CourseDetailCard, {
  CourseDetailsProps,
} from "../components/course/CourseDetailCard";
import LessonlistAccordian from "../components/course/LessonlistAccordian";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getcoursebyCourseId,
  getStudentcourseDatabyCourseId,
  IgetCourseProps,
} from "@/features/course/courseAction";

export interface CoursePart {
  id: number;
  title: string;
  course_month: string;
  course_contnt: string;
  Course_video: string;
  course_attachment: string;
  status: boolean;
  month: number;
  Course: IgetCourseProps;
}

export interface MonthGroup {
  month: number;
  data: CoursePart[];
}

function CourseDetails() {
  const params = useParams();

  const dispatch = useDispatch<AppDispatch>();

  const { year, courseId } = params;

  const real_enc_id = courseId
    ? decodeURIComponent(courseId.replace(/ /g, "+"))
    : ""; // Fix spaces back to +

  useEffect(() => {
    dispatch(
      getStudentcourseDatabyCourseId({
        enc_course_id: real_enc_id,
      })
    );
  }, [dispatch]);
  useEffect(() => {
    dispatch(
      getcoursebyCourseId({
        enc_course_id: real_enc_id,
      })
    );
  }, [dispatch]);

  const { loading, studentCourseData, selectedCourse } = useSelector(
    (state: RootState) => state.course
  );

  const CourseDetails: CourseDetailsProps = {
    courseId: "1",
    subject: "Biology",
    subjectName: "Bialogy for biginers",
    teacherName: "Saman Thakur",
    description:
      "Maecenas interdum odio turpis, eget finibus dui sollicitudin id. Aliquam lorem urna, ullamcorper et massa id, malesuada auctor libero. Sed quis ante rhoncus, iaculis diam at, semper dui. Suspendisse neque dui, laoreet et ligula sed, malesuada mollis eros. Duis id nisl purus. Donec molestie congue mi, eu dignissim felis tincidunt id. Fusce posuere ante vitae dignissim facilisis. Duis vehicula, mauris vestibulum mattis efficitur, purus sem elementum elit, et ultricies augue purus id tellus. Etiam non dignissim magna. Cras feugiat turpis nec mattis maximus. Nullam in ullamcorper sapien. Phasellus elementum elit augue, vehicula egestas felis mollis eu. Donec sed nunc volutpat lacus ornare tempus. Morbi ultrices metus vel nulla lobortis tincidunt. Integer diam lacus, finibus sed tempor sed, rhoncus eget eros. Nam sapien felis, mollis id nunc ac, pretium fermentum leo.",
    year: "2021",
    courseImg: "https://picsum.photos/200",
    subcription: "Free",
  };

  function groupByMonth(courseParts: CoursePart[]): MonthGroup[] {
    const monthMap = new Map<number, CoursePart[]>();

    // Group items by month
    for (const item of courseParts) {
      if (!monthMap.has(item.month)) {
        monthMap.set(item.month, []);
      }
      monthMap.get(item.month)?.push(item);
    }

    // Convert the map to the desired array format
    const result: MonthGroup[] = [];
    monthMap.forEach((data, month) => {
      result.push({ month, data });
    });

    // Sort by month (optional)
    result.sort((a, b) => a.month - b.month);

    return result;
  }

  const groupedByMonth = groupByMonth(studentCourseData);


  const SkelitonComponent = () => {
    return (
      <HStack gap="5">
        <SkeletonCircle size="12" />
        <Stack flex="1">
          <Skeleton height="5" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
    );
  };

  return (
    <Box mx={["5", "5", "5", "10"]} overflowX={"hidden"} w="full">
      <Box className="course details card">
        {loading ? (
          <SkelitonComponent />
        ) : selectedCourse != null ? (
          <CourseDetailCard
            courseId={selectedCourse.title}
            subject={selectedCourse.Subject.subject_name}
            subjectName={selectedCourse.Subject.subject_name}
            teacherName={selectedCourse.Teacher.full_name}
            description={selectedCourse.description}
            year={selectedCourse.year.toString()}
            courseImg={selectedCourse.course_img_path}
            subcription={selectedCourse.Grade.grade}
          />
        ) : (
          <Text>No Data to Display</Text>
        )}
      </Box>
      <Box my={10}>
        <Heading
          fontWeight={"bold"}
          bgGradient={"linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"}
          bgClip={"text"}
          text-fill-color="transparent"
          fontFamily="body"
          fontSize={"18px"}
        >
          Lessons
        </Heading>
        <Box maxW={"80vw"}>
          <LessonlistAccordian year={`${year}`} lessonList={groupedByMonth} />
        </Box>
      </Box>
    </Box>
  );
}

export default CourseDetails;
