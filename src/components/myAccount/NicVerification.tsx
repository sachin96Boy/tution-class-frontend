import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import * as yup from "yup";
import { ErrorMessage, Form, Formik, FormikHelpers } from "formik";
import { BsCameraFill } from "react-icons/bs";

interface NicValues {
  frontNic: File | any;
  backNic: File | any;
  selfieNic: File | any;
}

function NicVerification() {
  const [previewNic, setPreviewNic] = useState<string>();
  const [selectedFileNic, setSelectedFileNic] = useState<any>();
  const [previewNicBack, setPreviewNicBack] = useState<string>();
  const [selectedFileNicBack, setSelectedFileNicBack] = useState<any>();
  const [previewNicSelfie, setPreviewNicSelfie] = useState<string>();
  const [selectedFileNicSelfie, setSelectedFileNicSelfie] = useState<any>();
  const hiddenInputRefNic = useRef<HTMLInputElement>(null);
  const hiddenInputRefNicBack = useRef<HTMLInputElement>(null);
  const hiddenInputRefNicSelfie = useRef<HTMLInputElement>(null);

  const initialValues2: NicValues = {
    frontNic: "",
    backNic: "",
    selfieNic: "",
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
  const validationSchema2 = yup.object({
    frontNic: yup.mixed().required("Front NIC is required"),
    backNic: yup.mixed().required("Back NIC is required"),
    selfieNic: yup.mixed().required("Selfie NIC is required"),
  });

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
                formik2.values.frontNic === "" ||
                formik2.values.backNic === "" ||
                formik2.values.selfieNic === ""
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
  );
}

export default NicVerification;
