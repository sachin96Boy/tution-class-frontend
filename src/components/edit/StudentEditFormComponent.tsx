import { IStudentUserEditProps } from "@/features/auth/authAction";
import { IUserInfo } from "@/features/auth/authSlice";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import InputComponent from "../formcontrol/customInput/InputComponent";
import { updateStudentData } from "@/features/student/studentAction";

type IStudentEditFormProps = {
  data: IUserInfo;
};

function StudentEditFormComponent(props: IStudentEditFormProps) {
  const { data } = props;

  const dispatch = useDispatch<AppDispatch>();

  const initialValues: IStudentUserEditProps = {
    student_id: data.student_id,
    email: data.email,
    fullName: data.full_name,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    fullName: Yup.string().required("full Name is required"),
  });

  const onSubmit = async (values: IStudentUserEditProps, actions: any) => {
    try {
      const res = await dispatch(updateStudentData(values));

      actions.setSubmitting(false);
      actions.resetForm();
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
        <Form autoComplete="off">
          <VStack gap={4}>
            <InputComponent
              htmlFor={"email"}
              labelText={"Email Address"}
              InputType={"email"}
              InputValue={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Email"}
              isTouched={formik.touched.email}
              isError={formik.errors.email}
            />
            <InputComponent
              htmlFor={"fullName"}
              labelText={"Full Name"}
              InputType={"text"}
              InputValue={formik.values.fullName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Full Name"}
              isTouched={formik.touched.fullName}
              isError={formik.errors.fullName}
            />

            <Button
              type="submit"
              colorPalette={"blue"}
              loading={formik.isSubmitting}
            >
              Update Student
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default StudentEditFormComponent;
