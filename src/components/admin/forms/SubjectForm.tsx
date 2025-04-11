import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import {
  createSubject,
  IcreateSubjectProps,
} from "@/features/comon/commonAction";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

function SubjectForm() {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: IcreateSubjectProps = {
    subject_name: "",
  };

  const validationSchema = Yup.object({
    subject_name: Yup.string().required("subject is Required"),
  });

  const onSubmit = async (values: IcreateSubjectProps, action: any) => {
    await dispatch(createSubject(values));

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
              htmlFor={"subject_name"}
              labelText={"Subject Name"}
              InputType={"text"}
              InputValue={formik.values.subject_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Subject"}
              isTouched={formik.touched.subject_name}
              isError={formik.errors.subject_name}
            />

            <Button
              type="submit"
              colorPalette={"blue"}
              loading={formik.isSubmitting}
            >
              Create Subject
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default SubjectForm;
