import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import { Field } from "@/components/ui/field";
import { Button, Input, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";

import * as Yup from "yup";

function ExpenceFormComponent(props: any) {
  const { expenceTypeList, teacherList } = props;

  const initialValues = {
    expenceTypeId: "",
    teacherId: "",
    amount: 0,
    date: null,
  };

  const validationSchema = Yup.object({
    expenceTypeId: Yup.string().required("Expence Type is required"),
    teacherId: Yup.string().required("Teacher is required"),
    date: Yup.date()
      .required("Date is required")
      .typeError("Invalid Date")
      .max(new Date(), "Date Can't be in Future"),
    amount: Yup.number()
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
                htmlFor={"expencetype"}
                labelText={"Expence Type"}
                InputType={"text"}
                InputValue={formik.values.expenceTypeId}
                onBlur={formik.handleBlur}
                placeHolder={"ExpenceType"}
                isTouched={formik.touched.expenceTypeId}
                isError={formik.errors.expenceTypeId}
                formik={formik}
                fieldValue={"expenceTypeId"}
                dataList={expenceTypeList}
              />
              <InputWithSelect
                htmlFor={"teacherId"}
                labelText={"Teacher"}
                InputType={"text"}
                InputValue={formik.values.teacherId}
                onBlur={formik.handleBlur}
                placeHolder={"Teacher"}
                isTouched={formik.touched.teacherId}
                isError={formik.errors.teacherId}
                formik={formik}
                fieldValue={"teacherId"}
                dataList={teacherList}
              />

              <InputComponent
                htmlFor={"amount"}
                labelText={"Expence Amount"}
                InputType={"text"}
                InputValue={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Amount"}
                isTouched={formik.touched.amount}
                isError={formik.errors.amount}
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

export default ExpenceFormComponent;
