import { ICoporateEditProps } from "@/features/auth/authAction";
import { ICoporateUserInfo } from "@/features/auth/authSlice";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";
import InputComponent from "../formcontrol/customInput/InputComponent";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { updateUser } from "@/features/users/userAction";

type IeditUserInfo = {
  data: ICoporateUserInfo;
};

function UserEditFormComponent(props: IeditUserInfo) {
  const { data } = props;

  const dispatch = useDispatch<AppDispatch>();

  const initialValues: ICoporateEditProps = {
    user_id: data.user_id,
    email: data.email,
    userName: data.userName,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: Yup.string().required("UserName is required"),
  });

  const onSubmit = async (values: ICoporateEditProps, actions: any) => {
    try {
      const res = await dispatch(updateUser(values));

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
              htmlFor={"userName"}
              labelText={"Username"}
              InputType={"text"}
              InputValue={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Username"}
              isTouched={formik.touched.userName}
              isError={formik.errors.userName}
            />

            <Button
              type="submit"
              colorPalette={"blue"}
              loading={formik.isSubmitting}
            >
              Update User
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default UserEditFormComponent;
