import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import {
  Button,
  createListCollection,
  Icon,
  Input,
  Portal,
  Select,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";

import * as Yup from "yup";


function UserFormComponent() {
  const { open, onToggle } = useDisclosure();
  const inputRef = useRef<HTMLInputElement>(null);

  const userTypes = {
    ADMIN: "ADMIN",
    ACCOUNTANT: "ACCOUNTENT",
    GENERAL: "GENERAL",
  };

  const userTypeCollections = createListCollection({
    items: [
      { label: "Admin", value: userTypes.ADMIN },
      { label: "Accountant", value: userTypes.ACCOUNTANT },
      { label: "General", value: userTypes.GENERAL },
    ],
  });

  const onClickReveal = () => {
    onToggle();

    if (inputRef.current) {
      inputRef.current.focus({
        preventScroll: true,
      });
    }
  };

  const initialValues = {
    email: "",
    userName: "",
    password: "",
    userRole: [""],
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: Yup.string().required("UserName is required"),
    userRole: Yup.string().required("Role is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const onSubmit = async (values: any, actions: any) => {
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
            <InputComponent
              htmlFor={"useName"}
              labelText={"Username"}
              InputType={"text"}
              InputValue={formik.values.userName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeHolder={"Username"}
              isTouched={formik.touched.userName}
              isError={formik.errors.userName}
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
            <Field
              invalid={!!(formik.errors.userRole || formik.touched.userRole)}
              htmlFor={"role"}
            >
              <Select.Root
                onValueChange={(obj)=>formik.setFieldValue('userRole',obj.value)}
                onBlur={formik.handleBlur}
                onInteractOutside={formik.handleBlur}
                value={formik.values.userRole}
                collection={userTypeCollections}
              >
                <Select.HiddenSelect />
                <Select.Label>Select UserType</Select.Label>
                <Select.Control>
                  <Select.Trigger>
                    <Select.ValueText placeholder="Select Type" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator />
                  </Select.IndicatorGroup>
                </Select.Control>
                  <Select.Positioner width={'full'}>
                    <Select.Content>
                      {userTypeCollections.items.map((type) => (
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
                Create User
              </Text>
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default UserFormComponent;
