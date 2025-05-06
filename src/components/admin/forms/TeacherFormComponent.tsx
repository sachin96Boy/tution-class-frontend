import FileUploadInput from "@/components/formcontrol/customInput/FileUploadInput";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputTextAreaComponent from "@/components/formcontrol/InputTextAreaComponent";
import {
  createTeacher,
  IteacherRegisterProps,
} from "@/features/teacher/teacherAction";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

function TeacherFormComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: IteacherRegisterProps = {
    full_name: "",
    description: "",
    profileImg: null,
    introImg1: null,
    introImg2: null,
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name Required"),
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
    introImg1: Yup.mixed()
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
    introImg2: Yup.mixed()
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

  const onSubmit = async (values: IteacherRegisterProps, action: any) => {
    try {
      await dispatch(createTeacher(values));

      action.setSubmitting(false);
      action.resetForm();
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
          <Form autoComplete="off" encType="multipart/form-data">
            <VStack gap={4} width={"full"}>
              <InputComponent
                htmlFor={"full_name"}
                labelText={"Full Name"}
                InputType={"text"}
                InputValue={formik.values.full_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Name"}
                isTouched={formik.touched.full_name}
                isError={formik.errors.full_name}
              />
              <InputTextAreaComponent
                htmlFor="description"
                placeHolder="Enter Description"
                labelText="Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputValue={formik.values.description}
                isTouched={formik.touched.description}
                isError={formik.errors.description}
              />
              <FileUploadInput
                htmlFor={"profileImg"}
                labelText={"Profile Image"}
                isInvalid={
                  formik.touched.profileImg && !!formik.errors.profileImg
                }
                isTouched={formik.touched.profileImg}
                errorText={formik.errors.profileImg}
                handleChange={(details) =>
                  formik.setFieldValue("profileImg", details.acceptedFiles[0])
                }
                handleBlur={formik.handleBlur}
              />
              <FileUploadInput
                htmlFor={"introImg1"}
                labelText={"Intro image1"}
                isInvalid={
                  formik.touched.introImg1 && !!formik.errors.introImg1
                }
                isTouched={formik.touched.introImg1}
                errorText={formik.errors.introImg1}
                handleChange={(details) =>
                  formik.setFieldValue("introImg1", details.acceptedFiles[0])
                }
                handleBlur={formik.handleBlur}
              />
              <FileUploadInput
                htmlFor={"introImg2"}
                labelText={"Intro image2"}
                isInvalid={
                  formik.touched.introImg2 && !!formik.errors.introImg2
                }
                isTouched={formik.touched.introImg2}
                errorText={formik.errors.introImg2}
                handleChange={(details) =>
                  formik.setFieldValue("introImg2", details.acceptedFiles[0])
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
