import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import * as yup from "yup";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";

import { MdVerifiedUser } from "react-icons/md";
import { BsShieldFillExclamation } from "react-icons/bs";


import NicVerification from "../components/myAccount/NicVerification";
import ProfileBanner from "../components/myAccount/ProfileBanner";

export interface FormValues {
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
  const [preview, setPreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<any>();
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
    setSelectedFile(undefined);
    setPreview(undefined);
  };

  const validationSchema = yup.object({
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

  // for profile image clic to change trigger
  const profilehandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<FormValues>
  ) => {
    // image path set to undefined
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const fileUploaded = event.target.files[0];
    formik.setFieldValue("profileImage", fileUploaded);
    setSelectedFile(fileUploaded);
  };

  // for profile image
  useEffect(() => {
    // if no image attached, set profile image to undefined
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return (
    <Box mx={[5, 5, 10]} w="full">
      <Heading as={"h2"} fontSize={["26px", "26px", "36px"]}>
        MY ACCOUNT
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form autoComplete="off">
            <ProfileBanner
              formik={formik}
              hiddenInputRef={hiddenInputRef}
              onClick={onClick}
              preview={preview}
              profilehandleChange={profilehandleChange}
              selectedFile={selectedFile}
            />
            <Flex flexDirection={"column"} gap={4} className="details-of-form">
              <Heading as={"h5"} fontSize="25px">
                PROFILE
              </Heading>
              <Flex
                flexDirection={["column", "column", "row"]}
                align={"center"}
                justify="center"
                gap={5}
              >
                <Flex
                  flexDirection={["column", "column", "row"]}
                  align={"center"}
                  justify="center"
                  gap={5}
                >
                  <Flex
                    flexDirection={"column"}
                    align={"center"}
                    justify="center"
                    gap={1}
                    mr={5}
                  >
                    <FormControl isInvalid={formik.touched.fullName}>
                      <FormLabel htmlFor="fullName">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          Full name
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
                        placeholder="Enter Full name"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="fullName" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.examAttempt}>
                      <FormLabel htmlFor="examAttempt">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          Exam Attempt
                        </Text>
                      </FormLabel>
                      <Input
                        id="examAttempt"
                        type={"text"}
                        value={formik.values.examAttempt}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter Exam Attempt"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="examAttempt" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.district}>
                      <FormLabel htmlFor="district">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          District
                        </Text>
                      </FormLabel>
                      <Input
                        id="district"
                        type={"text"}
                        value={formik.values.district}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter District"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="district" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.nic}>
                      <FormLabel htmlFor="nic">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          Nic
                        </Text>
                      </FormLabel>
                      <Input
                        id="nic"
                        type={"text"}
                        value={formik.values.nic}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter NIC number"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="nic" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.mobileNumber}>
                      <FormLabel htmlFor="mobileNumber">
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
                        id="mobileNumber"
                        type={"text"}
                        value={formik.values.mobileNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter Mobile Number"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="mobileNumber" />
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    align={"center"}
                    justify="center"
                    gap={1}
                    mr={5}
                  >
                    <FormControl isInvalid={formik.touched.school}>
                      <FormLabel htmlFor="school">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          School
                        </Text>
                      </FormLabel>
                      <Input
                        id="school"
                        type={"text"}
                        value={formik.values.school}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter School"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="school" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.examYear}>
                      <FormLabel htmlFor="examYear">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          Exam Year
                        </Text>
                      </FormLabel>
                      <Input
                        id="examYear"
                        type={"text"}
                        value={formik.values.examYear}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter Exam Year"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="examYear" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.city}>
                      <FormLabel htmlFor="city">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          City
                        </Text>
                      </FormLabel>
                      <Input
                        id="city"
                        type={"text"}
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter City"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="city" />
                      </FormErrorMessage>
                    </FormControl>
                    <FormControl isInvalid={formik.touched.address}>
                      <FormLabel htmlFor="address">
                        <Text
                          color={"#636363"}
                          fontSize="12px"
                          fontWeight={"600"}
                          fontFamily="body"
                        >
                          Address
                        </Text>
                      </FormLabel>
                      <Input
                        id="address"
                        type={"text"}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        borderColor="#636363"
                        border={"1px"}
                        placeholder="Enter Address"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="address" />
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
                          Email Address
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
                        placeholder="Enter Email"
                        rounded={"10px"}
                      />
                      <FormErrorMessage>
                        <ErrorMessage name="email" />
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                </Flex>
                <Center display={["none", "none", "block"]} height="350px">
                  <Divider
                    orientation="vertical"
                    border={"2px"}
                    bg="#B6D7FF"
                    mx={5}
                  />
                </Center>
                <Flex flexDirection={"column"} gap={5} ml={[0, 0, 5]}>
                  <FormControl isInvalid={formik.touched.barcode}>
                    <FormLabel htmlFor="barcode">
                      <Text
                        color={"#636363"}
                        fontSize="12px"
                        fontWeight={"600"}
                        fontFamily="body"
                      >
                        Barcode
                      </Text>
                    </FormLabel>
                    <Input
                      id="barcode"
                      type={"text"}
                      value={formik.values.barcode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      borderColor="#636363"
                      border={"1px"}
                      placeholder="Enter Barcode number"
                      rounded={"10px"}
                    />
                    <FormErrorMessage>
                      <ErrorMessage name="barcode" />
                    </FormErrorMessage>
                  </FormControl>
                  <Box w={["50vw", "50vw", "50vw", "full"]}>
                    <Text
                      fontFamily={"body"}
                      color="#636363"
                      fontSize={"12px"}
                      fontWeight="600"
                    >
                      Add two phone numbers{" "}
                      <Text
                        as={"span"}
                        fontFamily="body"
                        color={"#636363"}
                        fontSize="10px"
                        fontWeight={"300"}
                      >
                        (state two mobile numbers which can be used to contact
                        when delivering printed tutes)
                      </Text>
                    </Text>
                  </Box>
                  <FormControl isInvalid={formik.touched.mobileNumber1}>
                    <FormLabel htmlFor="mobileNumber1">
                      <Text
                        color={"#636363"}
                        fontSize="12px"
                        fontWeight={"600"}
                        fontFamily="body"
                      >
                        Mobile Number1
                      </Text>
                    </FormLabel>
                    <Input
                      id="mobileNumber1"
                      type={"text"}
                      value={formik.values.mobileNumber1}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      borderColor="#636363"
                      border={"1px"}
                      placeholder="Enter Mobile Number1"
                      rounded={"10px"}
                    />
                    <FormErrorMessage>
                      <ErrorMessage name="mobileNumber1" />
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl isInvalid={formik.touched.mobileNumber2}>
                    <FormLabel htmlFor="mobileNumber2">
                      <Text
                        color={"#636363"}
                        fontSize="12px"
                        fontWeight={"600"}
                        fontFamily="body"
                      >
                        Mobile Number2
                      </Text>
                    </FormLabel>
                    <Input
                      id="mobileNumber2"
                      type={"text"}
                      value={formik.values.barcode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      borderColor="#636363"
                      border={"1px"}
                      placeholder="Enter Mobile Number2"
                      rounded={"10px"}
                    />
                    <FormErrorMessage>
                      <ErrorMessage name="mobileNumber2" />
                    </FormErrorMessage>
                  </FormControl>
                  <Button
                    type="submit"
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
                      Update Profile
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            </Flex>
            <Divider border={"2px"} bg="#B6D7FF" my={5} />
          </Form>
        )}
      </Formik>
      <Flex my={2} flexDirection={["column", "column", "row"]}>
        <Heading as={"h5"} fontSize="24px" mr={5}>
          NIC VERIFICATION
        </Heading>
        <Flex gap={5}>
          <Flex align={"center"} gap={1}>
            {" "}
            <MdVerifiedUser style={{ color: "#2ECC71" }} />
            <Text
              fontFamily={"body"}
              color="#2ECC71"
              fontSize={["16px", "18px"]}
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
              fontSize={["16px", "18px"]}
              fontWeight={"500"}
            >
              Verification Pending
            </Text>
          </Flex>
        </Flex>
      </Flex>
      {/* nic verification */}
      <NicVerification />
      <Divider border={"2px"} bg="#B6D7FF" my={5} />
      <Heading as={"h5"} fontSize="24px" mr={5} my={3}>
        PAYMENT HISTORY
      </Heading>
      {/* table displaying payment info based on users courses */}
      <TableContainer roundedTopLeft="10px" roundedTopRight="10px">
        <Table variant={"simple"}>
          <TableCaption>Payment History</TableCaption>
          <Thead bg={"#E6F1FF"}>
            <Tr>
              <Th>
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="#636363"
                >
                  #
                </Text>
              </Th>
              <Th>
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="#636363"
                >
                  Billed To
                </Text>
              </Th>
              <Th>
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="#636363"
                >
                  Date
                </Text>
              </Th>
              <Th>
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="#636363"
                >
                  Amount
                </Text>
              </Th>
              <Th>
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="#636363"
                >
                  Action
                </Text>
              </Th>
            </Tr>
          </Thead>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default MyAccount;
