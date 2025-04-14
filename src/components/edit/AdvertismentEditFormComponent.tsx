import { Iadvertisment } from "@/features/advertisment/advertismentSlice";
import { Avatar, Box, Button, IconButton, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";

import * as Yup from "yup";
import FileUploadInput from "../formcontrol/customInput/FileUploadInput";
import InputComponent from "../formcontrol/customInput/InputComponent";
import {
  IUpdateAdvertismentProps,
  updateAdvertisment,
} from "@/features/advertisment/advertismentAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store";
import { FileX, X } from "lucide-react";

type IAdvertismentEditProps = {
  data: Iadvertisment;
};

function AdvertismentEditFormComponent(props: IAdvertismentEditProps) {
  const { data } = props;

  const dispatch = useDispatch<AppDispatch>();

  const [advertisment, setAdvertisment] = useState<Iadvertisment>(data);

  const initialValues: IUpdateAdvertismentProps = {
    advertisment_id: data.advertisment_id,
    file_name: null,
    amount: data.duration,
  };

  const validationSchema = Yup.object({
    file_name: Yup.mixed()
      .nullable() // Ensure a file is selected
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
    amount: Yup.string().required("Enter a valid Title"),
  });

  const onSubmit = async (values: IUpdateAdvertismentProps, action: any) => {
    try {
      const result = await dispatch(updateAdvertisment(values));
      action.setSubmitting(false);
      action.resetForm();
    } catch (err) {
      console.log(err);
    }
  };

  const removeLogo = () => {
    setAdvertisment((prv)=>({
        ...prv,
        advertisment_img_path:'',
        file_name:''
    }))
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
              {advertisment.advertisment_img_path != "" ? (
                <Box position="relative">
                  <Avatar.Root size={"2xl"} variant={"subtle"}>
                    <Avatar.Fallback name={data.file_name} />
                    <Avatar.Image src={data.advertisment_img_path} />
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
                  htmlFor={"file_name"}
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
              )}

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

export default AdvertismentEditFormComponent;
