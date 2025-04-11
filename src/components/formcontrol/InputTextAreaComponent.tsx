import { Text, Textarea } from "@chakra-ui/react";
import React from "react";
import { Field } from "../ui/field";

type InputProps = {
  htmlFor: string;
  labelText: string;
  InputValue: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
  placeHolder: string;
  isTouched: boolean | undefined;
  isError: string | undefined;
};

function InputTextAreaComponent({
  htmlFor,
  labelText,
  InputValue,
  onChange,
  onBlur,
  placeHolder,
  isTouched,
  isError,
}: InputProps) {
  return (
    <Field
      label={labelText}
      htmlFor={htmlFor}
      invalid={isTouched && !!isError}
      errorText={isError}
    >
      <Textarea
        value={InputValue}
        colorPalette={"blue"}
        css={{ "--focus-color": "colors.primary_color" }}
        id={htmlFor}
        onChange={onChange}
        onBlur={onBlur}
        borderColor={isTouched && isError ? "red" : "border_color"}
        borderWidth={"1px"}
        placeholder={placeHolder}
        rounded={"10px"}
        size="lg"
      />
    </Field>
  );
}

export default InputTextAreaComponent;
