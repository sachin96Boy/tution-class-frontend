import React, { useRef } from "react";

import * as Yup from "yup";
import { IloginProps } from "@/features/auth/authAction";
import {
  Button,
  Icon,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import InputComponent from "../../formcontrol/customInput/InputComponent";
import { InputGroup } from "@/components/ui/input-group";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Field } from "@/components/ui/field";

function AdminLoginComponent() {
  const { open, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const onClickReveal = () => {
    onToggle();

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  const initialValues: IloginProps = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const onSubmit = async (values: IloginProps, actions: any) => {
    actions.setSubmitting(false);
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
            <Field
              invalid={formik.touched.password && !!formik.errors.password}
              label="Password"
              htmlFor="password"
              errorText={formik.errors.password}
            >
              <InputGroup
                width={"full"}
                ref={inputRef}
                endElement={
                  <Icon
                    aria-label={open ? "Mask password" : "Reveal password"}
                    onClick={onClickReveal}
                  >
                    {open ? (
                      <HiEye style={{ color: "gray.500" }} />
                    ) : (
                      <HiEyeOff style={{ color: "gray.500" }} />
                    )}
                  </Icon>
                }
              >
                <Input
                  id="password"
                  colorPalette={"blue"}
                  css={{ "--focus-color": "colors.primary_color" }}
                  type={open ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  borderColor={
                    formik.touched.password && formik.errors.password
                      ? "red"
                      : "#636363"
                  }
                  borderWidth={"1px"}
                  placeholder="Password"
                  rounded={"10px"}
                  autoComplete="off"
                />
              </InputGroup>
            </Field>
            <Button
              type="submit"
              width={"full"}
              border={"10px"}
              colorScheme="blue"
              bgGradient={
                "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
              }
              boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
              loading={formik.isSubmitting}
            >
              <Text
                fontFamily={"body"}
                fontSize="21px"
                color="white"
                fontWeight={"400"}
              >
                Corporate Login
              </Text>
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default AdminLoginComponent;
