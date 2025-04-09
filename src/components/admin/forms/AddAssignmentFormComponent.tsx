import FileUploadInput from "@/components/formcontrol/customInput/FileUploadInput";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import InputTextAreaComponent from "@/components/formcontrol/InputTextAreaComponent";
import {
  createAssignment,
  ICreateAssignment,
} from "@/features/assignment/assignmentAction";
import { IListItemProp } from "@/features/config/configAction";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

type IAssignmentCreateForm = {
  courseList: Array<IListItemProp>;
};

import * as Yup from "yup";

function AddAssignmentFormComponent(props: IAssignmentCreateForm) {
  const { courseList } = props;

  const dispatch = useDispatch<AppDispatch>();

  const initialValues: ICreateAssignment = {
    title: "",
    description: "",
    file: null,
    course_id: {
      key: "",
      value: "",
      image_path: null,
    },
  };

  const validationSchema = Yup.object({
    course_id: Yup.object().shape({
      key: Yup.string().required("Course is not valid"),
      value: Yup.string().required("Course name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    title: Yup.string().required("title is required"),
    description: Yup.string().required("description is required"),
    file: Yup.mixed()
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
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes((value as File).type); // Allowed file types
      }),
  });

  const onSubmit = async (values: ICreateAssignment, action: any) => {
    try {
      const result = await dispatch(createAssignment(values));
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
          <Form
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            encType="multipart/form-data"
          >
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
                labelText="Assignment Description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputValue={formik.values.description}
                isTouched={formik.touched.description}
                isError={formik.errors.description}
              />

              <FileUploadInput
                htmlFor={"file"}
                labelText={"Attachments"}
                isInvalid={formik.touched.file && !!formik.errors.file}
                isTouched={formik.touched.file}
                errorText={formik.errors.file}
                handleChange={(details) =>
                  formik.setFieldValue("file", details.acceptedFiles[0])
                }
                handleBlur={formik.handleBlur}
              />

              <InputWithSelect
                htmlFor={"course_id"}
                labelText={"Course"}
                InputType={"text"}
                InputValue={formik.values.course_id.value}
                onBlur={formik.handleBlur}
                placeHolder={"Course"}
                isTouched={
                  formik.touched.course_id?.value ||
                  formik.touched.course_id?.key
                }
                isError={
                  formik.errors.course_id?.value || formik.errors.course_id?.key
                }
                formik={formik}
                fieldValue={"course_id"}
                dataList={courseList}
              />

              <Button
                type="button"
                onClick={() => formik.handleSubmit()}
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

export default AddAssignmentFormComponent;
