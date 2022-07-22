import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useRef } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import * as Yup from "yup";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface RegisterFormProops {
  fullName: string;
  email: string;
  mobile: string;
  otpNumber: string;
  password: string;
}

function RegisterForm() {
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);
  const onClickReveal = () => {
    onToggle();

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };
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
    otpNumber: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    otpNumber: Yup.string().required("OTP is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });
  const onSubmit = (values: RegisterFormProops, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  return (
    <Flex flexDir={"column"} align="center" justify={"center"} gap={10}>
      <Flex w={"full"}>
        <Steps colorScheme="blue" activeStep={activeStep}>
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
              {activeStep === 0 && (
                <>
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
                </>
              )}
              {activeStep === 1 && (
                <>
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
                  <FormControl isInvalid={formik.touched.otpNumber}>
                    <FormLabel htmlFor="otpNumber">
                      <Text
                        color={"#636363"}
                        fontSize="12px"
                        fontWeight={"600"}
                        fontFamily="body"
                      >
                        OTP Number
                      </Text>
                    </FormLabel>
                    <Input
                      id="otpNumber"
                      type={"text"}
                      value={formik.values.otpNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      borderColor="#636363"
                      border={"1px"}
                      placeholder="Mobile Number"
                      rounded={"10px"}
                    />
                    <FormErrorMessage>
                      <ErrorMessage name="otpNumber" />
                    </FormErrorMessage>
                  </FormControl>
                </>
              )}
              {activeStep === 2 && (
                <>
                  <FormControl isInvalid={formik.touched.password}>
                    <FormLabel htmlFor="password">
                      <Text
                        color={"#636363"}
                        fontSize="12px"
                        fontWeight={"600"}
                        fontFamily="body"
                      >
                        password
                      </Text>
                    </FormLabel>
                    <InputGroup>
                      <Input
                        id="password"
                        ref={inputRef}
                        type={isOpen ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Password"
                        rounded={"10px"}
                      />
                      <InputRightElement>
                        <IconButton
                          aria-label={
                            isOpen ? "Mask password" : "Reveal password"
                          }
                          onClick={() => onClickReveal()}
                          variant="link"
                          icon={
                            isOpen ? (
                              <HiEye style={{ color: "gray.500" }} />
                            ) : (
                              <HiEyeOff style={{ color: "gray.500" }} />
                            )
                          }
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>
                      <ErrorMessage name="password" />
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
                    width={"full"}
                    border={"10px"}
                    colorScheme="blue"
                    bgGradient={
                      "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                    }
                    boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
                    isLoading={formik.isSubmitting}
                  >
                    <Text
                      fontFamily={"body"}
                      fontSize="21px"
                      color="white"
                      fontWeight={"400"}
                    >
                      Register
                    </Text>
                  </Button>
                </>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
      {activeStep === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Woohoo! All steps completed!
          </Heading>
          <Button mx="auto" mt={6} size="sm" onClick={reset}>
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            isDisabled={activeStep === 0}
            mr={4}
            onClick={prevStep}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button size="sm" onClick={nextStep}>
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default RegisterForm;
