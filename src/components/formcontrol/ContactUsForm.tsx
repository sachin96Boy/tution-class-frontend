import { VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";
import InputComponent from "./InputComponent";

type ContactFormProps = {
  fullName: string;
  email: string;
  grade: string;
  isTeacher: boolean;
  contentBody: string;
};

function ContactUsForm() {
  const initialValues: ContactFormProps = {
    fullName: "",
    email: "",
    grade: "",
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
          <VStack spacing={4}>
            <InputComponent
              htmlFor="name"
              placeHolder="Full Name"
              labelText="Full Name"
              InputType={"text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputValue={formik.values.fullName}
              formikError="fullName"
            />
            <InputComponent
              htmlFor="email"
              placeHolder="Email address"
              labelText="Email Address"
              InputType={"email"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputValue={formik.values.email}
              formikError="email"
            />
            <InputComponent
              htmlFor="grade"
              placeHolder="User Grade"
              labelText="User Grade"
              InputType={"text"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              InputValue={formik.values.grade}
              formikError="grade"
            />
            
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default ContactUsForm;
