import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import { Field } from "@/components/ui/field";
import { IListItemProp } from "@/features/config/configAction";
import { Button, Input, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import DatePicker from "react-datepicker";

import * as Yup from "yup";

type IpaymentFormComponent = {
  studentList: Array<IListItemProp>;
  courseList: Array<IListItemProp>;
};

function PaymentsFormComponent(props: IpaymentFormComponent) {
  const { studentList, courseList } = props;
  const initialValues = {
    date: null,
    studentId: {
      key: "",
      value: "",
      image_path: null,
    },
    courseId: {
      key: "",
      value: "",
      image_path: null,
    },
    paidAmount: 0,
  };

  const validationSchema = Yup.object({
    studentId: Yup.object().shape({
      key: Yup.string().required("Student is not valid"),
      value: Yup.string().required("Student name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    courseId: Yup.object().shape({
      key: Yup.string().required("Course is not valid"),
      value: Yup.string().required("Course name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    date: Yup.date()
      .required("Date is required")
      .typeError("Invalid Date")
      .max(new Date(), "Date Can't be in Future"),
    paidAmount: Yup.number()
      .required("Amount is Required")
      .typeError("Invalid amount")
      .min(0, "amount can't be Nagative"),
  });

  const onSubmit = async (values: any, action: any) => {
    try {
      console.log(values);
      action.setSubmitting(false);
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
          <Form autoComplete="off">
            <VStack gap={4} width={"full"}>
              <InputWithSelect
                htmlFor={"studentId"}
                labelText={"Student"}
                InputType={"text"}
                InputValue={formik.values.studentId.value}
                onBlur={formik.handleBlur}
                placeHolder={"student"}
                isTouched={
                  formik.touched.studentId?.value ||
                  formik.touched.studentId?.key
                }
                isError={
                  formik.errors.studentId?.value || formik.errors.studentId?.key
                }
                formik={formik}
                fieldValue={"studentId"}
                dataList={studentList}
              />
              <InputWithSelect
                htmlFor={"courseId"}
                labelText={"Course"}
                InputType={"text"}
                InputValue={formik.values.courseId.value}
                onBlur={formik.handleBlur}
                placeHolder={"course"}
                isTouched={
                  formik.touched.courseId?.value || formik.touched.courseId?.key
                }
                isError={
                  formik.errors.courseId?.value || formik.errors.courseId?.key
                }
                formik={formik}
                fieldValue={"courseId"}
                dataList={courseList}
              />

              <InputComponent
                htmlFor={"paidAmount"}
                labelText={"Paid amount"}
                InputType={"text"}
                InputValue={formik.values.paidAmount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Paid Amount"}
                isTouched={formik.touched.paidAmount}
                isError={formik.errors.paidAmount}
              />

              <Field
                width={"full"}
                invalid={formik.touched.date && !!formik.errors.date}
                label="Select Date"
                htmlFor="date"
                errorText={formik.errors.date}
              >
                <DatePicker
                  selected={formik.values.date}
                  onBlur={formik.handleBlur}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select a date"
                  onChange={(date) => formik.setFieldValue("date", date)}
                  customInput={
                    <Input
                      as={Input}
                      css={{ "--focus-color": "colors.primary_color" }}
                      type="text"
                      borderColor={
                        formik.touched.date && formik.errors.date
                          ? "red"
                          : "#636363"
                      }
                      borderWidth={"1px"}
                      rounded={"10px"}
                      autoComplete="off"
                      colorPalette={"blue"}
                      width={"full"}
                    />
                  }
                />
              </Field>

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

export default PaymentsFormComponent;
