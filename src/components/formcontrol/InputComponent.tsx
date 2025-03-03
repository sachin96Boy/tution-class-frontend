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
  formikError: string | undefined;
  isTouched: boolean | undefined;
  isError: boolean | undefined;
};

function InputComponent({
  htmlFor,
  labelText,
  InputType,
  InputValue,
  onChange,
  onBlur,
  placeHolder,
  formikError,
  isTouched,
  isError
}: InputProps) {
  return (
    <Field invalid={isTouched && isError} errorText={formikError} htmlFor={htmlFor} label={labelText}>
      <Input
        id={htmlFor}
        css={{ "--focus-color": "blue" }}
        type={InputType}
        value={InputValue}
        onChange={onChange}
        onBlur={onBlur}
        borderColor={
          isTouched && isError
            ? "red"
            : "#636363"
        }
        borderWidth={"1px"}
        placeholder={placeHolder}
        rounded={"10px"}
      />
    </Field>
  );
}

export default InputComponent;
