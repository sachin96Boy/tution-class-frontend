import React, { useRef } from "react";
import {
  Avatar,
  Box,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { Form, Formik, FormikConfig, FormikHelpers } from "formik";
import { MdVerifiedUser } from "react-icons/md";
import { BsShieldFillExclamation } from "react-icons/bs";
import { TbCameraPlus } from "react-icons/tb";

interface FormValues {
  fullName: string;
  school: string;
  examAttempt: string;
  examYear: string;
  district: string;
  city: string;
  nic: string;
  address: string;
  mobileNumber: string;
  email: string;
  barcode: string;
  mobileNumber1: string;
  mobileNumber2: string;
  profileImage: File | any;
}

function MyAccount() {
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const initialValues: FormValues = {
    fullName: "",
    school: "",
    examAttempt: "",
    examYear: "",
    district: "",
    city: "",
    nic: "",
    address: "",
    mobileNumber: "",
    email: "",
    barcode: "",
    mobileNumber1: "",
    mobileNumber2: "",
    profileImage: "",
  };
  const onSubmit = (values: FormValues, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
  };

  const validationSchema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    school: yup.string().required("School is required"),
    examAttempt: yup.string().required("Exam Attempt is required"),
    examYear: yup.string().required("Exam Year is required"),
    district: yup.string().required("District is required"),
    city: yup.string().required("City is required"),
    nic: yup.string().required("NIC is required"),
    address: yup.string().required("Address is required"),
    mobileNumber: yup.string().required("Mobile Number is required"),
    email: yup.string().required("Email is required"),
    barcode: yup.string().required("Barcode is required"),
    mobileNumber1: yup.string().required("Mobile Number 1 is required"),
    mobileNumber2: yup.string().required("Mobile Number 2 is required"),
    profileImage: yup.mixed().required("Profile Image is required"),
  });

  const onClick = () => {
    if (hiddenInputRef && hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  const profilehandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<FormValues>
  ) => {
    console.log(event.target.files);
    const fileUploaded = event.target.files;
    formik.setFieldValue("profileImage", fileUploaded);
  };

  return (
    <Box mx={10}>
      <Heading as={"h2"}>MY ACCOUNT</Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form autoComplete="off">
            <Box
              className="profileBanner"
              p={"24px"}
              rounded={"12px"}
              bg={"gray.50"}
            >
              <Flex align={"center"} justify="center">
                <Box
                  className="Avater-box"
                  rounded={"full"}
                  bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                  p={"4px"}
                >
                  <FormControl>
                    <Input
                      id="profileImage"
                      ref={hiddenInputRef}
                      onChange={(event: any) =>
                        profilehandleChange(event, formik)
                      }
                      type={"file"}
                      hidden
                    />
                    <Avatar
                      boxSize={"20"}
                      _hover={{ cursor: "pointer" }}
                      icon={<TbCameraPlus size={'28'} style={{ color: "#ffffffff" }} />}
                      onClick={onClick}
                    />
                  </FormControl>
                </Box>
                <Flex
                  ml={5}
                  flexDirection={"column"}
                  align="start"
                  justify={"center"}
                >
                  <Heading
                    as={"h3"}
                    color="#215DA7"
                    fontWeight={"700"}
                    fontSize="36px"
                    fontFamily={"body"}
                  >
                    Hashan{" "}
                    <Text
                      as={"span"}
                      color="#636363"
                      fontWeight={"500"}
                      fontSize="36px"
                      fontFamily={"body"}
                    >
                      Maduranga
                    </Text>
                  </Heading>
                  <Flex gap={5}>
                    <Flex align={"center"} gap={1}>
                      {" "}
                      <MdVerifiedUser style={{ color: "#2ECC71" }} />
                      <Text
                        fontFamily={"body"}
                        color="#2ECC71"
                        fontSize="18px"
                        fontWeight={"500"}
                      >
                        Verified
                      </Text>
                    </Flex>
                    <Flex align={"center"} gap={1}>
                      {" "}
                      <BsShieldFillExclamation style={{ color: "#F1C40F" }} />
                      <Text
                        fontFamily={"body"}
                        color="#F1C40F"
                        fontSize="18px"
                        fontWeight={"500"}
                      >
                        Verification Pending
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Box>
          </Form>
        )}
      </Formik>
      <Box className="profile-banner">
        <Flex align={"center"} justify="center"></Flex>
      </Box>
    </Box>
  );
}

export default MyAccount;
