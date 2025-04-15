import FileUploadInput from "@/components/formcontrol/customInput/FileUploadInput";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import InputTextAreaComponent from "@/components/formcontrol/InputTextAreaComponent";
import { Field } from "@/components/ui/field";
import {
  createCourseData,
  IcreateCourseDataProps,
  IgetCourseDataProps,
  IgetCourseProps,
  IUpdateCourseDataProps,
  updateCourseData,
} from "@/features/course/courseAction";
import { AppDispatch } from "@/store";
import {
  Avatar,
  Box,
  Button,
  createListCollection,
  Icon,
  IconButton,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { File, X } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

type CourseDataFormProps = {
  enc_course_id: string | null;
  courseData: IgetCourseDataProps;
};

function CourseDataEditFormComponent(props: CourseDataFormProps) {
  const { enc_course_id, courseData } = props;

  const [dataItem, setDataItem] = useState<IgetCourseDataProps>(courseData);

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

  const initialValues: IUpdateCourseDataProps = {
    courseData_id: courseData.id,
    enc_course_id: enc_course_id,
    title: courseData.title,
    course_month: courseData.course_month,
    course_content: courseData.course_contnt,
    course_video: courseData.Course_video,
    date: new Date(courseData.date),
    course_attachment: null,
  };

  const validationSchema = Yup.object().shape({
    courseData_id: Yup.string().required("id is required"),
    enc_course_id: Yup.string().required("Course ID is required"),
    title: Yup.string().required("Title is required"),

    course_month: Yup.string().required("Month is required"),

    course_content: Yup.string()
      .required("Course content is required")
      .min(10, "Course content must be at least 10 characters"),

    course_video: Yup.string()
      .required("Video URL is required")
      .url("Must be a valid URL"),

    date: Yup.date()
      .required("Date is required")
      .typeError("Invalid Date")
      .max(new Date(), "Date Can't be in Future"),

    course_attachment: Yup.mixed()
      .nullable()
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

  const onSubmit = async (values: IUpdateCourseDataProps, action: any) => {
    try {
      //   console.log(values);
      const result = await dispatch(updateCourseData(values));
      action.setSubmitting(false);
      action.resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const removeLogo = () => {
    setDataItem((prv) => ({
      ...prv,
      course_attachment: "",
    }));
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
                htmlFor={"title"}
                labelText={"Title"}
                InputType={"text"}
                InputValue={formik.values.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter TitleL"}
                isTouched={formik.touched.title}
                isError={formik.errors.title}
              />
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
              {dataItem.course_attachment != "" ? (
                <Box position="relative">
                  <Avatar.Root size={"2xl"} variant={"subtle"}>
                    <Avatar.Fallback>
                      <Icon>
                        <File />
                      </Icon>
                    </Avatar.Fallback>
                  </Avatar.Root>
                  <IconButton
                    aria-label="Remove logo"
                    position="absolute"
                    top={-2}
                    right={-2}
                    size="sm"
                    colorPalette="red"
                    borderRadius="full"
                    onClick={removeLogo}
                  >
                    <X />
                  </IconButton>
                </Box>
              ) : (
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
              )}

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

export default CourseDataEditFormComponent;
