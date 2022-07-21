import {  Flex, FormControl, FormErrorMessage, FormLabel, Input, Text, VStack } from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import * as Yup from "yup";

interface RegisterFormProops {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
}

function RegisterForm() {
  const steps = [
    { label: "Step 1", description: "Step 1 description" },
    { label: "Step 2", description: "Step 2 description" },
    { label: "Step 3", description: "Step 3 description" },
  ];
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });
  const initialValues: RegisterFormProops = {
    fullName: "",
    email: "",
    mobile: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const onSubmit = (values: RegisterFormProops, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Flex flexDir={"column"} align="center">
      <Flex>
        <Steps colorScheme="telegram" activeStep={activeStep}>
          {steps.map(({ label, description }, index) => (
            <Step label={label} key={label} description={description} />
          ))}
        </Steps>
      </Flex>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form autoComplete="off">
            <VStack spacing={4}>
            <FormControl isInvalid={formik.touched.fullName}>
              <FormLabel htmlFor="fullName">
                <Text
                  color={"#636363"}
                  fontSize="12px"
                  fontWeight={"600"}
                  fontFamily="body"
                >
                  Full Name
                </Text>
              </FormLabel>
              <Input
                id="fullName"
                type={"text"}
                value={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor="#636363"
                border={"1px"}
                placeholder="Full Name"
                rounded={"10px"}
              />
              <FormErrorMessage>
                <ErrorMessage name="fullName" />
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.touched.email}>
              <FormLabel htmlFor="email">
                <Text
                  color={"#636363"}
                  fontSize="12px"
                  fontWeight={"600"}
                  fontFamily="body"
                >
                  Email
                </Text>
              </FormLabel>
              <Input
                id="email"
                type={"text"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor="#636363"
                border={"1px"}
                placeholder="email address"
                rounded={"10px"}
              />
              <FormErrorMessage>
                <ErrorMessage name="email" />
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.touched.mobile}>
              <FormLabel htmlFor="mobile">
                <Text
                  color={"#636363"}
                  fontSize="12px"
                  fontWeight={"600"}
                  fontFamily="body"
                >
                  Mobile Number
                </Text>
              </FormLabel>
              <Input
                id="mobile"
                type={"text"}
                value={formik.values.mobile}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor="#636363"
                border={"1px"}
                placeholder="Mobile Number"
                rounded={"10px"}
              />
              <FormErrorMessage>
                <ErrorMessage name="mobile" />
              </FormErrorMessage>
            </FormControl>
            </VStack>
          </Form>
        )}
      </Formik>
    </Flex>
  );
}

export default RegisterForm;
