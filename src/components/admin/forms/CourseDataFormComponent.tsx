import FileUploadInput from "@/components/formcontrol/customInput/FileUploadInput";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputTextAreaComponent from "@/components/formcontrol/InputTextAreaComponent";
import { Field } from "@/components/ui/field";
import {
  createCourseData,
  IcreateCourseDataProps,
} from "@/features/course/courseAction";
import { AppDispatch } from "@/store";
import { Button, createListCollection, Select, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

type CourseDataFormProps = {
  enc_course_id: string | null;
};

function CourseDataFormComponent(props: CourseDataFormProps) {
  const { enc_course_id } = props;

  const dispatch = useDispatch<AppDispatch>();

  const MonthTypes = {
    JANNUARY: "JANNUARY",
    FEBRUARY: "FEBRUARY",
    MARCH: "MARCH",
    APRIL: "APRIL",
    MAY: "MAY",
    JUNE: "JUNE",
    JULY: "JULY",
    AUGUST: "AUGUST",
    SEPTEMBER: "SEPTEMBER",
    OCTOBER: "OCTOBER",
    NOVEMBER: "NOVEMBER",
    DECEMBER: "DECEMBER",
  };

  const days = createListCollection({
    items: [
      { label: "January", value: MonthTypes.JANNUARY },
      { label: "February", value: MonthTypes.FEBRUARY },
      { label: "March", value: MonthTypes.MARCH },
      { label: "April", value: MonthTypes.APRIL },
      { label: "May", value: MonthTypes.MAY },
      { label: "June", value: MonthTypes.JUNE },
      { label: "July", value: MonthTypes.JULY },
      { label: "August", value: MonthTypes.AUGUST },
      { label: "September", value: MonthTypes.SEPTEMBER },
      { label: "October", value: MonthTypes.OCTOBER },
      { label: "November", value: MonthTypes.NOVEMBER },
      { label: "December", value: MonthTypes.DECEMBER },
    ],
  });

  const initialValues: IcreateCourseDataProps = {
    enc_course_id: enc_course_id,
    course_month: "",
    course_content: "",
    course_video: "",
    course_attachment: null,
  };

  const validationSchema = Yup.object().shape({
    enc_course_id: Yup.string().required("Course ID is required"),

    course_month: Yup.string().required("Month is required"),

    course_content: Yup.string()
      .required("Course content is required")
      .min(10, "Course content must be at least 10 characters"),

    course_video: Yup.string()
      .required("Video URL is required")
      .url("Must be a valid URL"),

    course_attachment: Yup.mixed()
      .required("Attachment required")
      .test(
        "fileSize",
        "File is too large",
        (value) => !value || (value && (value as File).size <= 5 * 1024 * 1024) // 5MB max
      )
      .test(
        "fileFormat",
        "Unsupported file format",
        (value) =>
          !value ||
          (value &&
            [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes((value as File).type))
      ),
  });

  const onSubmit = async (values: IcreateCourseDataProps, action: any) => {
    try {
      //   console.log(values);
      const result = await dispatch(createCourseData(values));
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
          <Form
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
            encType="multipart/form-data"
          >
            <VStack gap={4} width={"full"}>
              <InputComponent
                htmlFor={"course_video"}
                labelText={"Course video"}
                InputType={"text"}
                InputValue={formik.values.course_video}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Video URL"}
                isTouched={formik.touched.course_video}
                isError={formik.errors.course_video}
              />

              <InputTextAreaComponent
                htmlFor="course_content"
                placeHolder="Enter Content"
                labelText="Course Conntent"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                InputValue={formik.values.course_content}
                isTouched={formik.touched.course_content}
                isError={formik.errors.course_content}
              />

              <FileUploadInput
                htmlFor={"course_attachment"}
                labelText={"Attachments"}
                isInvalid={
                  formik.touched.course_attachment &&
                  !!formik.errors.course_attachment
                }
                isTouched={formik.touched.course_attachment}
                errorText={formik.errors.course_attachment}
                handleChange={(details) =>
                  formik.setFieldValue(
                    "course_attachment",
                    details.acceptedFiles[0]
                  )
                }
                handleBlur={formik.handleBlur}
              />

              <Field
                invalid={
                  formik.touched.course_month || !!formik.errors?.course_month
                }
                errorText={formik.errors?.course_month}
                htmlFor={"course_month"}
              >
                <Select.Root
                  onValueChange={(obj) =>
                    formik.setFieldValue("course_month", obj.value[0])
                  }
                  onInteractOutside={formik.handleBlur}
                  value={[formik.values.course_month]}
                  collection={days}
                >
                  <Select.HiddenSelect />
                  <Select.Label>Select Month</Select.Label>
                  <Select.Control>
                    <Select.Trigger>
                      <Select.ValueText placeholder="Select Month" />
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

              <Button
                type="button"
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

export default CourseDataFormComponent;
