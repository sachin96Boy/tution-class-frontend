import {
  Button,
  Icon,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../../utils/AxiosInstans";
import useToastResponse from "../toast/ToastResponse";
import { Field } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import InputComponent from "./InputComponent";

interface SigninformProps {
  email: string;
  password: string;
}

function Signinform() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, newToast] = useToastResponse();
  const navigate = useNavigate();

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
  const initialValues: SigninformProps = {
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

  const onSubmit = async (values: SigninformProps, actions: any) => {
    await axios
      .post(
        `/auth/login`,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          newToast({
            status: res.data.status,
            message: res.data.message,
          });
          if (res.data.user) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem(
              "access_token",
              JSON.stringify(res.data.token)
            );
            navigate("/dashboard");
          }
        }
      })
      .catch((err: AxiosError<any, any>) => {
        console.log(err);
        newToast({
          status: err.response?.data?.status,
          message: err.response?.data?.message,
        });
      });
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
                endElement={
                  <Icon
                    aria-label={open ? "Mask password" : "Reveal password"}
                    onClick={() => onClickReveal()}
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
                  ref={inputRef}
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
              loading={formik.isSubmitting}
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
                <Link to={"/signup"}>Coperate login</Link>
              </Text>
            </Text>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default Signinform;
