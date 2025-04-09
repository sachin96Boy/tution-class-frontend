import {
  Button,
  Icon,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";

import { ErrorMessage, Form, Formik } from "formik";
import React, { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import InputComponent from "./customInput/InputComponent";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { IloginProps, loginUser } from "@/features/auth/authAction";
import { PasswordInput, PasswordStrengthMeter } from "../ui/password-input";

function Signinform() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

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
    emailOrMobile: "",
    password: "",
  };

  const validationSchema = Yup.object({
    emailOrMobile: Yup.string()
      .required("Email is required")
      .test(
        'is-email-or-phone',
        'Invalid email address or Sri Lankan phone number',
        (value) => {
          // Check if it's a valid email
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const isEmail = emailRegex.test(value);
          
          // Check if it's a valid Sri Lankan phone number
          // Sri Lankan phone numbers typically start with 0 or +94 followed by 9 digits
          const phoneRegex = /^(?:\+94|0)(?:7[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]|6[0-9]|7[0-9]|8[1-9]|9[0-9])[0-9]{6}$/;
          const isPhone = phoneRegex.test(value);
          
          return isEmail || isPhone;
        }
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const onSubmit = async (values: IloginProps, actions: any) => {
    const result = await dispatch(loginUser(values));
    if (result.payload?.token) {
      navigate("/dashboard");
    }
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
          <VStack gap={4} m={4} p={8}>
            <InputComponent
              htmlFor={"emailOrMobile"}
              labelText={"Email Address or Mobile"}
              InputType={"text"}
              InputValue={formik.values.emailOrMobile}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Email/Mobile"}
              isTouched={formik.touched.emailOrMobile}
              isError={formik.errors.emailOrMobile}
            />

            <Field
              invalid={formik.touched.password && !!formik.errors.password}
              label="Password"
              htmlFor="password"
              errorText={formik.errors.password}
            >
              {/* <InputGroup
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
              </InputGroup> */}

              <PasswordInput
                rootProps={{
                  width: "full",
                }}
                id="password"
                colorPalette={"blue"}
                css={{ "--focus-color": "colors.primary_color" }}
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
            </Field>
            <Text
              fontFamily={"body"}
              color="#AFAFAF"
              fontSize={"12px"}
              fontWeight="600"
            >
              Don't have an account?{"  "}
              <Text
                as={"span"}
                mx={2}
                fontFamily={"body"}
                color="#215DA7"
                fontSize={"12px"}
                fontWeight="700"
              >
                <Link to={"/signup"}>Sign up</Link>
              </Text>
            </Text>
            <Text
              fontFamily={"body"}
              color="#215DA7"
              fontSize={"12px"}
              fontWeight="700"
            >
              <Link to={"/forgotpassword"}>Forget password?</Link>
            </Text>
            <Button
              type="submit"
              width={"full"}
              border={"10px"}
              colorScheme="blue"
              bgGradient={
                "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
              }
              boxShadow="0px 10px 10px rgba(0,0,0,0.1)"
              loading={loading}
            >
              <Text
                fontFamily={"body"}
                fontSize="21px"
                color="white"
                fontWeight={"400"}
              >
                Login
              </Text>
            </Button>
            <Text
              fontFamily={"body"}
              color="#AFAFAF"
              fontSize={"12px"}
              fontWeight="600"
            >
              Coperate Member?{"  "}
              <Text
                as={"span"}
                mx={2}
                fontFamily={"body"}
                color="#215DA7"
                fontSize={"12px"}
                fontWeight="700"
              >
                <Link to={"/corporate"}>Coperate login</Link>
              </Text>
            </Text>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default Signinform;
