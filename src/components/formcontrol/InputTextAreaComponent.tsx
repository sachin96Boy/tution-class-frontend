import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ErrorMessage } from "formik";
import React from "react";

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
      <FormErrorMessage>
        <ErrorMessage name={formikError} />
      </FormErrorMessage>
    </FormControl>
  );
}

export default InputTextAreaComponent;
