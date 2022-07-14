import React, { useEffect, useRef, useState } from "react";
import {
  Avatar,
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
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { MdVerifiedUser } from "react-icons/md";
import { BsCameraFill, BsShieldFillExclamation } from "react-icons/bs";
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

interface NicValues {
  frontNic: File | any;
  backNic: File | any;
  selfieNic: File | any;
}

function MyAccount() {
  const [preview, setPreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const [previewNic, setPreviewNic] = useState<string>();
  const [selectedFileNic, setSelectedFileNic] = useState<any>();
  const [previewNicBack, setPreviewNicBack] = useState<string>();
  const [selectedFileNicBack, setSelectedFileNicBack] = useState<any>();
  const [previewNicSelfie, setPreviewNicSelfie] = useState<string>();
  const [selectedFileNicSelfie, setSelectedFileNicSelfie] = useState<any>();
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRefNic = useRef<HTMLInputElement>(null);
  const hiddenInputRefNicBack = useRef<HTMLInputElement>(null);
  const hiddenInputRefNicSelfie = useRef<HTMLInputElement>(null);

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
  const initialValues2: NicValues = {
    frontNic: "",
    backNic: "",
    selfieNic: "",
  };
  const onSubmit = (values: FormValues, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
    setSelectedFile(undefined);
    setPreview(undefined);
  };
  const onSubmit2 = (values: NicValues, actions: any) => {
    console.log(values);
    actions.setSubmitting(false);
    setSelectedFileNic(undefined);
    setSelectedFileNicBack(undefined);
    setSelectedFileNicSelfie(undefined);
    setPreviewNic(undefined);
    setPreviewNicBack(undefined);
    setPreviewNicSelfie(undefined);
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

  const validationSchema2 = yup.object({
    frontNic: yup.mixed().required("Front NIC is required"),
    backNic: yup.mixed().required("Back NIC is required"),
    selfieNic: yup.mixed().required("Selfie NIC is required"),
  });

  const onClick = () => {
    if (hiddenInputRef && hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };
  const onClickNic = () => {
    if (hiddenInputRefNic && hiddenInputRefNic.current) {
      hiddenInputRefNic.current.click();
    }
  };
  const onClickNicBack = () => {
    if (hiddenInputRefNicBack && hiddenInputRefNicBack.current) {
      hiddenInputRefNicBack.current.click();
    }
  };
  const onClickNicSelfie = () => {
    if (hiddenInputRefNicSelfie && hiddenInputRefNicSelfie.current) {
      hiddenInputRefNicSelfie.current.click();
    }
  };
  // for profile image
  const profilehandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<FormValues>
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    const fileUploaded = event.target.files[0];
    formik.setFieldValue("profileImage", fileUploaded);
    setSelectedFile(fileUploaded);
  };
  // for nic cards back
  const profilehandleChangeNicBack = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<NicValues>,
    fieldName: string
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFileNicBack(undefined);
      return;
    }
    const fileUploaded = event.target.files[0];
    formik.setFieldValue(fieldName, fileUploaded);
    setSelectedFileNicBack(fileUploaded);
  };
  // for nic cards selfie
  const profilehandleChangeNicSelfie = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<NicValues>,
    fieldName: string
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFileNicSelfie(undefined);
      return;
    }
    const fileUploaded = event.target.files[0];
    formik.setFieldValue(fieldName, fileUploaded);
    setSelectedFileNicSelfie(fileUploaded);
  };
  // for nic cards
  const profilehandleChangeNic = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<NicValues>,
    fieldName: string
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      setSelectedFileNic(undefined);
      return;
    }
    const fileUploaded = event.target.files[0];
    formik.setFieldValue(fieldName, fileUploaded);
    setSelectedFileNic(fileUploaded);
  };

  // for profile image
  useEffect(() => {
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
  // for Nic image
  useEffect(() => {
    if (!selectedFileNic) {
      setPreviewNic(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedFileNic);
    setPreviewNic(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFileNic]);
  // for nic back
  useEffect(() => {
    if (!selectedFileNicBack) {
      setPreviewNicBack(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedFileNicBack);
    setPreviewNicBack(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFileNicBack]);
  // for nic selfie
  useEffect(() => {
    if (!selectedFileNicSelfie) {
      setPreviewNicSelfie(undefined);
      return;
    }
    // create the preview
    const objectUrl = URL.createObjectURL(selectedFileNicSelfie);
    setPreviewNicSelfie(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFileNicSelfie]);

  return (
    <Box mx={10}>
      <Heading as={"h2"} fontSize="36px">
        MY ACCOUNT
      </Heading>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(formik) => (
          <Form autoComplete="off">
            <Flex
              className="profileBanner"
              p={"24px"}
              rounded={"12px"}
              bg={"gray.50"}
              my={5}
              maxW={"550px"}
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
                      onBlur={formik.handleBlur}
                      hidden
                    />
                    <Avatar
                      boxSize={"20"}
                      _hover={{ cursor: "pointer" }}
                      src={selectedFile ? preview : undefined}
                      objectFit={"cover"}
                      icon={
                        <TbCameraPlus
                          size={"28"}
                          style={{ color: "#ffffffff" }}
                        />
                      }
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
              <FormErrorMessage>
                <ErrorMessage name="profileImage" />
              </FormErrorMessage>
            </Flex>
            <Box className="details-of-form">
              <Heading as={"h5"} fontSize="25px">
                PROFILE
              </Heading>
              <Flex align={"center"} justify="center" gap={5}>
                <Flex align={"center"} justify="center" gap={5}>
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
                <Center height="350px">
                  <Divider
                    orientation="vertical"
                    border={"2px"}
                    color="#B6D7FF"
                    mx={5}
                  />
                </Center>
                <Flex flexDirection={"column"} gap={5} ml={5}>
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
                  <Box>
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
            </Box>
            <Divider border={"2px"} color="#B6D7FF" my={5} />
          </Form>
        )}
      </Formik>
      <Formik
        initialValues={initialValues2}
        onSubmit={onSubmit2}
        validationSchema={validationSchema2}
      >
        {(formik2) => (
          <Form>
            <Flex align={"center"} justify={"center"} gap={5}>
              <FormControl>
                <FormLabel htmlFor="frontNic">
                  <Text
                    color={"#636363"}
                    fontSize="12px"
                    fontWeight={"600"}
                    fontFamily="body"
                  >
                    Front of the NIC
                  </Text>
                </FormLabel>
                <Input
                  id="frontNic"
                  ref={hiddenInputRefNic}
                  type={"file"}
                  onChange={(event: any) => {
                    profilehandleChangeNic(event, formik2, "frontNic");
                  }}
                  hidden
                />
                <Flex
                  align={"center"}
                  cursor={"pointer"}
                  bgImage={previewNic ? previewNic : undefined}
                  objectFit={"cover"}
                  justify="center"
                  position="relative"
                  bg={previewNic ? undefined : "#E6F1FF"}
                  w="250px"
                  h={"200px"}
                  my={5}
                  onClick={onClickNic}
                >
                  <Center zIndex="2">
                    <BsCameraFill
                      size={"48"}
                      style={{
                        color: "#205EAA",
                      }}
                    />
                  </Center>
                </Flex>
                <FormErrorMessage>
                  {formik2.values.frontNic === "" && <Text>no nic image</Text>}
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="backNic">
                  <Text
                    color={"#636363"}
                    fontSize="12px"
                    fontWeight={"600"}
                    fontFamily="body"
                  >
                    Backof the NIC
                  </Text>
                </FormLabel>
                <Input
                  id="frontNic"
                  ref={hiddenInputRefNicBack}
                  type={"file"}
                  onChange={(event: any) => {
                    profilehandleChangeNicBack(event, formik2, "backNic");
                  }}
                  hidden
                />
                <Flex
                  align={"center"}
                  cursor={"pointer"}
                  bgImage={previewNicBack ? previewNicBack : undefined}
                  objectFit={"cover"}
                  justify="center"
                  position="relative"
                  bg={previewNicBack ? undefined : "#E6F1FF"}
                  w="250px"
                  h={"200px"}
                  my={5}
                  onClick={onClickNicBack}
                >
                  <Center zIndex="2">
                    <BsCameraFill
                      size={"48"}
                      style={{
                        color: "#205EAA",
                      }}
                    />
                  </Center>
                </Flex>
                <FormErrorMessage>
                  <ErrorMessage name="backNic" />
                </FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="selfieNic">
                  <Text
                    color={"#636363"}
                    fontSize="12px"
                    fontWeight={"600"}
                    fontFamily="body"
                  >
                    Selfie with the NIC
                  </Text>
                </FormLabel>
                <Input
                  id="frontNic"
                  ref={hiddenInputRefNicSelfie}
                  type={"file"}
                  onChange={(event: any) => {
                    profilehandleChangeNicSelfie(event, formik2, "selfieNic");
                  }}
                  hidden
                />
                <Flex
                  align={"center"}
                  cursor={"pointer"}
                  bgImage={previewNicSelfie ? previewNicSelfie : undefined}
                  objectFit={"cover"}
                  justify="center"
                  position="relative"
                  bg={previewNicSelfie ? undefined : "#E6F1FF"}
                  w="250px"
                  h={"200px"}
                  my={5}
                  onClick={onClickNicSelfie}
                >
                  <Center zIndex="2">
                    <BsCameraFill
                      size={"48"}
                      style={{
                        color: "#205EAA",
                      }}
                    />
                  </Center>
                </Flex>
                <FormErrorMessage>
                  <ErrorMessage name="selfieNic" />
                </FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                width={"full"}
                isDisabled={
                  formik2.isSubmitting ||
                  (formik2.values.frontNic === "" ||
                    formik2.values.backNic === "" ||
                    formik2.values.selfieNic === "")
                }
                border={"10px"}
                colorScheme="blue"
                bgGradient={
                  "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                }
                boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
                isLoading={formik2.isSubmitting}
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
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default MyAccount;
