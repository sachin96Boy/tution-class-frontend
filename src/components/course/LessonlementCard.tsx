import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";

interface LessonEementCardProps {
  grade: string;
  lessonName: string;
  date: string;
  viewResource: string;
  attendNow: string;
  imgSrc: string;
}

function LessonlementCard({
  grade,
  lessonName,
  date,
  viewResource,
  attendNow,
  imgSrc,
}: LessonEementCardProps) {
  return (
    <Box my={2} p={4} maxH={"230px"} bg="#FFFFFF" rounded={"16px"} w='full'>
      <Flex flexDir={"column"} align="center">
        <Image
          objectFit={"cover"}
          rounded={"12px"}
          src={imgSrc}
          alt={lessonName}
          w={"238px"}
          h={"109px"}
        />
        <Flex align={"center"} justify={"start"} my={1}>
          <Box gap={2}>
            <Button
              bgGradient={
                "linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"
              }
              color={"white"}
              rounded={"10px"}
              colorScheme={"yellow"}
              px={3}
              h={"20px"}
            >
              <Text fontFamily={"body"} fontWeight="400" fontSize={"12px"}>
                Grade {grade}
              </Text>
            </Button>
            <Heading
              as={"h3"}
              color="#000000"
              fontFamily={"body"}
              fontSize={"24px"}
              fontWeight="600"
            >
              {lessonName}
            </Heading>
            <Text
              color={"#7E7E7E"}
              fontFamily={"body"}
              fontSize="12px"
              fontWeight={"400"}
            >
              {date}
            </Text>
            <Link onClick={() => window.open(viewResource)}>View Resource</Link>
          </Box>
          <Flex align={"center"} justify={"center"}>
            <Button
              w={"75px"}
              h={"52px"}
              color={"white"}
              rounded={"5px"}
              colorScheme={"blackAlpha"}
              px={3}
              onClick={() => window.open(attendNow)}
            >
              <Text fontFamily={"body"} fontWeight="600" fontSize={"12px"}>
                Attend Now
              </Text>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default LessonlementCard;
