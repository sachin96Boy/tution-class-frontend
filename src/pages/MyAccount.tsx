import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Separator,
  Switch,
  Table,
  TableCaption,
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { Form, Formik, FormikHelpers } from "formik";

import NicVerification from "../components/myAccount/NicVerification";
import ProfileBanner from "../components/myAccount/ProfileBanner";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import { QrCode } from "@/components/ui/qr-code";
import Logo from "@/components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getAdditionalStudentData,
  getNicData,
  IUpdateStudentAdditionalDataProps,
  updateAdditionalStudentData,
} from "@/features/student/studentAction";
import {
  Settings,
  ShieldCheck,
  ShieldEllipsis,
  ShieldQuestion,
  User,
} from "lucide-react";
import ProfileView from "./ProfileView";
import NicDocumentsView from "./Nicview";

function MyAccount() {
  const [preview, setPreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<any>();
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const [isSetting, setIsSetting] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { loading: loadf1, userInfo } = useSelector(
    (state: RootState) => state.auth
  );
  const {
    loading: loadf2,
    additionalStudentData,
    studentNicData,
  } = useSelector((state: RootState) => state.student);

  const initialValues: IUpdateStudentAdditionalDataProps = {
    enc_student_id: userInfo ? userInfo.student_id : "",
    school: "",
    examAttempt: "",
    examYear: "",
    district: "",
    city: "",
    nic: "",
    address: "",
    mobileNumber1: "",
    mobileNumber2: "",
    profileImage: null,
  };

  const onSubmit = async (
    values: IUpdateStudentAdditionalDataProps,
    actions: any
  ) => {
    console.log(values);

    const res = await dispatch(updateAdditionalStudentData(values));

    actions.setSubmitting(false);
    actions.resetForm();

    setSelectedFile(undefined);
    setPreview(undefined);
  };

  const validationSchema = yup.object({
    school: yup.string().required("School is required"),
    examAttempt: yup.string().required("Exam Attempt is required"),
    examYear: yup.string().required("Exam Year is required"),
    district: yup.string().required("District is required"),
    city: yup.string().required("City is required"),
    nic: yup.string().required("NIC is required"),
    address: yup.string().required("Address is required"),
    mobileNumber1: yup.string().required("Mobile Number 1 is required"),
    mobileNumber2: yup.string().required("Mobile Number 2 is required"),
    profileImage: yup.mixed().nullable(),
  });

  const onClick = () => {
    if (hiddenInputRef && hiddenInputRef.current) {
      hiddenInputRef.current.click();
    }
  };

  // for profile image clic to change trigger
  const profilehandleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    formik: FormikHelpers<IUpdateStudentAdditionalDataProps>
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

  useEffect(() => {
    if (userInfo != null) {
      dispatch(
        getAdditionalStudentData({
          enc_student_id: userInfo?.student_id,
        })
      );
    }
  }, [dispatch]);
  useEffect(() => {
    if (userInfo != null) {
      dispatch(
        getNicData({
          enc_student_id: userInfo?.student_id,
        })
      );
    }
  }, [dispatch]);

  return (
    <Box mx={[5, 5, 10]} w="full">
      <Heading as={"h2"} fontSize={["26px", "26px", "36px"]}>
        MY ACCOUNT
      </Heading>
      <Flex align={"end"} justify={"end"}>
        <Switch.Root
          checked={isSetting}
          onCheckedChange={(e) => setIsSetting(e.checked)}
          size="lg"
          p={5}
        >
          <Switch.HiddenInput />
          <Switch.Control>
            <Switch.Thumb />
            <Switch.Indicator
              fallback={<Icon as={Settings} color="gray.400" />}
            >
              <Icon as={User} color="gray.200" />
            </Switch.Indicator>
          </Switch.Control>
          <Switch.Label>Switch State</Switch.Label>
        </Switch.Root>
      </Flex>
      {!isSetting ? (
        additionalStudentData && (
          <ProfileView userInfo={additionalStudentData} />
        )
      ) : (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {(formik) => (
            <Form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <ProfileBanner
                formik={formik}
                hiddenInputRef={hiddenInputRef}
                onClick={onClick}
                preview={preview}
                profilehandleChange={profilehandleChange}
                selectedFile={selectedFile}
                isTouched={!!formik.touched.profileImage}
                isError={formik.errors.profileImage as string}
              />
              <Flex
                flexDirection={"column"}
                gap={5}
                className="details-of-form"
              >
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
                    <Box>
                      <Text>QR Code</Text>
                      {userInfo != null ? (
                        <QrCode
                          colorPalette={"blue"}
                          value={userInfo.student_id}
                          size={"lg"}
                          name={"QR.png"}
                        >
                          <Logo linkPath="/" boxSize="24" fitType="cover" />
                        </QrCode>
                      ) : (
                        <Box />
                      )}
                    </Box>
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
                      type="button"
                      border={"10px"}
                      colorScheme="blue"
                      bgGradient={
                        "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
                      }
                      boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
                      loading={formik.isSubmitting}
                      onClick={() => formik.submitForm()}
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
      )}
      <Flex my={2} flexDirection={["column", "column", "row"]}>
        <Heading as={"h5"} fontSize="24px" mr={5}>
          NIC VERIFICATION
        </Heading>
        <Flex gap={5}>
          {!studentNicData?.is_verified ? (
            <Flex align={"center"} gap={1}>
              {" "}
              <ShieldQuestion style={{ color: "#F1C40F" }} />
              <Text
                fontFamily={"body"}
                color="#F1C40F"
                fontSize={["16px", "18px"]}
                fontWeight={"500"}
              >
                Verification Pending
              </Text>
            </Flex>
          ) : (
            <Flex align={"center"} gap={1}>
              {" "}
              <ShieldCheck style={{ color: "#2ECC71" }} />
              <Text
                fontFamily={"body"}
                color="verified_green_text"
                fontSize={["16px", "18px"]}
                fontWeight={"500"}
              >
                Verified
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
      {!isSetting ? (
        studentNicData ? (
          <NicDocumentsView userInfo={studentNicData} />
        ) : null
      ) : (
        <NicVerification />
      )}
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
