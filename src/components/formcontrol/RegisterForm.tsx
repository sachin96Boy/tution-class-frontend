import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import * as Yup from "yup";
import { HiEye, HiEyeOff } from "react-icons/hi";
import firebaseApp from "../../firebase/firebase";
import {
  getAuth,
  RecaptchaVerifier,
  sendEmailVerification,
  signInWithPhoneNumber,
  updateEmail,
  updatePassword,
  updateProfile,
} from "firebase/auth";

interface RegisterFormProops {
  fullName: string;
  email: string;
  mobile: string;
  otpNumber: string;
  password: string;
}

function RegisterForm() {
  const auth = getAuth(firebaseApp);
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [verifyOTP, setVerifyOTP] = useState<boolean>(false);
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
    { label: "Step 1", description: "Name and Email Address" },
    { label: "Step 2", description: "Mobile Number Verification" },
    { label: "Step 3", description: "Password Submission" },
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
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    mobile: Yup.string().required("Mobile is required"),
    otpNumber: Yup.string().required("OTP is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 6 characters"),
  });
  const onSubmit = async (values: RegisterFormProops, actions: any) => {
    const user = auth.currentUser;
    console.log("user", user);
    if (user) {
      // update profile of the user
      await updateProfile(user, {
        displayName: values.fullName,
      })
        .then(() => {
          console.log("Profile Updated");
        })
        .catch((error) => {
          console.log(error);
        });
      // update email of the user
      await updateEmail(user, values.email)
        .then(() => {
          console.log("Email Updated");
        })
        .catch((error) => {
          console.log(error);
        });
      // update password of the user
      await updatePassword(user, values.password)
        .then(() => {
          console.log("Password Updated");
        })
        .catch((error) => {
          console.log(error);
        });
      // send verification email to the user
      await sendEmailVerification(user)
        .then(() => {
          console.log("Verification Email Sent");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    actions.setSubmitting(false);
    actions.resetForm();

  };

  const handleThis = (e: any) => {
    e.preventDefault();
  };

  const handleSendOTP = (mobile: string) => {
    (window as any).recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
        callback: (response: any) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          console.log(response);
          handleSignIn(mobile);
        },
        "expired-callback": () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
        },
      },
      auth
    );
    handleSignIn(mobile);
  };

  const handleSignIn = (number: string) => {
    const phoneNumber = `+94${number}`;
    const appVerifier = (window as any).recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        (window as any).confirmationResult = confirmationResult;
        setShowOTP(true);
        appVerifier.clear();
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
      })
      .catch((error) => {
        console.log(error);
        (window as any).grecaptcha.reset((window as any).recaptchaWidgetId);
        // Error; SMS not sent
        // ...
      });
  };

  const handleVerifyOTP = (otpNumber: string) => {
    (window as any).confirmationResult
      .confirm(otpNumber)
      .then((result: any) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
        setVerifyOTP(true);
        // ...
      })
      .catch((error: any) => {
        // User couldn't sign in (bad verification code?)
        // ...
        console.log(error);
      });
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
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form autoComplete="off" onSubmit={handleThis}>
            <VStack spacing={4}>
              {activeStep === 0 && (
                <>
                  <FormControl>
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
                  <FormControl>
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
                  <Flex align={"center"} justify="center">
                    <FormControl>
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
                      <InputGroup>
                        <InputLeftAddon children="+94" />
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
                      </InputGroup>
                      <FormErrorMessage>
                        <ErrorMessage name="mobile" />
                      </FormErrorMessage>
                    </FormControl>
                    <Button
                      ml={10}
                      mt={6}
                      onClick={() => handleSendOTP(formik.values.mobile)}
                    >
                      Send OTP
                    </Button>
                    <Box id="recaptcha-container" />
                  </Flex>
                  {showOTP && (
                    <Flex align={"center"} justify="center">
                      <FormControl>
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
                      <Button
                        ml={10}
                        mt={6}
                        onClick={() => handleVerifyOTP(formik.values.otpNumber)}
                      >
                        Verify OTP
                      </Button>
                    </Flex>
                  )}
                </>
              )}
              {activeStep === 2 && (
                <>
                  <FormControl>
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
                    <FormHelperText>
                      <Text
                        color={"#636363"}
                        fontSize="12px"
                        fontWeight={"600"}
                        fontFamily="body"
                      >
                        Password must be at least 8 characters long, contain
                        letters and numbers, and must not contain spaces,
                      </Text>
                    </FormHelperText>
                  </FormControl>
                  <Button
                    type="button"
                    width={"full"}
                    border={"10px"}
                    colorScheme="blue"
                    bgGradient={
                      "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                    }
                    boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
                    onClick={()=>formik.handleSubmit()}
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
          <Button
            size="sm"
            onClick={nextStep}
            disabled={!showOTP && !verifyOTP && activeStep === 1 ? true : false}
          >
            {activeStep === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default RegisterForm;
