import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import { Field } from "@/components/ui/field";
import { createGrade, IcreateGradeProps } from "@/features/comon/commonAction";
import { AppDispatch } from "@/store";
import { Button, createListCollection, Select, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

function GradeForm() {
  const dispatch = useDispatch<AppDispatch>();

  const initialValues:IcreateGradeProps = {
    grade: "",
    grade_type: "",
  };

  const validationSchema = Yup.object({
    grade: Yup.string().required("grade is Required"),
    grade_type: Yup.string().required("Type is Required"),
  });

  const onSubmit = async (values: IcreateGradeProps, action: any) => {
    await dispatch(createGrade(values));

    action.setSubmitting(false);
    action.resetForm();
  };

  const gradeTypes = {
    OL: "OL",
    AL: "AL",
    COMMON: "COMMON",
  };

  const gradeCollections = createListCollection({
    items: [
      { label: "OL", value: gradeTypes.OL },
      { label: "AL", value: gradeTypes.AL },
      { label: "Common", value: gradeTypes.COMMON },
    ],
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form autoComplete="off">
          <VStack gap={4}>
            <InputComponent
              htmlFor={"grade"}
              labelText={"Grade"}
              InputType={"text"}
              InputValue={formik.values.grade}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Grade"}
              isTouched={formik.touched.grade}
              isError={formik.errors.grade}
            />

            <Field
              invalid={formik.touched.grade_type || !!formik.errors.grade_type}
              errorText={formik.errors.grade_type}
              htmlFor={"grade_type"}
            >
              <Select.Root
                onValueChange={(obj) =>
                  formik.setFieldValue("grade_type", obj.value[0])
                }
                onInteractOutside={formik.handleBlur}
                value={[formik.values.grade_type]}
                collection={gradeCollections}
              >
                <Select.HiddenSelect />
                <Select.Label>Select Type</Select.Label>
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
                    {gradeCollections.items.map((type) => (
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
              type="submit"
              colorPalette={"blue"}
              loading={formik.isSubmitting}
            >
              Create Grade
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default GradeForm;
