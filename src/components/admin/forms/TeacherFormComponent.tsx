import FileUploadInput from "@/components/formcontrol/customInput/FileUploadInput";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";

function TeacherFormComponent() {
  const initialValues = {
    fullName: "",
    description: "",
    profileImg: null,
    introImage1: null,
    introImage2: null,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full name Required"),
    description: Yup.string().required("decrition is required"),
    profileImg: Yup.mixed()
      .required("A file is required") // Ensure a file is selected
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return (value as File).size <= 5 * 1024 * 1024; // 5MB limit
      })
      .test("fileType", "Unsupported file type", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "image/webp",
        ].includes((value as File).type); // Allowed file types
      }),
    introImage1: Yup.mixed()
      .required("A file is required") // Ensure a file is selected
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return (value as File).size <= 5 * 1024 * 1024; // 5MB limit
      })
      .test("fileType", "Unsupported file type", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "image/webp",
        ].includes((value as File).type); // Allowed file types
      }),
    introImage2: Yup.mixed()
      .required("A file is required") // Ensure a file is selected
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return (value as File).size <= 5 * 1024 * 1024; // 5MB limit
      })
      .test("fileType", "Unsupported file type", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "image/webp",
        ].includes((value as File).type); // Allowed file types
      }),
  });

  const onSubmit = async (values: any, action: any) => {
    try {
      console.log(values);
      action.setSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <>
          <Form autoComplete="off">
            <VStack gap={4} width={"full"}>
              <InputComponent
                htmlFor={"fullname"}
                labelText={"Full Name"}
                InputType={"text"}
                InputValue={formik.values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Name"}
                isTouched={formik.touched.fullName}
                isError={formik.errors.fullName}
              />
              <InputComponent
                htmlFor={"description"}
                labelText={"Description"}
                InputType={"text"}
                InputValue={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Description"}
                isTouched={formik.touched.description}
                isError={formik.errors.description}
              />
              <FileUploadInput
                htmlFor={"profileImg"}
                labelText={"Profile Image"}
                isInvalid={
                  !!(formik.touched.profileImg && formik.errors.profileImg)
                }
                isTouched={formik.touched.profileImg}
                errorText={formik.errors.profileImg}
                handleChange={(event) =>
                  formik.setFieldValue("profileImg", event)
                }
                handleBlur={formik.handleBlur}
              />
              <FileUploadInput
                htmlFor={"introImage1"}
                labelText={"Intro image1"}
                isInvalid={
                  !!(formik.touched.introImage1 && formik.errors.introImage1)
                }
                isTouched={formik.touched.introImage1}
                errorText={formik.errors.introImage1}
                handleChange={(event) =>
                  formik.setFieldValue("introImage1", event)
                }
                handleBlur={formik.handleBlur}
              />
              <FileUploadInput
                htmlFor={"introImage2"}
                labelText={"Intro image2"}
                isInvalid={
                  !!(formik.touched.introImage2 && formik.errors.introImage2)
                }
                isTouched={formik.touched.introImage2}
                errorText={formik.errors.introImage2}
                handleChange={(event) =>
                  formik.setFieldValue("introImage2", event)
                }
                handleBlur={formik.handleBlur}
              />

              <Button
                type="submit"
                colorPalette={"blue"}
                loading={formik.isSubmitting}
              >
                Submit
              </Button>
            </VStack>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default TeacherFormComponent;
