import FileUploadInput from "@/components/formcontrol/customInput/FileUploadInput";
import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import {
  createAdvertisment,
  IcreateAdvertismentProps,
} from "@/features/advertisment/advertismentAction";
import { AppDispatch, RootState } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";

function AdvertismentFormComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.advertisment);

  const initialValues: IcreateAdvertismentProps = {
    file_name: null,
    amount: "",
  };

  const validationSchema = Yup.object({
    file_name: Yup.mixed()
      .required("A file is required") // Ensure a file is selected
      .test("fileSize", "File size is too large", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return (value as File).size <= 5 * 1024 * 1024; // 5MB limit
      })
      .test("fileType", "Unsupported file type", (value) => {
        if (!value) return true; // Skip validation if no file is selected
        return [
          "image/jpeg",
          "image/png",
          "application/pdf",
          "image/webp",
        ].includes((value as File).type); // Allowed file types
      }),
    amount: Yup.string().required("Enter a valid amount"),
  });

  const onSubmit = async (values: IcreateAdvertismentProps, action: any) => {
    try {
      const result = await dispatch(createAdvertisment(values));
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
              <FileUploadInput
                htmlFor={"filename"}
                labelText={"Advertisment Image"}
                isInvalid={
                  formik.touched.file_name && !!formik.errors.file_name
                }
                isTouched={formik.touched.file_name}
                errorText={formik.errors.file_name}
                handleChange={(details) =>
                  formik.setFieldValue("file_name", details.acceptedFiles[0])
                }
                handleBlur={formik.handleBlur}
              />

              <InputComponent
                htmlFor={"amount"}
                labelText={"Title"}
                InputType={"text"}
                InputValue={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeHolder={"Enter Title"}
                isTouched={formik.touched.amount}
                isError={formik.errors.amount}
              />

              <Button
                type="button"
                onClick={() => formik.handleSubmit()}
                colorPalette={"blue"}
                loading={loading}
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

export default AdvertismentFormComponent;
