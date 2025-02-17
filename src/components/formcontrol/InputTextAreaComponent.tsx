import { Text, Textarea } from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import React from "react";
import { Field } from "../ui/field";

type InputProps = {
  htmlFor: string | undefined;
  labelText: string;
  InputValue: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onBlur: React.FocusEventHandler<HTMLTextAreaElement>;
  placeHolder: string;
  formikError: string;
};

function InputTextAreaComponent({
  htmlFor,
  labelText,
  InputValue,
  onChange,
  onBlur,
  placeHolder,
  formikError,
}: InputProps) {
  return (
    <Field label={htmlFor}>
      <Textarea
        id={htmlFor}
        value={InputValue}
        onChange={onChange}
        onBlur={onBlur}
        borderColor="#636363"
        border={"1px"}
        placeholder={placeHolder}
        rounded={"10px"}
        size="lg"
      />
    </Field>
  );
}

export default InputTextAreaComponent;
