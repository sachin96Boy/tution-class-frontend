import InputComponent from "@/components/formcontrol/customInput/InputComponent";
import { Field } from "@/components/ui/field";
import { InputGroup } from "@/components/ui/input-group";
import { PasswordInput } from "@/components/ui/password-input";
import {
  ICoporateregisterProps,
  registerCoporateUser,
} from "@/features/auth/authAction";
import { AppDispatch, RootState } from "@/store";
import {
  Button,
  createListCollection,
  Icon,
  Input,
  Select,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useRef } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";

function UserFormComponent() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading } = useSelector((state: RootState) => state.auth);

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

  const initialValues: ICoporateregisterProps = {
    email: "",
    userName: "",
    password: "",
    userType: [""],
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    userName: Yup.string().required("UserName is required"),
    userType: Yup.array().required("Role is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
  });

  const onSubmit = async (values: ICoporateregisterProps, actions: any) => {
    const result = await dispatch(registerCoporateUser(values));

    actions.setSubmitting(false);
    console.log(result);
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
              htmlFor={"userName"}
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
            <Field
              invalid={formik.touched.userType || !!formik.errors.userType}
              errorText={formik.errors.userType}
              htmlFor={"userType"}
            >
              <Select.Root
                onValueChange={(obj) =>
                  formik.setFieldValue("userType", obj.value)
                }
                onInteractOutside={formik.handleBlur}
                value={formik.values.userType}
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
                <Select.Positioner width={"full"}>
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
            <Button type="submit" colorPalette={"blue"} loading={loading}>
              Create User
            </Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}

export default UserFormComponent;
