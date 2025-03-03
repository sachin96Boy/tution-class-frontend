import {
  Box,
  Button,
  Flex,
  Group,
  Heading,
  Icon,
  IconButton,
  Input,
  InputAddon,
  StepsRootProvider,
  Text,
  useDisclosure,
  useSteps,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useRef, useState } from "react";
// import { Step, Steps, useSteps } from "chakra-ui-steps";
import * as Yup from "yup";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { AxiosResponse, AxiosError } from "axios";
import useToastResponse from "../toast/ToastResponse";
import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import { StepsItem, StepsList } from "../ui/steps";

interface RegisterFormProops {
  fullName: string;
  email: string;
  mobile: string;
  otpNumber: string;
  password: string;
}

function RegisterForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, newToast] = useToastResponse();
  const [showOTP, setShowOTP] = useState<boolean>(false);
  const [verifyOTP, setVerifyOTP] = useState<boolean>(false);
  const { open, onToggle } = useDisclosure();
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
  const stepsHooks = useSteps({
    defaultStep: 0,
    count: steps.length,
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
    await axios
      .post(
        "/auth/register",
        {
          values: values,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response: AxiosResponse) => {
        newToast({
          status: response.data.status,
          message: response.data.message,
        });
        actions.setSubmitting(false);
        actions.resetForm();
        setVerifyOTP(false);
        setShowOTP(false);
      })
      .catch((error: AxiosError) => {
        alert(error);
      });
  };

  const handleThis = (e: any) => {
    e.preventDefault();
  };

  const handleSendOTP = async (mobile: string) => {
    await axios
      .post(
        `/auth/send-verification-token`,
        {
          phoneNumber: mobile,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.status === "pending") {
          newToast({
            status: "success",
            message: "OTP sent, Please check your mobile",
          });
          setShowOTP(true);
        } else {
          newToast({
            status: "error",
            message: "something went wrong",
          });
        }
      })
      .catch((err: AxiosError) => {
        alert(err);
        setShowOTP(false);
      });
  };

  const handleVerifyOTP = async (mobile: string, otpNumber: string) => {
    await axios
      .post(
        `/auth/check-verification-token`,
        {
          phoneNumber: mobile,
          token: otpNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res: AxiosResponse) => {
        if (res.data.status === "approved") {
          newToast({
            status: "success",
            message: "OTP verified, Please proceed",
          });
          setVerifyOTP(true);
        } else {
          if (!res.data.valid) {
            newToast({
              status: "error",
              message: "OTP Not valid",
            });
            setVerifyOTP(false);
          } else {
            newToast({
              status: "error",
              message: "something went wrong",
            });
            setVerifyOTP(false);
          }
        }
      })
      .catch((err: AxiosError) => {
        alert(err);
        setVerifyOTP(false);
      });
  };

  return (
    <Flex flexDir={"column"} align="center" justify={"center"} gap={10}>
      <Flex w={"full"}>
        <StepsRootProvider colorScheme="blue" value={stepsHooks}>
          <StepsList>
            {steps.map(({ label, description }, index) => (
              <StepsItem
                index={index}
                title={label}
                key={label}
                description={description}
              />
            ))}
          </StepsList>
        </StepsRootProvider>
      </Flex>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form autoComplete="off" onSubmit={handleThis}>
            <VStack gap={4}>
              {stepsHooks.value === 0 && (
                <>
                  <Field
                    invalid={
                      formik.touched.fullName && !!formik.touched.fullName
                    }
                    label="Full Name"
                    htmlFor="fullName"
                    errorText={formik.errors.fullName}
                  >
                    <Input
                      id="fullName"
                      css={{ "--focus-color": "blue" }}
                      type={"text"}
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      borderColor={
                        formik.touched.fullName && formik.errors.fullName
                          ? "red"
                          : "#636363"
                      }
                      borderWidth={"1px"}
                      placeholder="Full Name"
                      rounded={"10px"}
                    />
                  </Field>
                  <Field
                    invalid={formik.touched.email && !!formik.errors.email}
                    label="Email Address"
                    htmlFor="email"
                    errorText={formik.errors.email}
                  >
                    <Input
                      id="email"
                      css={{ "--focus-color": "blue" }}
                      type={"text"}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      borderColor={
                        formik.touched.email && formik.errors.email
                          ? "red"
                          : "#636363"
                      }
                      borderWidth={"1px"}
                      placeholder="email address"
                      rounded={"10px"}
                    />
                  </Field>
                </>
              )}
              {stepsHooks.value === 1 && (
                <>
                  <Flex align={"center"} justify="center">
                    <Field
                      invalid={formik.touched.mobile && !!formik.errors.mobile}
                      label="Mobile Number"
                      htmlFor="mobile"
                      errorText={formik.errors.mobile}
                    >
                      <Group attached>
                        <InputAddon>+94</InputAddon>
                        <Input
                          id="mobile"
                          type={"text"}
                          value={formik.values.mobile}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          borderColor={
                            formik.touched.mobile && formik.errors.mobile
                              ? "red"
                              : "#636363"
                          }
                          borderWidth={"1px"}
                          placeholder="Mobile Number"
                          rounded={"10px"}
                        />
                      </Group>
                    </Field>
                    <Button
                      ml={10}
                      mt={6}
                      onClick={() => handleSendOTP(formik.values.mobile)}
                      disabled={
                        formik.values.mobile.length === 9 ? false : true
                      }
                    >
                      Send OTP
                    </Button>
                  </Flex>
                  <Box id="recaptcha-container" />
                  {showOTP && (
                    <Flex align={"center"} justify="center">
                      <Field
                        invalid={
                          formik.touched.otpNumber && !!formik.errors.otpNumber
                        }
                        htmlFor="otpNumber"
                        label="OTP Number"
                        errorText={formik.errors.otpNumber}
                      >
                        <Input
                          id="otpNumber"
                          type={"text"}
                          value={formik.values.otpNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          borderColor={
                            formik.touched.otpNumber && formik.errors.otpNumber
                              ? "red"
                              : "#636363"
                          }
                          borderWidth={"1px"}
                          placeholder="Mobile Number"
                          rounded={"10px"}
                        />
                      </Field>
                      <Button
                        ml={10}
                        mt={6}
                        onClick={() =>
                          handleVerifyOTP(
                            formik.values.mobile,
                            formik.values.otpNumber
                          )
                        }
                        disabled={formik.values.otpNumber.length < 0}
                      >
                        Verify OTP
                      </Button>
                    </Flex>
                  )}
                </>
              )}
              {stepsHooks.value === 2 && (
                <>
                  <Field
                    invalid={
                      formik.touched.password && !!formik.errors.password
                    }
                    label="password"
                    htmlFor="password"
                    errorText={formik.errors.password}
                    helperText=" Password must be at least 8 characters long, contain
                        letters and numbers, and must not contain spaces"
                  >
                    <InputGroup
                      endElement={
                        <Icon
                          aria-label={
                            open ? "Mask password" : "Reveal password"
                          }
                          onClick={() => onClickReveal()}
                        >
                          {open ? (
                            <HiEye style={{ color: "gray.500" }} />
                          ) : (
                            <HiEyeOff style={{ color: "gray.500" }} />
                          )}
                        </Icon>
                      }
                    >
                      <Input
                        id="password"
                        ref={inputRef}
                        type={open ? "text" : "password"}
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor={
                          formik.touched.password && formik.errors.password
                            ? "red"
                            : "#636363"
                        }
                        borderWidth={"1px"}
                        placeholder="Password"
                        rounded={"10px"}
                      />
                    </InputGroup>
                    <Button
                      type="button"
                      width={"full"}
                      border={"10px"}
                      colorScheme="blue"
                      bgGradient={
                        "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                      }
                      boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
                      onClick={() => formik.handleSubmit()}
                      loading={formik.isSubmitting}
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
                  </Field>
                </>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
      {stepsHooks.value === steps.length ? (
        <Flex px={4} py={4} width="100%" flexDirection="column">
          <Heading fontSize="xl" textAlign="center">
            Woohoo! All steps completed!
          </Heading>
          <Button
            mx="auto"
            mt={6}
            size="sm"
            colorScheme="blue"
            bgGradient={
              "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            }
            onClick={() => stepsHooks.resetStep()}
          >
            Reset
          </Button>
        </Flex>
      ) : (
        <Flex width="100%" justify="flex-end">
          <Button
            disabled={stepsHooks.value === 0}
            mr={4}
            onClick={() => stepsHooks.goToPrevStep()}
            size="sm"
            variant="ghost"
          >
            Prev
          </Button>
          <Button
            size="sm"
            onClick={() => stepsHooks.goToNextStep()}
            disabled={!verifyOTP && stepsHooks.value === 1 ? true : false}
            colorScheme="blue"
            bgGradient={
              "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            }
          >
            {stepsHooks.value === steps.length - 1 ? "Finish" : "Next"}
          </Button>
        </Flex>
      )}
    </Flex>
  );
}

export default RegisterForm;
