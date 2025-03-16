import { Box, List, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import InputComponent from "./InputComponent";
import { FormikProps } from "formik";

type InputWithSelectProps = {
  htmlFor: string;
  labelText: string;
  InputType: React.HTMLInputTypeAttribute;
  InputValue: string | number | readonly string[];
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  placeHolder: string;
  isTouched: boolean | undefined;
  isError: string | undefined;
  formik: FormikProps<any>;
  fieldValue: string;
  dataList: Array<any>;
};

function InputWithSelect(props: InputWithSelectProps) {
  const { open, onOpen, onClose, onToggle } = useDisclosure();

  const {
    htmlFor,
    labelText,
    InputType,
    InputValue,
    onBlur,
    placeHolder,
    isTouched,
    isError,
    formik,
    fieldValue,
    dataList,
  } = props;

  const [filter, setFilter] = useState("");

  const handleChange = (
    data: React.ChangeEvent<HTMLInputElement>,
    formik: FormikProps<any>
  ) => {
    const value = data.target.value;
    formik.setFieldValue(fieldValue, value);
    setFilter(value);

    if (value.length > 2) {
      onOpen();
    } else {
      onClose();
    }
  };

  const handleItemClick = (item: string, formik: FormikProps<any>) => {
    setFilter(item);
    formik.setFieldValue(fieldValue, item);
    onClose();
  };

  const filteredItems: Array<string> =
    filter.length > 2
      ? dataList.filter((item: any) =>
          item.toLowerCase().includes(filter.toLowerCase())
        )
      : [];

  return (
    <Box position={"relative"} display={"inline-block"} width={"full"}>
      <InputComponent
        htmlFor={htmlFor}
        labelText={labelText}
        InputType={InputType}
        InputValue={InputValue}
        onChange={(data) => handleChange(data, formik)}
        onBlur={onBlur}
        placeHolder={placeHolder}
        isTouched={isTouched}
        isError={isError}
      />

      {open && filteredItems.length > 0 && (
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          zIndex={1}
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          boxShadow="md"
          maxH="200px"
          overflowY="auto"
        >
          <List.Root gap={2} p={2}>
            {filteredItems.map((item, index) => (
              <List.Item
                key={index}
                p={2}
                borderRadius="md"
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                onClick={() => handleItemClick(item, formik)}
              >
                {item}
              </List.Item>
            ))}
          </List.Root>
        </Box>
      )}
    </Box>
  );
}

export default InputWithSelect;
