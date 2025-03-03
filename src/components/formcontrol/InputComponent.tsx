import { Input, Text } from "@chakra-ui/react";
import React from "react";
import { Field } from "../ui/field";

type InputProps = {
  htmlFor: string;
  labelText: string;
  InputType: React.HTMLInputTypeAttribute;
  InputValue: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  placeHolder: string;
  isTouched: boolean | undefined;
  isError: string | undefined;
};

function InputComponent({
  htmlFor,
  labelText,
  InputType,
  InputValue,
  onChange,
  onBlur,
  placeHolder,
  isTouched,
  isError,
}: InputProps) {
  return (
    <Field
      invalid={isTouched && !!isError}
      errorText={isError}
      htmlFor={htmlFor}
      label={labelText}
    >
      <Input
        id={htmlFor}
        colorPalette={"blue"}
        css={{ "--focus-color": "colors.primary_color" }}
        type={InputType}
        value={InputValue}
        onChange={onChange}
        onBlur={onBlur}
        borderColor={isTouched && isError ? "red" : "border_color"}
        borderWidth={"1px"}
        placeholder={placeHolder}
        rounded={"10px"}
      />
    </Field>
  );
}

export default InputComponent;
