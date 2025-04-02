import InputWithSelect from "@/components/formcontrol/customInput/InputWithSelect";
import { Field } from "@/components/ui/field";
import { IListItemProp } from "@/features/config/configAction";
import {
  Box,
  Button,
  createListCollection,
  Heading,
  HStack,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { FieldArray, Form, Formik } from "formik";
import React, { useState } from "react";

import * as yup from "yup";

type ITimetableFormProps = {
  courseTypeList: Array<IListItemProp>;
};

type ItdataProps = {
  course: IListItemProp;
  startTime: string | null;
  endTime: string | null;
  day: string;
};

function TimetableDataFormComponent(props: ITimetableFormProps) {
  const { courseTypeList } = props;

  const dayTypes = {
    MONDAY: "MONDAY",
    TUESDAY: "TUESDAY",
    WEDNESDAY: "WEDNESDAY",
    THURSDAY: "THURSDAY",
    FRIDAY: "FRIDAY",
    SATURDAY: "SATURDAY",
    SUNDAY: "SUNDAY",
  };

  const days = createListCollection({
    items: [
      { label: "Monday", value: dayTypes.MONDAY },
      { label: "Tuesday", value: dayTypes.TUESDAY },
      { label: "Wednesday", value: dayTypes.WEDNESDAY },
      { label: "Thursday", value: dayTypes.THURSDAY },
      { label: "Friday", value: dayTypes.FRIDAY },
      { label: "Saturday", value: dayTypes.SATURDAY },
      { label: "Sunday", value: dayTypes.SUNDAY },
    ],
  });

  const initialValues: ItdataProps = {
    course: {
      key: "",
      value: "",
      image_path: null,
    },
    startTime: null,
    endTime: null,
    day: "",
  };

  const validationSchema = yup.object().shape({
    course: yup.object().shape({
      key: yup.string().required("Course is not valid"),
      value: yup.string().required("Course name is required"),
      image_path: yup.mixed().nullable(),
    }),
    startTime: yup.string().required("Start time is required"),
    endTime: yup
      .string()
      .required("End time is required")
      .test(
        "is-after-start",
        "End time must be after start time",
        function (endTime) {
          const startTime = this.parent.startTime;
          if (!startTime || !endTime) return true;
          return (
            new Date(`2000-01-01T${endTime}`) >
            new Date(`2000-01-01T${startTime}`)
          );
        }
      ),
    day: yup.string().required("Day is required"),
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
          <Form onSubmit={(e) => e.preventDefault()} autoComplete="off">
            <VStack gap={4} width={"full"}>
              <InputWithSelect
                htmlFor={"course"}
                labelText={"course"}
                InputType={"text"}
                InputValue={formik.values.course.value}
                onBlur={formik.handleBlur}
                placeHolder={"Course"}
                isTouched={
                  formik.touched.course?.value || formik.touched.course?.key
                }
                isError={
                  formik.errors.course?.value || formik.errors.course?.key
                }
                formik={formik}
                fieldValue={`course`}
                dataList={courseTypeList}
              />

              <Field
                invalid={formik.touched.day || !!formik.errors?.day}
                errorText={formik.errors?.day}
                htmlFor={"day"}
              >
                <Select.Root
                  onValueChange={(obj) =>
                    formik.setFieldValue("day", obj.value[0])
                  }
                  onInteractOutside={formik.handleBlur}
                  value={[formik.values.day]}
                  collection={days}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Select Day</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Type" />
                    </Select.Trigger>
                    <Select.IndicatorGroup>
                      <Select.Indicator />
                    </Select.IndicatorGroup>
                  </Select.Control>
                  <Select.Positioner width={"full"}>
                    <Select.Content>
                      {days.items.map((type) => (
                        <Select.Item item={type} key={type.value}>
                          {type.label}
                          <Select.ItemIndicator />
                        </Select.Item>
                      ))}
                    </Select.Content>
                  </Select.Positioner>
                </Select.Root>
              </Field>

              <HStack gap={4} width={"full"}>
                <Field
                  width={"full"}
                  invalid={
                    formik.touched.startTime || !!formik.errors?.startTime
                  }
                  label="Start Time"
                  htmlFor="startTime"
                  errorText={formik.errors?.startTime}
                >
                  <Input
                    type="time"
                    value={formik.values.startTime || ""}
                    onChange={(e) =>
                      formik.setFieldValue(`startTime`, e.target.value)
                    }
                    onBlur={formik.handleBlur}
                  />
                </Field>
                <Field
                  width={"full"}
                  invalid={formik.touched.endTime || !!formik.errors.endTime}
                  label="End Time"
                  htmlFor="endTime"
                  errorText={formik.errors.endTime}
                >
                  <Input
                    type="time"
                    value={formik.values.endTime || ""}
                    onChange={(e) =>
                      formik.setFieldValue(`endTime`, e.target.value)
                    }
                    onBlur={formik.handleBlur}
                  />
                </Field>
              </HStack>

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

export default TimetableDataFormComponent;
