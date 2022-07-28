import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import CourseDetailCard, {
  CourseDetailsProps,
} from "../components/course/CourseDetailCard";
import LessonlistAccordian from "../components/course/LessonlistAccordian";

function CourseDetails() {
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
  return (
    <Box mx={"10"} w="full">
      <Box className="course details card">
        <CourseDetailCard
          courseId={CourseDetails.courseId}
          subject={CourseDetails.subject}
          subjectName={CourseDetails.subjectName}
          teacherName={CourseDetails.teacherName}
          description={CourseDetails.description}
          year={CourseDetails.year}
          courseImg={CourseDetails.courseImg}
          subcription={CourseDetails.subcription}
        />
      </Box>
      <Box my={10}>
        <Heading
        fontWeight={'bold'}
          bgGradient={"linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"}
          bgClip={"text"}
          text-fill-color="transparent"
          fontFamily="body"
          fontSize={"18px"}
        >
          Lessons
        </Heading>
        <LessonlistAccordian />
      </Box>
    </Box>
  );
}

export default CourseDetails;
