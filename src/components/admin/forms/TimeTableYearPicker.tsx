import { Field } from "@/components/ui/field";
import { createTimetable } from "@/features/timetable/timetableAction";
import { AppDispatch } from "@/store";
import { Button, Input, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

function TimeTableYearPicker() {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues = {
    year: null,
  };

  const validationSchema = Yup.object({
    year: Yup.date()
      .required("Year is required")
      .typeError("Invalid Date")
      .max(new Date(), "Date Can't be in Future"),
  });

  const onSubmit = async (values: any, action: any) => {
    try {
      const { year } = values;

      await dispatch(
        createTimetable({
          year: year,
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
              <Field
                width={"full"}
                invalid={formik.touched.year && !!formik.errors.year}
                label="Select Year"
                htmlFor="year"
                errorText={formik.errors.year}
              >
                <DatePicker
                  selected={formik.values.year}
                  onBlur={formik.handleBlur}
                  dateFormat="yyyy"
                  showYearPicker
                  isClearable
                  placeholderText="Select Year"
                  onChange={(date) => formik.setFieldValue("year", date)}
                  customInput={
                    <Input
                      as={Input}
                      css={{ "--focus-color": "colors.primary_color" }}
                      type="text"
                      borderColor={
                        formik.touched.year && formik.errors.year
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

export default TimeTableYearPicker;
