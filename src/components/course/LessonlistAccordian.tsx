import React from "react";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import LessonlementCard from "./LessonlementCard";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../ui/accordion";
import Slider from "react-slick";
import { MonthGroup } from "@/pages/CourseDetails";

export interface LessonContent {
  week: string;
  date: string;
  lessonName: string;
  imgSrc: string;
  lessonContent: string;
  viewResource: string;
  AttendNow: string;
}




type IlessionAccordian = {
  year: string;
  lessonList: MonthGroup[];
};

function getMonthName(monthNumber: number): string {
  const date = new Date();
  date.setMonth(monthNumber - 1); // -1 because months are 0-indexed in Date

  return date.toLocaleString("default", { month: "short" });
  // For short names (Jan, Feb), use { month: 'short' }
}

function LessonlistAccordian(props: IlessionAccordian) {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const { lessonList, year } = props;

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: isMobile ? 1 : 4, // Show 1 slide on mobile, 4 on desktop
    slidesToScroll: 1,
    arrows: !isMobile, // Hide arrows on mobile
    vertical: false,
    verticalSwiping: false,
    responsive: [
      {
        breakpoint: 768, // Adjust for tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box>
      {!lessonList.length ? (
        <Box>No Data Available</Box>
      ) : (
        <AccordionRoot my={2} multiple maxW="80vw">
          {lessonList.map((lessonContent, index) => (
            <AccordionItem
              key={index}
              value={getMonthName(lessonContent.month)}
            >
              <AccordionItemTrigger
                bgGradient="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                _hover={{ bg: "#2B2D4E" }}
                rounded="2xl"
                aria-expanded="false"
              >
                <Box
                  color="white"
                  fontFamily="body"
                  fontWeight="500"
                  fontSize="24px"
                  rounded="10px"
                  p={5}
                >
                  {getMonthName(lessonContent.month)} {year}
                </Box>
              </AccordionItemTrigger>

              <AccordionItemContent>
                <Box bg="light_bg_card" p={2} rounded="2xl">
                  <Slider {...sliderSettings}>
                    {lessonContent.data.map((lesson, index) => (
                      <Box key={index} px={2}>
                        <LessonlementCard
                          CourseContent={lesson}
                          grade={lesson.Course.Grade.grade}
                          date={lesson.course_month}
                          imgSrc={lesson.Course.course_img_path}
                          lessonName={lesson.title}
                          attendNow={lesson.id.toString()}
                          viewResource={lesson.course_attachment}
                        />
                      </Box>
                    ))}
                  </Slider>
                </Box>
              </AccordionItemContent>
            </AccordionItem>
          ))}
        </AccordionRoot>
      )}
    </Box>
  );
}

export default LessonlistAccordian;
