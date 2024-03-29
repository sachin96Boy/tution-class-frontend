import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import React from "react";
import LessonlementCard from "./LessonlementCard";

export interface LessonContent {
  week: string;
  date: string;
  lessonName: string;
  imgSrc: string;
  lessonContent: string;
  viewResource: string;
  AttendNow: string;
}

interface LessonDetailsListProps {
  subject: string;
  grade: string;
  year: string;
  month: string;
  content: Array<LessonContent>;
}

const lessonList: Array<LessonDetailsListProps> = [
  {
    subject: "Biology",
    grade: "10",
    year: "2020",
    month: "Mar",
    content: [
      {
        week: "Week 1",
        date: "03/03/2020",
        lessonName: "Lesson 1",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 1",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
      {
        week: "Week 2",
        date: "03/03/2020",
        lessonName: "Lesson 2",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 2",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
      {
        week: "Week 3",
        date: "03/03/2020",
        lessonName: "Lesson 3",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 3",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
    ],
  },
  {
    subject: "Math",
    grade: "10",
    year: "2020",
    month: "Mar",
    content: [
      {
        week: "Week 1",
        date: "03/03/2020",
        lessonName: "Lesson 1",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 1",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
      {
        week: "Week 2",
        date: "03/03/2020",
        lessonName: "Lesson 2",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 2",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
      {
        week: "Week 3",
        date: "03/03/2020",
        lessonName: "Lesson 3",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 3",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
    ],
  },
];

function LessonlistAccordian() {
  return (
    <Box>
      {lessonList.map((lessonContent, index) => (
        <Accordion key={index} my={2} allowMultiple w={'full'}>
          <AccordionItem>
            <Heading>
              <AccordionButton
                h={"61.76px"}
                color="white"
                fontFamily={"body"}
                fontWeight="500"
                fontSize={"24px"}
                rounded="10px"
                bgGradient={
                  "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                }
                _hover={{
                  bg: "#2B2D4E",
                }}
              >
                <Box flex="1" textAlign="left">
                  {lessonContent.month} {lessonContent.year}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </Heading>

            <AccordionPanel p={2}>
              <Flex
                bg="#E6F1FF"
                align={"center"}
                justify="space-evenly"
                gap={1}
                flexDirection={["column","column","row"]}
              >
                {lessonContent.content.map((lesson, index) => (
                  <LessonlementCard
                    key={index}
                    grade={lessonContent.grade}
                    date={lesson.date}
                    imgSrc={lesson.imgSrc}
                    lessonName={lesson.lessonName}
                    attendNow={lesson.AttendNow}
                    viewResource={lesson.viewResource}
                  />
                ))}
              </Flex>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      ))}
    </Box>
  );
}

export default LessonlistAccordian;
