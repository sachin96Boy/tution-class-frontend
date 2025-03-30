import { Field } from "@/components/ui/field";
import {
  Button,
  FileUpload,
  FileUploadFileChangeDetails,
  Float,
  useFileUploadContext,
} from "@chakra-ui/react";
import React from "react";
import { LuFileImage, LuX } from "react-icons/lu";

type IFileUpoad = {
  htmlFor: string;
  labelText: string;
  isInvalid: boolean | undefined;
  isTouched: boolean | undefined;
  errorText: string | undefined;
  handleChange: ((details: FileUploadFileChangeDetails) => void) | undefined;
  handleBlur: React.FocusEventHandler<HTMLInputElement>;
};

function FileUploadInput(props: IFileUpoad) {
  const {
    htmlFor,
    labelText,
    isInvalid,
    isTouched,
    errorText,
    handleChange,
    handleBlur,
  } = props;

  const FileUploadList = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0) return null;
    return (
      <FileUpload.ItemGroup>
        {files.map((file, index) => (
          <FileUpload.Item w="auto" boxSize="20" p="2" file={file} key={index}>
            <FileUpload.ItemPreviewImage />
            <Float placement="middle-start">
              <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    );
  };

  return (
    <Field
      label={labelText}
      htmlFor={htmlFor}
      invalid={isInvalid && isTouched}
      errorText={errorText}
    >
      <FileUpload.Root
        onBlur={handleBlur}
        onFileChange={handleChange}
        name={htmlFor}
        accept={[
          "image/jpeg",
          "image/png",
          "application/pdf",
          "application/webp",
        ]}
      >
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button type="button" variant="outline" size="sm">
            <LuFileImage /> Upload Images
          </Button>
        </FileUpload.Trigger>
        {/* <FileUploadList /> */}
        <FileUpload.List />
      </FileUpload.Root>
    </Field>
  );
}

export default FileUploadInput;
