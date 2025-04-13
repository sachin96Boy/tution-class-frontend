import { Box, Flex, Grid, GridItem, Heading, Input } from "@chakra-ui/react";
import React, { useState } from "react";
import CourseCard, {
  CourseCardProps,
} from "../components/mycourse/courseard/CourseCard";
import { Field } from "@/components/ui/field";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import TeacherProfileCard from "@/components/profilecard/ProfileCard";
import { NavLink } from "react-router-dom";

function TeacherList() {
  const [teacherName, setTeacherName] = useState("");

  const { teachers } = useSelector((state: RootState) => state.teacher);

  return (
    <Box mx={10} w="full">
      <Heading as={"h2"}>Teacher List</Heading>
      <Box className="filter" my={3}>
        <Flex gap={3} align="center">
          <Field htmlFor="teacherName" label="Teacher Name">
            <Input
              id="teacherName"
              w={"full"}
              type={"text"}
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Select Teacher"
              borderColor={"light_bg_blue"}
              borderWidth="1px"
            />
          </Field>
        </Flex>
      </Box>
      <Box className="tacher-list" my={10}>
        <Grid
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
          ]}
          gap={3}
        >
          {teachers.map((teacherElement, index) => {
            const encodedId = encodeURIComponent(teacherElement.teacher_id);
            return (
              <GridItem key={index}>
                <NavLink to={`/dashboard/teacher/${encodedId}`}>
                  <TeacherProfileCard
                    imageUrl={teacherElement.profile_img}
                    name={teacherElement.full_name}
                    role="Teacher"
                  />
                </NavLink>
              </GridItem>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
}

export default TeacherList;
