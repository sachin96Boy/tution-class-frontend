import { Input, Text } from "@chakra-ui/react";
import React from "react";
import { Field } from "../ui/field";

type InputProps = {
  htmlFor: string | undefined;
  labelText: string;
  InputType: React.HTMLInputTypeAttribute;
  InputValue: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  placeHolder: string;
  formikError: string;
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
}: InputProps) {
  return (
    <Field label={htmlFor}>
      <Input
        id={htmlFor}
        type={InputType}
        value={InputValue}
        onChange={onChange}
        onBlur={onBlur}
        borderColor="#636363"
        border={"1px"}
        placeholder={placeHolder}
        rounded={"10px"}
      />
    </Field>
  );
}

export default InputComponent;
