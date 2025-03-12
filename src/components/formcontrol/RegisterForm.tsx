import {
  Button,
  Flex,
  Group,
  Heading,
  Icon,
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

import * as Yup from "yup";
import { HiEye, HiEyeOff } from "react-icons/hi";

import useToastResponse from "../toast/ToastResponse";

import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import { StepsItem, StepsList } from "../ui/steps";
import InputComponent from "./InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { IregisterProps, registerUser } from "@/features/auth/authAction";

function RegisterForm() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, newToast] = useToastResponse();

  const dispatch = useDispatch<AppDispatch>();

  const { loading, error } = useSelector((state: RootState) => state.auth);

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
  const initialValues: IregisterProps = {
    fullName: "",
    email: "",
    phone: "",
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
  const onSubmit = async (values: IregisterProps, actions: any) => {
    const result = await dispatch(registerUser(values));

    actions.setSubmitting(false);

    console.log(result);
  };

  const handleThis = (e: any) => {
    e.preventDefault();
  };

  return (
    <Flex flexDir={"column"} align="center" justify={"center"} gap={10}>
      <Flex
        w={"full"} // Responsive width
        maxW="800px" // Maximum width to ensure it doesn't get too wide on larger screens
      >
        <StepsRootProvider
          orientation={["vertical", "horizontal", "horizontal"]}
          height={["150px", "full"]}
          colorScheme="blue"
          value={stepsHooks}
        >
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
            <VStack gap={4} width={"full"} maxW="800px">
              {stepsHooks.value === 0 && (
                <>
                  <InputComponent
                    htmlFor={"fullName"}
                    labelText={"Full Name"}
                    InputType={"text"}
                    InputValue={formik.values.fullName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder={"Full Name"}
                    isTouched={formik.touched.fullName}
                    isError={formik.errors.fullName}
                  />
                  <InputComponent
                    htmlFor={"email"}
                    labelText={"Email address"}
                    InputType={"email"}
                    InputValue={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder={"Email"}
                    isTouched={formik.touched.email}
                    isError={formik.errors.email}
                  />
                </>
              )}
              {stepsHooks.value === 1 && (
                <>
                  <Flex align={"center"} justify="center" spaceX={6}>
                    <Field
                      invalid={formik.touched.phone && !!formik.errors.phone}
                      label="Mobile Number"
                      htmlFor="mobile"
                      errorText={formik.errors.phone}
                    >
                      <Group attached>
                        <InputAddon>+94</InputAddon>
                        <Input
                          id="mobile"
                          type={"number"}
                          value={formik.values.phone}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          borderColor={
                            formik.touched.phone && formik.errors.phone
                              ? "red"
                              : "border_color"
                          }
                          borderWidth={"1px"}
                          placeholder="Mobile Number"
                          rounded={"10px"}
                        />
                      </Group>
                    </Field>
                  </Flex>
                </>
              )}
              {stepsHooks.value === 2 && (
                <>
                  <Flex
                    flexDirection={"column"}
                    align={"center"}
                    justify={"center"}
                    mx={"5"}
                  >
                    <Field
                      invalid={
                        formik.touched.password && !!formik.errors.password
                      }
                      label="Password"
                      htmlFor="password"
                      errorText={formik.errors.password}
                      helperText="Password must be at least 8 characters long,  contain
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
                          width={"full"}
                          colorPalette={"blue"}
                          ref={inputRef}
                          type={open ? "text" : "password"}
                          value={formik.values.password}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          borderColor={
                            formik.touched.password && formik.errors.password
                              ? "red"
                              : "border_color"
                          }
                          borderWidth={"1px"}
                          placeholder="Password"
                          rounded={"10px"}
                        />
                      </InputGroup>
                    </Field>
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
                  </Flex>
                </>
              )}
            </VStack>
          </Form>
        )}
      </Formik>
      {stepsHooks.value === steps.length ? (
        <Flex
          px={4}
          py={4}
          width={["90%", "80%", "70%", "60%"]}
          maxW="800px"
          flexDirection="column"
        >
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
        <Flex
          width={["90%", "80%", "70%", "60%"]}
          maxW="800px"
          justify="flex-end"
        >
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
