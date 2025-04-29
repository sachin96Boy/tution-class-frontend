import { Button, RatingGroup, Text, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";

import * as Yup from "yup";
import InputComponent from "./customInput/InputComponent";
import InputTextAreaComponent from "./InputTextAreaComponent";

type ContactFormProps = {
  fullName: string;
  email: string;
  grade: number;
  isTeacher: boolean;
  contentBody: string;
};

function ContactUsForm() {
  const [value, setValue] = useState(3);
  const initialValues: ContactFormProps = {
    fullName: "",
    email: "",
    grade: value,
    isTeacher: false,
    contentBody: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name Required"),
    email: Yup.string()
      .email("Invalid Email Address")
      .required("Email is required"),
    grade: Yup.string().required("grade required"),
    isTeacher: Yup.boolean().required(),
    contentBody: Yup.string().required("Body content Required"),
  });
  const onSubmit = (values: ContactFormProps) => {
    console.log(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form>
          <VStack gap={4}>
            <InputComponent
              htmlFor="name"
              placeHolder="Full Name"
              labelText="Full Name"
              InputType={"text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputValue={formik.values.fullName}
              isTouched={formik.touched.fullName}
              isError={formik.errors.fullName}
            />
            <InputComponent
              htmlFor="email"
              placeHolder="Email address"
              labelText="Email Address"
              InputType={"email"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputValue={formik.values.email}
              isTouched={formik.touched.email}
              isError={formik.errors.email}
            />
            {/* <InputComponent
              htmlFor="grade"
              placeHolder="User Grade"
              labelText="User Grade"
              InputType={"text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputValue={formik.values.grade}
              isTouched={formik.touched.grade}
              isError={formik.errors.grade}
            /> */}
            <RatingGroup.Root
              count={5}
              gap={2}
              value={value}
              size={"lg"}
              colorPalette={"yellow"}
              onValueChange={(e) => setValue(e.value)}
            >
              <RatingGroup.HiddenInput />
              <RatingGroup.Label>
                <Text>Rating</Text>
              </RatingGroup.Label>
              <RatingGroup.Control />
            </RatingGroup.Root>
            <InputTextAreaComponent
              htmlFor="BodyContent"
              placeHolder="Say Something to us"
              labelText="You Message"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputValue={formik.values.contentBody}
              isTouched={formik.touched.contentBody}
              isError={formik.errors.contentBody}
            />

            <Button
              type="submit"
              width={"full"}
              border={"10px"}
              colorPalette="blue"
              bgGradient={
                "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
              }
              boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
              loading={formik.isSubmitting}
            >
              <Text
                fontFamily={"body"}
                fontSize="21px"
                color="white"
                fontWeight={"400"}
              >
                Submit
              </Text>
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default ContactUsForm;
