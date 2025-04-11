import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import {
  createExpenceType,
  IcreateExpenceTypeProps,
} from "@/features/comon/commonAction";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

function ExpenceTypeForm() {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: IcreateExpenceTypeProps = {
    expence_type: "",
  };

  const validationSchema = Yup.object({
    expence_type: Yup.string().required("Expence Type is Required"),
  });

  const onSubmit = async (values: IcreateExpenceTypeProps, action: any) => {
    await dispatch(createExpenceType(values));

    action.setSubmitting(false);
    action.resetForm();
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
              htmlFor={"expence_type"}
              labelText={"Expence type"}
              InputType={"text"}
              InputValue={formik.values.expence_type}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Expence Type"}
              isTouched={formik.touched.expence_type}
              isError={formik.errors.expence_type}
            />

            <Button
              type="submit"
              colorPalette={"blue"}
              loading={formik.isSubmitting}
            >
              Create Expence Type
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default ExpenceTypeForm;
