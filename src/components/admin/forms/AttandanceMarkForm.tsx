import { Button, Input, VStack } from "@chakra-ui/react";

import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Formik } from "formik";
import { Field } from "@/components/ui/field";
import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import { IListItemProp } from "@/features/config/configAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { markAttandance } from "@/features/attandance/attandanceAction";

type IattandanceMarksForm = {
  studentList: Array<IListItemProp>;
  courseList: Array<IListItemProp>;
};

type IinitialState = {
  student_id: IListItemProp;
  course_id: IListItemProp;
  date: Date | null;
};

function AttandanceMarkForm(props: IattandanceMarksForm) {
  const dispatch = useDispatch<AppDispatch>();

  const { studentList, courseList } = props;

  const initialValues: IinitialState = {
    date: null,
    student_id: {
      key: "",
      value: "",
      image_path: null,
    },
    course_id: {
      key: "",
      value: "",
      image_path: null,
    },
  };

  const validationSchema = Yup.object({
    student_id: Yup.object().shape({
      key: Yup.string().required("Student is not valid"),
      value: Yup.string().required("Student name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    course_id: Yup.object().shape({
      key: Yup.string().required("Course is not valid"),
      value: Yup.string().required("Course name is required"),
      image_path: Yup.mixed().nullable(),
    }),
    date: Yup.date()
      .required("Date is required")
      .typeError("Invalid Date")
      .max(new Date(), "Date Can't be in Future"),
  });

  const onSubmit = async (values: IinitialState, action: any) => {
    try {
      console.log(values)
      await dispatch(
        markAttandance({
          course_id: values.course_id.key,
          student_id: values.student_id.key,
          date: values.date,
        })
      );

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
          <Form autoComplete="off">
            <VStack gap={4} width={"full"}>
              <InputWithSelect
                htmlFor={"student_id"}
                labelText={"Student"}
                InputType={"text"}
                InputValue={formik.values.student_id.value}
                onBlur={formik.handleBlur}
                placeHolder={"student"}
                isTouched={
                  formik.touched.student_id?.value ||
                  formik.touched.student_id?.key
                }
                isError={
                  formik.errors.student_id?.value ||
                  formik.errors.student_id?.key
                }
                formik={formik}
                fieldValue={"student_id"}
                dataList={studentList}
              />
              <InputWithSelect
                htmlFor={"course_id"}
                labelText={"Course"}
                InputType={"text"}
                InputValue={formik.values.course_id.value}
                onBlur={formik.handleBlur}
                placeHolder={"course"}
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

export default AttandanceMarkForm;
