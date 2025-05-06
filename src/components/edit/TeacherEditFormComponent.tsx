import {
  IteacherEditFormProps,
  IteacherGetProps,
  updateTeacher,
} from "@/features/teacher/teacherAction";
import { AppDispatch } from "@/store";
import { Avatar, Box, Button, IconButton, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

type IteacherEditProps = {
  data: IteacherGetProps;
};

import * as Yup from "yup";
import InputComponent from "../formcontrol/customInput/InputComponent";
import FileUploadInput from "../formcontrol/customInput/FileUploadInput";
import { X } from "lucide-react";
import InputTextAreaComponent from "../formcontrol/InputTextAreaComponent";

function TeacherEditFormComponent(props: IteacherEditProps) {
  const { data } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [teacher, setTeacher] = useState<IteacherGetProps>(data);

  const initialValues: IteacherEditFormProps = {
    teacher_id: data.teacher_id,
    full_name: data.full_name,
    description: data.description,
    profileImg: null,
    introImg1: null,
    introImg2: null,
  };

  const validationSchema = Yup.object({
    full_name: Yup.string().required("Full name Required"),
    description: Yup.string().required("decrition is required"),
    profileImg: Yup.mixed()
      .nullable() // Ensure a file is selected
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
      .nullable() // Ensure a file is selected
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
      .nullable() // Ensure a file is selected
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

  const onSubmit = async (values: IteacherEditFormProps, action: any) => {
    try {
      await dispatch(updateTeacher(values));

      action.setSubmitting(false);
      action.resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const removeProfImage = () => {
    setTeacher((prv) => ({
      ...prv,
      profile_img: "",
    }));
  };
  const removeIntroImg1 = () => {
    setTeacher((prv) => ({
      ...prv,
      intro_image1: "",
    }));
  };
  const removeIntroImg2 = () => {
    setTeacher((prv) => ({
      ...prv,
      intro_image2: "",
    }));
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
              {teacher.profile_img != "" ? (
                <Box position="relative">
                  <Avatar.Root size={"2xl"} variant={"subtle"}>
                    <Avatar.Fallback name={data.full_name} />
                    <Avatar.Image src={data.profile_img} />
                  </Avatar.Root>
                  <IconButton
                    aria-label="Remove logo"
                    position="absolute"
                    top={-2}
                    right={-2}
                    size="sm"
                    colorPalette="red"
                    borderRadius="full"
                    onClick={removeProfImage}
                  >
                    <X />
                  </IconButton>
                </Box>
              ) : (
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
              )}
              {teacher.intro_image1 != "" ? (
                <Box position="relative">
                  <Avatar.Root size={"2xl"} variant={"subtle"}>
                    <Avatar.Fallback name={data.full_name} />
                    <Avatar.Image src={data.intro_image1} />
                  </Avatar.Root>
                  <IconButton
                    aria-label="Remove logo"
                    position="absolute"
                    top={-2}
                    right={-2}
                    size="sm"
                    colorPalette="red"
                    borderRadius="full"
                    onClick={removeIntroImg1}
                  >
                    <X />
                  </IconButton>
                </Box>
              ) : (
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
              )}
              {teacher.intro_image2 != "" ? (
                <Box position="relative">
                  <Avatar.Root size={"2xl"} variant={"subtle"}>
                    <Avatar.Fallback name={data.full_name} />
                    <Avatar.Image src={data.intro_image2} />
                  </Avatar.Root>
                  <IconButton
                    aria-label="Remove logo"
                    position="absolute"
                    top={-2}
                    right={-2}
                    size="sm"
                    colorPalette="red"
                    borderRadius="full"
                    onClick={removeIntroImg2}
                  >
                    <X />
                  </IconButton>
                </Box>
              ) : (
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
              )}

              <Button
                type="submit"
                colorPalette={"blue"}
                loading={formik.isSubmitting}
              >
                Update Teacher
              </Button>
            </VStack>
          </Form>
        </>
      )}
    </Formik>
  );
}

export default TeacherEditFormComponent;
