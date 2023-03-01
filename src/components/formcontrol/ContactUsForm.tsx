import { VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";

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
    >{
        (formik)=>(
            <Form>
                <VStack spacing={4}>
                    
                </VStack>
            </Form>
        )
    }</Formik>
  );
}

export default ContactUsForm;
