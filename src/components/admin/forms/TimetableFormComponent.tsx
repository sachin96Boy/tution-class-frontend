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
  teacherList: Array<IListItemProp>;
};

type ItdataProps = {
  course: IListItemProp;
  startTime: string | null;
  endTime: string | null;
  day: string;
};

type ItimeTableFormInitialValues = {
  teacher: IListItemProp;
  data: Array<ItdataProps>;
};

function TimetableFormComponent(props: ITimetableFormProps) {
  const { courseTypeList, teacherList } = props;

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

  const initialValues: ItimeTableFormInitialValues = {
    teacher: {
      key: "",
      value: "",
      image_path: null,
    },
    data: [],
  };

  const validationSchema = yup.object().shape({
    teacher: yup.object().shape({
      key: yup.string().required("Teacher is not valid"),
      value: yup.string().required("Teacher name is required"),
      image_path: yup.mixed().nullable(),
    }),
    data: yup.array().of(
      yup.object().shape({
        course: yup.object().shape({
          key: yup.string().required("Course is not valid"),
          value: yup.string().required("Course name is required"),
          image_path: yup.mixed().nullable(),
        }),
        startTime: yup
          .string()
          .required("Start time is required"),
        endTime: yup
          .string()
          .required("End time is required")
          .test(
            "is-after-start",
            "End time must be after start time",
            function (endTime) {
              const startTime = this.parent.startTime;
              if (!startTime || !endTime) return true;
              return new Date(`2000-01-01T${endTime}`) > new Date(`2000-01-01T${startTime}`);
            }
          ),
        day: yup.string().required("Day is required"),
      })
    ),
  });

  const onSubmit = async (values: any, action: any) => {
    try {
      console.log(values);
      action.setSubmitting(false);
    } catch (err) {
      console.log(err);
    }
  };

  const [selectedTeacher, setSelectedTeacher] = useState("");
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
                htmlFor={"teacher"}
                labelText={"Teacher"}
                InputType={"text"}
                InputValue={formik.values.teacher.value}
                onBlur={formik.handleBlur}
                placeHolder={"Teacher"}
                isTouched={
                  formik.touched.teacher?.value || formik.touched.teacher?.key
                }
                isError={
                  formik.errors.teacher?.value || formik.errors.teacher?.key
                }
                formik={formik}
                fieldValue={"teacher"}
                dataList={teacherList}
              />

              <FieldArray
                name="data"
                render={(arrayHelpers) => (
                  <VStack
                    gap={4}
                    width={"full"}
                    maxH={"400px"}
                    overflowY={"auto"}
                  >
                    <Heading size="md" mb={4}>
                      Time Table Entries
                    </Heading>
                    {formik.values.data.map((item: any, index: number) => (
                      <Box key={index} width={"full"} gap={4}>
                        <InputWithSelect
                          htmlFor={`data.${index}.course`}
                          labelText={`Course ${index + 1}`}
                          InputType={"text"}
                          InputValue={formik.values.data[index].course.value}
                          onBlur={formik.handleBlur}
                          placeHolder={"Course"}
                          isTouched={
                            formik.touched.data?.[index]?.course?.value ||
                            formik.touched.data?.[index]?.course?.key
                          }
                          isError={
                            (formik.errors.data?.[index] as any)?.course?.value ||
                            (formik.errors.data?.[index] as any)?.course?.key
                          }
                          formik={formik}
                          fieldValue={`data.${index}.course`}
                          dataList={courseTypeList}
                        />

                        <Field
                          invalid={
                            formik.touched.data?.[index].day ||
                            
                              !!(formik.errors.data?.[index] as any)?.day
                          }
                          errorText={
                            
                            (formik.errors.data?.[index] as any)?.day
                          }
                          htmlFor={"day"}
                        >
                          <Select.Root
                            onValueChange={(obj) =>
                              formik.setFieldValue(
                                `data.${index}.day`,
                                obj.value[0]
                              )
                            }
                            onInteractOutside={formik.handleBlur}
                            value={[formik.values.data?.[index].day]}
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
                        <HStack>
                          <Field
                            width={"full"}
                            invalid={
                              formik.touched.data?.[index].startTime ||
                              !!(formik.errors.data?.[index] as any)?.startTime
                            }
                            label="Start Time"
                            htmlFor="startTime"
                            errorText={
                              
                              (formik.errors.data?.[index] as any)?.startTime
                            }
                          >
                            <Input
                              type="time"
                              value={
                                formik.values.data?.[
                                  index
                                ].startTime || ''
                              }
                              onChange={(e) =>
                                formik.setFieldValue(
                                  `data.${index}.startTime`,
                                  e.target.value
                                )
                              }
                              onBlur={formik.handleBlur}
                            />
                          </Field>
                          <Field
                            width={"full"}
                            invalid={
                              formik.touched.data?.[index].endTime ||
                              !!(formik.errors.data?.[index] as any)?.endTime
                            }
                            label="end Time"
                            htmlFor="endTime"
                            errorText={
                             
                              (formik.errors.data?.[index] as any)?.endTime
                            }
                          >
                            <Input
                              type="time"
                              value={
                                formik.values.data[
                                  index
                                ].endTime || ""
                              }
                              onChange={(e) =>
                                formik.setFieldValue(
                                  `data.${index}.endTime`,
                                  e.target.value
                                )
                              }
                              onBlur={formik.handleBlur}
                            />
                          </Field>
                        </HStack>
                        <Button
                          type="button"
                          colorPalette={"red"}
                          onClick={() => arrayHelpers.remove(index)}
                        >
                          Remove
                        </Button>
                      </Box>
                    ))}
                    <Button
                      type="button"
                      colorPalette={"green"}
                      onClick={() =>
                        arrayHelpers.push({
                          course: { key: "", value: "" },
                          startTime: null,
                          endTime: null,
                          day: "",
                        })
                      }
                    >
                      Add
                    </Button>
                  </VStack>
                )}
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

export default TimetableFormComponent;
