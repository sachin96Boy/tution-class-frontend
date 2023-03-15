import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { ErrorMessage, Form, Formik } from "formik";
import React, { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "../../utils/AxiosInstans";
import useToastResponse from "../toast/ToastResponse";

interface SigninformProps {
  email: string;
  password: string;
}

function Signinform() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [state, newToast] = useToastResponse();
  const navigate = useNavigate();
  const { isOpen, onToggle } = useDisclosure();
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
    password: Yup.string().required("Password is required"),
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
        newToast({
          status: res.data.status,
          message: res.data.message,
        })
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/dashboard");
        }
      })
      .catch((err) => {
        console.log(err);
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
          <VStack spacing={4}>
            <FormControl isInvalid={formik.touched.email && !!formik.errors.email}>
              <FormLabel htmlFor="email">
                <Text
                  color={"#636363"}
                  fontSize="12px"
                  fontWeight={"600"}
                  fontFamily="body"
                >
                  Email address
                </Text>
              </FormLabel>
              <Input
                id="email"
                type={"text"}
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                borderColor="#636363"
                border={"1px"}
                placeholder="Email"
                rounded={"10px"}
              />
              <FormErrorMessage>
                <ErrorMessage name="email" />
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={formik.touched.password && !!formik.errors.password}>
              <FormLabel htmlFor="password">
                <Text
                  color={"#636363"}
                  fontSize="12px"
                  fontWeight={"600"}
                  fontFamily="body"
                >
                  password
                </Text>
              </FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  ref={inputRef}
                  type={isOpen ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  borderColor="#636363"
                  border={"1px"}
                  placeholder="Password"
                  rounded={"10px"}
                />
                <InputRightElement>
                  <IconButton
                    aria-label={isOpen ? "Mask password" : "Reveal password"}
                    onClick={() => onClickReveal()}
                    variant="link"
                    icon={
                      isOpen ? (
                        <HiEye style={{ color: "gray.500" }} />
                      ) : (
                        <HiEyeOff style={{ color: "gray.500" }} />
                      )
                    }
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                <ErrorMessage name="password" />
              </FormErrorMessage>
            </FormControl>
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
              isLoading={formik.isSubmitting}
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
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default Signinform;
