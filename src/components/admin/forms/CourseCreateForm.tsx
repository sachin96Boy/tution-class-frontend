import FileUploadInput from "@/components/formcontrol/customInput/FileUploadInput";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import InputTextAreaComponent from "@/components/formcontrol/InputTextAreaComponent";
import { IListItemProp } from "@/features/config/configAction";
import {
  createCourse,
  IcreateCourseProps,
} from "@/features/course/courseAction";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

type ICourseCreateForm = {
  gradeSelectList: Array<IListItemProp>;
  subjectSelectList: Array<IListItemProp>;
  teacherSelectList: Array<IListItemProp>;
};

function CourseCreateForm(props: ICourseCreateForm) {
  const { gradeSelectList, subjectSelectList, teacherSelectList } = props;

  const dispatch = useDispatch<AppDispatch>();

  const currentYear = new Date().getFullYear();

  const initialValues: IcreateCourseProps = {
    title: "",
    description: "",
    subject_id: {
      key: "",
      value: "",
      image_path: null,
    },
    grade_id: {
      key: "",
      value: "",
      image_path: null,
    },
    teacher_id: {
      key: "",
      value: "",
      image_path: null,
    },
    course_img: null,
    year: currentYear,
  };

  const validationSchema = Yup.object({
    subject_id: Yup.object().shape({
      key: Yup.string().required("subject is not valid"),
      value: Yup.string().required("subject is required"),
      image_path: Yup.mixed().nullable(),
    }),
    grade_id: Yup.object().shape({
      key: Yup.string().required("Grade is not valid"),
      value: Yup.string().required("Grade is required"),
      image_path: Yup.mixed().nullable(),
    }),
    teacher_id: Yup.object().shape({
      key: Yup.string().required("Teacher is not valid"),
      value: Yup.string().required("Teacher name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    course_img: Yup.mixed()
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
    year: Yup.number().required("Year is required"),
  });

  const onSubmit = async (values: IcreateCourseProps, action: any) => {
    try {
      const result = await dispatch(createCourse(values));
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
                htmlFor={"title"}
                labelText={"Title"}
                InputType={"text"}
                InputValue={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Title"}
                isTouched={formik.touched.title}
                isError={formik.errors.title}
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
              <InputWithSelect
                htmlFor={"subject_id"}
                labelText={"Subject"}
                InputType={"text"}
                InputValue={formik.values.subject_id.value}
                onBlur={formik.handleBlur}
                placeHolder={"Subject"}
                isTouched={
                  formik.touched.subject_id?.value ||
                  formik.touched.subject_id?.key
                }
                isError={
                  formik.errors.subject_id?.value ||
                  formik.errors.subject_id?.key
                }
                formik={formik}
                fieldValue={"subject_id"}
                dataList={subjectSelectList}
              />
              <InputWithSelect
                htmlFor={"grade_id"}
                labelText={"Grade"}
                InputType={"text"}
                InputValue={formik.values.grade_id.value}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Grade"}
                isTouched={
                  formik.touched.grade_id?.value || formik.touched.grade_id?.key
                }
                isError={
                  formik.errors.grade_id?.value || formik.errors.grade_id?.key
                }
                formik={formik}
                fieldValue={"grade_id"}
                dataList={gradeSelectList}
              />
              <InputWithSelect
                htmlFor={"teacher_id"}
                labelText={"Teacher"}
                InputType={"text"}
                InputValue={formik.values.teacher_id.value}
                onBlur={formik.handleBlur}
                placeHolder={"Teacher"}
                isTouched={
                  formik.touched.teacher_id?.value ||
                  formik.touched.teacher_id?.key
                }
                isError={
                  formik.errors.teacher_id?.value ||
                  formik.errors.teacher_id?.key
                }
                formik={formik}
                fieldValue={"teacher_id"}
                dataList={teacherSelectList}
              />
              <FileUploadInput
                htmlFor={"course_img"}
                labelText={"Course Image"}
                isInvalid={
                  formik.touched.course_img && !!formik.errors.course_img
                }
                isTouched={formik.touched.course_img}
                errorText={formik.errors.course_img}
                handleChange={(details) =>
                  formik.setFieldValue("course_img", details.acceptedFiles[0])
                }
                handleBlur={formik.handleBlur}
              />

              <InputComponent
                htmlFor={"year"}
                labelText={"Year"}
                InputType={"number"}
                InputValue={formik.values.year}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Year"}
                isTouched={formik.touched.year}
                isError={formik.errors.year}
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

export default CourseCreateForm;
