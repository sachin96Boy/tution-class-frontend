import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";

function TeacherList() {
  const [teacherName, setTeacherName] = useState("");
  return (
    <Box mx={10} w="full">
      <Heading as={"h2"}>Teacher List</Heading>
      <Box className="filter">
        <Flex>
          <FormControl>
            <FormLabel htmlFor="teacherName">Teacher Name</FormLabel>
            <Input
              id="teacherName"
              type={"text"}
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Select Teacher"
              borderColor={"#B6D7FF"}
              border="1px"
            />
          </FormControl>
          <Button
            mt={7}
            w={"full"}
            bgGradient={
              "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            }
            colorScheme={"blue"}
            rounded="10px"
            boxShadow={"0px 5px 20px rgba(32, 92, 166, 0.5)"}
            color={"white"}
            fontFamily={"body"}
            fontSize="14px"
            fontWeight={"bold"}
          >
            Search
          </Button>
        </Flex>
      </Box>
      <Box className="tacher-list" my={10}>
        
      </Box>
    </Box>
  );
}

export default TeacherList;
