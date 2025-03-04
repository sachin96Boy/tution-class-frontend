import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import LessonlementCard from "./LessonlementCard";
import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "../ui/accordion";

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
      {
        week: "Week 4",
        date: "03/03/2020",
        lessonName: "Lesson 4",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 4",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
      {
        week: "Week 5",
        date: "03/03/2020",
        lessonName: "Lesson 5",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 5",
        viewResource: "View Resource",
        AttendNow: "Attand Now",
      },
      {
        week: "Week 6",
        date: "03/03/2020",
        lessonName: "Lesson 6",
        imgSrc: "https://picsum.photos/200",
        lessonContent: "This is the content of lesson 6",
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
      <AccordionRoot my={2} multiple w={"full"}>
        {lessonList.map((lessonContent, index) => (
          <AccordionItem key={index} value={lessonContent.subject}>
            <AccordionItemTrigger
              bgGradient={
                "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
              }
              _hover={{
                bg: "#2B2D4E",
              }}
              rounded={"2xl"}
            >
              <Box
                color="white"
                fontFamily={"body"}
                fontWeight="500"
                fontSize={"24px"}
                rounded="10px"
                p={5}
              >
                <Box flex="1" textAlign="left">
                  {lessonContent.month} {lessonContent.year}
                </Box>
              </Box>
            </AccordionItemTrigger>

            <AccordionItemContent>
              <Flex
                bg="light_bg_card"
                align={"center"}
                justify="space-around"
                gap={1}
                p={2}
                rounded={"2xl"}
                flexDirection={["column", "column", "row"]}
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
            </AccordionItemContent>
          </AccordionItem>
        ))}
      </AccordionRoot>
    </Box>
  );
}

export default LessonlistAccordian;
