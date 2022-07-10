import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import { Form, Formik, FormikHelpers } from "formik";
import React from "react";

interface Values {
  teacherName: string;
  subjectName: string;
  year: string;
}

function MyCourses() {
  const initialValues = {
    teacherName: "",
    subjectName: "",
    year: "",
  };
  const onSubmit = (values: Values, action: FormikHelpers<Values>) => {
    console.log(values);
    console.log(action);
  };
  return (
    <Box mx={10}>
      <Heading as={"h2"}>Course List</Heading>
      <Box className="filter" my={10}>
        <Flex align={"center"} justify="space-between">
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => (
              <Form autoComplete="off">
                <Flex>
                  <FormControl>
                    <FormLabel htmlFor="teacherName">Teacher Name</FormLabel>
                    <Input
                      id="teacherName"
                      type={"text"}
                      value={formik.values.teacherName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Select Teacher"
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel htmlFor="subjectName">Subject Name</FormLabel>
                    <Input
                      id="subjectName"
                      type={"text"}
                      value={formik.values.subjectName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Select Subject"
                    />
                  </FormControl>
                </Flex>
              </Form>
            )}
          </Formik>
        </Flex>
      </Box>
    </Box>
  );
}

export default MyCourses;
