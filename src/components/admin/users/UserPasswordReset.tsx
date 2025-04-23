import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { ICoporateResetPasswordProps } from "@/features/auth/authAction";
import { ICoporateUserInfo } from "@/features/auth/authSlice";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";

import * as Yup from "yup";

type IeditUserInfo = {
  data: ICoporateUserInfo;
};

function UserPasswordReset(props: IeditUserInfo) {
  const { data } = props;

  const initialValues: ICoporateResetPasswordProps = {
    user_id: data.user_id,
    password: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const onSubmit = async (
    values: ICoporateResetPasswordProps,
    actions: any
  ) => {
    actions.setSubmitting(false);
    actions.resetForm();
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
            <Field
              invalid={formik.touched.password && !!formik.errors.password}
              label="Password"
              htmlFor="password"
              errorText={formik.errors.password}
            >
              <PasswordInput
                rootProps={{
                  width: "full",
                }}
                id="password"
                colorPalette={"blue"}
                css={{ "--focus-color": "colors.primary_color" }}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor={
                  formik.touched.password && formik.errors.password
                    ? "red"
                    : "#636363"
                }
                borderWidth={"1px"}
                placeholder="Password"
                rounded={"10px"}
                autoComplete="off"
              />
            </Field>
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

export default UserPasswordReset;
