import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import { Field } from "@/components/ui/field";
import {
  createExpence,
  ICreateExpence,
} from "@/features/accounting/accountingAction";
import { IListItemProp } from "@/features/config/configAction";
import { AppDispatch } from "@/store";
import { Button, Input, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

type IExpenceFormProps = {
  expenceTypeList: Array<IListItemProp>;
  teacherList: Array<IListItemProp>;
};

function ExpenceFormComponent(props: IExpenceFormProps) {
  const { expenceTypeList, teacherList } = props;

  const dispatch = useDispatch<AppDispatch>();

  const initialValues: ICreateExpence = {
    expence_type: {
      key: "",
      value: "",
      image_path: null,
    },
    teacher_id: {
      key: "",
      value: "",
      image_path: null,
    },
    expence_amount: 0,
    date: null,
  };

  const validationSchema = Yup.object({
    expence_type: Yup.object().shape({
      key: Yup.string().required("Expence Type is not valid"),
      value: Yup.string().required("Expence Type name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    teacher_id: Yup.object().shape({
      key: Yup.string().required("Teacher is not valid"),
      value: Yup.string().required("Teacher name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    date: Yup.date()
      .required("Date is required")
      .typeError("Invalid Date")
      .max(new Date(), "Date Can't be in Future"),
    expence_amount: Yup.number()
      .required("Amount is Required")
      .typeError("Invalid amount")
      .min(0, "amount can't be Nagative"),
  });

  const onSubmit = async (values: ICreateExpence, action: any) => {
    try {
      const result = await dispatch(createExpence(values));

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
                htmlFor={"expence_type"}
                labelText={"Expence Type"}
                InputType={"text"}
                InputValue={formik.values.expence_type.value}
                onBlur={formik.handleBlur}
                placeHolder={"ExpenceType"}
                isTouched={
                  formik.touched.expence_type?.value ||
                  formik.touched.expence_type?.key
                }
                isError={
                  formik.errors.expence_type?.value ||
                  formik.errors.expence_type?.key
                }
                formik={formik}
                fieldValue={"expence_type"}
                dataList={expenceTypeList}
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
                dataList={teacherList}
              />

              <InputComponent
                htmlFor={"expence_amount"}
                labelText={"Expence Amount"}
                InputType={"text"}
                InputValue={formik.values.expence_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Amount"}
                isTouched={formik.touched.expence_amount}
                isError={formik.errors.expence_amount}
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
