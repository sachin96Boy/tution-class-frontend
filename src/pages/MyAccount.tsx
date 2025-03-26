import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Separator,
  Table,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";

import { MdVerifiedUser } from "react-icons/md";
import { BsShieldFillExclamation } from "react-icons/bs";

import NicVerification from "../components/myAccount/NicVerification";
import ProfileBanner from "../components/myAccount/ProfileBanner";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";

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
            <Flex flexDirection={"column"} gap={5} className="details-of-form">
              <Heading as={"h5"} fontSize="25px">
                PROFILE
              </Heading>
              <Flex
                flexDirection={["column", "column", "column", "row"]}
                align={"center"}
                justify="space-around"
                gap={5}
              >
                <Flex
                  flexDirection={["column", "column", "row"]}
                  align={"center"}
                  justify="space-around"
                  gap={5}
                >
                  <Flex
                    flexDirection={"column"}
                    align={"center"}
                    justify="center"
                    gap={1}
                    mr={5}
                  >
                    <InputComponent
                      htmlFor={"fullName"}
                      labelText={"Full Name"}
                      InputType={"text"}
                      InputValue={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter Full Name"}
                      isTouched={formik.touched.fullName}
                      isError={formik.errors.fullName}
                    />
                    <InputComponent
                      htmlFor={"examAttempt"}
                      labelText={"Exam Attempt"}
                      InputType={"text"}
                      InputValue={formik.values.examAttempt}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter Exam Attempt"}
                      isTouched={formik.touched.examAttempt}
                      isError={formik.errors.examAttempt}
                    />
                    <InputComponent
                      htmlFor={"district"}
                      labelText={"District"}
                      InputType={"text"}
                      InputValue={formik.values.district}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter District"}
                      isTouched={formik.touched.district}
                      isError={formik.errors.district}
                    />
                    <InputComponent
                      htmlFor={"nic"}
                      labelText={"NIC Number"}
                      InputType={"text"}
                      InputValue={formik.values.nic}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter NIC Number"}
                      isTouched={formik.touched.nic}
                      isError={formik.errors.nic}
                    />
                    <InputComponent
                      htmlFor={"mobileNumber"}
                      labelText={"Mobile Number"}
                      InputType={"text"}
                      InputValue={formik.values.mobileNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter Mobbile Nmuber"}
                      isTouched={formik.touched.mobileNumber}
                      isError={formik.errors.mobileNumber}
                    />
                  </Flex>
                  <Flex
                    flexDirection={"column"}
                    align={"center"}
                    justify="center"
                    gap={1}
                    mr={5}
                  >
                    <InputComponent
                      htmlFor={"school"}
                      labelText={"School Attended"}
                      InputType={"text"}
                      InputValue={formik.values.school}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter School"}
                      isTouched={formik.touched.school}
                      isError={formik.errors.school}
                    />
                    <InputComponent
                      htmlFor={"examYear"}
                      labelText={"Exam Year"}
                      InputType={"text"}
                      InputValue={formik.values.examYear}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter Exam Year"}
                      isTouched={formik.touched.examYear}
                      isError={formik.errors.examYear}
                    />
                    <InputComponent
                      htmlFor={"city"}
                      labelText={"City"}
                      InputType={"text"}
                      InputValue={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter City"}
                      isTouched={formik.touched.city}
                      isError={formik.errors.city}
                    />
                    <InputComponent
                      htmlFor={"address"}
                      labelText={"Address"}
                      InputType={"text"}
                      InputValue={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter Address"}
                      isTouched={formik.touched.address}
                      isError={formik.errors.address}
                    />
                    <InputComponent
                      htmlFor={"email"}
                      labelText={"Email Address"}
                      InputType={"email"}
                      InputValue={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeHolder={"Enter Email"}
                      isTouched={formik.touched.email}
                      isError={formik.errors.email}
                    />
                  </Flex>
                </Flex>
                <Separator
                  minHeight={"350px"}
                  size={"lg"}
                  display={["none", "none", "none", "block"]}
                  orientation={"vertical"}
                  colorPalette={"blue"}
                />
                <Flex flexDirection={"column"} gap={5} ml={[-5, -5, 5]}>
                  <InputComponent
                    htmlFor={"barcode"}
                    labelText={"Barcode Number"}
                    InputType={"text"}
                    InputValue={formik.values.barcode}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder={"Enter Barcode"}
                    isTouched={formik.touched.barcode}
                    isError={formik.errors.barcode}
                  />
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
                  <InputComponent
                    htmlFor={"mobileNumber1"}
                    labelText={"Mobile number1"}
                    InputType={"text"}
                    InputValue={formik.values.mobileNumber1}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder={"Enter First Number"}
                    isTouched={formik.touched.mobileNumber1}
                    isError={formik.errors.mobileNumber1}
                  />
                  <InputComponent
                    htmlFor={"mobileNumber2"}
                    labelText={"Mobile number2"}
                    InputType={"text"}
                    InputValue={formik.values.mobileNumber2}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeHolder={"Enter Second Number"}
                    isTouched={formik.touched.mobileNumber2}
                    isError={formik.errors.mobileNumber2}
                  />
                  <Button
                    type="submit"
                    border={"10px"}
                    colorScheme="blue"
                    bgGradient={
                      "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                    }
                    boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
                    loading={formik.isSubmitting}
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
            <Separator divideX={"2px"} colorPalette={"blue"} my={5} />
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
              color="verified_green_text"
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
      <Box divideX={"2px"} bg="#B6D7FF" my={5} />
      <Heading as={"h5"} fontSize="24px" mr={5} my={3}>
        PAYMENT HISTORY
      </Heading>
      {/* table displaying payment info based on users courses */}
      <Box roundedTopLeft="10px" roundedTopRight="10px">
        <Table.Root variant={"outline"}>
          <TableCaption>Payment History</TableCaption>

          <Table.Header bgColor={"light_bg_card"}>
            <Table.Row>
              <Table.ColumnHeader>
                {" "}
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="text_secondary_color"
                >
                  #
                </Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {" "}
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="text_secondary_color"
                >
                  Billed To
                </Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {" "}
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="text_secondary_color"
                >
                  Date
                </Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {" "}
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="text_secondary_color"
                >
                  Amount
                </Text>
              </Table.ColumnHeader>
              <Table.ColumnHeader>
                {" "}
                <Text
                  fontFamily={"body"}
                  fontSize="12px"
                  fontWeight={"600"}
                  color="#636363"
                >
                  Action
                </Text>
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
        </Table.Root>
      </Box>
    </Box>
  );
}

export default MyAccount;
