import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import { createAssignmentData, ICreateAssignmentData } from "@/features/assignment/assignmentAction";
import { IListItemProp } from "@/features/config/configAction";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as yup from "yup";

type IAssignmentMarkFormProps = {
  enc_assignment_id: string | null;
  studentList: Array<IListItemProp>;
};



function AssignmentMarkSbmitForm(props: IAssignmentMarkFormProps) {
  const { enc_assignment_id, studentList } = props;
  const dispatch = useDispatch<AppDispatch>();

  const initialValues: ICreateAssignmentData = {
    assignment_id: enc_assignment_id,
    student_id: {
      key: "",
      value: "",
      image_path: null,
    },
    marks: "",
  };

  const validationSchema = yup.object().shape({
    student_id: yup.object().shape({
      key: yup.string().required("Student is not valid"),
      value: yup.string().required("Student name is required"),
      image_path: yup.mixed().nullable(),
    }),
    assignment_id: yup.string().required("id is reqired"),
    marks: yup.string().required("Marks is required"),
  });

  const onSubmit = async (values: ICreateAssignmentData, action: any) => {
    try {
      await dispatch(createAssignmentData(values));

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
          <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <VStack gap={4} width={"full"}>
              <InputWithSelect
                htmlFor={"student_id"}
                labelText={"Student"}
                InputType={"text"}
                InputValue={formik.values.student_id.value}
                onBlur={formik.handleBlur}
                placeHolder={"Student Name"}
                isTouched={
                  formik.touched.student_id?.value || formik.touched.student_id?.key
                }
                isError={
                  formik.errors.student_id?.value || formik.errors.student_id?.key
                }
                formik={formik}
                fieldValue={`student_id`}
                dataList={studentList}
              />

              <InputComponent
                htmlFor={"marks"}
                labelText={"Marks"}
                InputType={"text"}
                InputValue={formik.values.marks}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Marks"}
                isTouched={formik.touched.marks}
                isError={formik.errors.marks}
              />

              <Button
                type="submit"
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

export default AssignmentMarkSbmitForm;
