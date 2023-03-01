import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import React from "react";

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
    <FormControl>
      <FormLabel htmlFor={htmlFor}>
        <Text
          color={"#636363"}
          fontSize="12px"
          fontWeight={"600"}
          fontFamily="body"
        >
          {labelText}
        </Text>
      </FormLabel>
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
      <FormErrorMessage>
        <ErrorMessage name={formikError} />
      </FormErrorMessage>
    </FormControl>
  );
}

export default InputComponent;
