import { IcompanyInfo, IEditcompanyInfo } from "@/features/config/configSlice";
import { AppDispatch } from "@/store";
import { Button, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import InputComponent from "../formcontrol/customInput/InputComponent";
import InputTextAreaComponent from "../formcontrol/InputTextAreaComponent";
import { editCompany } from "@/features/config/configAction";

type IeditCompanyFormProps = {
  data: IcompanyInfo;
};

function CompanyEditForm(props: IeditCompanyFormProps) {
  const { data } = props;

  const dispatch = useDispatch<AppDispatch>();

  const initialValues: IEditcompanyInfo = {
    company_id: data?.id,
    email: data.email,
    name: data.name,
    code: data.code,
    address: data.address,
    vatNo: data.vatNo,
    logo: data.logo,
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    name: Yup.string().required("name is required"),
    code: Yup.string().required("name is required"),
    address: Yup.string().required("name is required"),
    vatNo: Yup.string().required("name is required"),
  });

  const onSubmit = async (values: IEditcompanyInfo, actions: any) => {
    try {
      await dispatch(editCompany(values));

      actions.setSubmitting(false);
      actions.resetForm();
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
        <Form autoComplete="off">
          <VStack gap={4}>
            <InputComponent
              htmlFor={"email"}
              labelText={"Email Address"}
              InputType={"email"}
              InputValue={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Email"}
              isTouched={formik.touched.email}
              isError={formik.errors.email}
            />
            <InputComponent
              htmlFor={"name"}
              labelText={"Name"}
              InputType={"text"}
              InputValue={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Company Name"}
              isTouched={formik.touched.name}
              isError={formik.errors.name}
            />
            <InputComponent
              htmlFor={"code"}
              labelText={"Code"}
              InputType={"text"}
              InputValue={formik.values.code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Code"}
              isTouched={formik.touched.code}
              isError={formik.errors.code}
            />
            <InputTextAreaComponent
              htmlFor={"address"}
              labelText={"Address"}
              InputValue={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Address"}
              isTouched={formik.touched.address}
              isError={formik.errors.address}
            />
            <InputComponent
              htmlFor={"vatNo"}
              labelText={"Vat No"}
              InputType={"text"}
              InputValue={formik.values.vatNo}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"VatNo"}
              isTouched={formik.touched.vatNo}
              isError={formik.errors.vatNo}
            />

            <Button
              type="submit"
              colorPalette={"blue"}
              loading={formik.isSubmitting}
            >
              Update Company
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default CompanyEditForm;
