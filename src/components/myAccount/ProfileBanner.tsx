import React, { RefObject } from "react";
import { Avatar, Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { ErrorMessage, FormikProps, FormikHelpers } from "formik";

import { Field } from "../ui/field";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { IUpdateStudentAdditionalDataProps } from "@/features/student/studentAction";
import { ShieldCheck, ShieldQuestion, UserRoundPlus } from "lucide-react";

interface BannerProps {
  hiddenInputRef: RefObject<HTMLInputElement | null>;
  formik: FormikProps<IUpdateStudentAdditionalDataProps>;
  profilehandleChange: (
    element1: React.ChangeEvent<HTMLInputElement>,
    element2: FormikHelpers<IUpdateStudentAdditionalDataProps>
  ) => void;
  selectedFile: File;
  preview: string | undefined;
  onClick: () => void;
  isTouched: boolean | undefined;
  isError: string | undefined;
}

function ProfileBanner({
  hiddenInputRef,
  profilehandleChange,
  formik,
  isTouched,
  isError,
  preview,
  onClick,
}: BannerProps) {
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const NameArray = userInfo?.full_name?.trim().split(" ") ?? ["", ""];

  return (
    <Flex
      className="profileBanner"
      p={["2", "2", "24px"]}
      rounded={"12px"}
      bgColor={"light_bg_card"}
      my={5}
      maxW={["full", "full", "550px"]}
    >
      <Flex
        align={"center"}
        justify="center"
        flexDirection={["column", "column", "row"]}
      >
        <Flex flexDirection={"column"} align={"center"} justify={"center"}>
          <Box
            className="Avater-box"
            rounded={"full"}
            bg={
              isTouched && !!isError
                ? "red.400"
                : "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            }
            p={"4px"}
          >
            <Avatar.Root
              boxSize={"20"}
              _hover={{ cursor: "pointer" }}
              objectFit={"cover"}
              onClick={onClick}
            >
              <Avatar.Fallback>
                <Avatar.Icon>
                  <UserRoundPlus  size={"28"} style={{ color: "#ffffffff" }} />
                </Avatar.Icon>
              </Avatar.Fallback>
              <Avatar.Image src={preview} />
            </Avatar.Root>
          </Box>
          <Field
            invalid={isTouched && !!isError}
            errorText={isError}
            htmlFor="profileImage"
          >
            <Input
              id="profileImage"
              ref={hiddenInputRef}
              onChange={(event) => profilehandleChange(event, formik)}
              type={"file"}
              onBlur={formik.handleBlur}
              hidden
            />
          </Field>
        </Flex>

        <Flex
          ml={4}
          flexDirection={"column"}
          align={["center", "start"]}
          justify={"center"}
        >
          <Heading
            as={"h3"}
            color="#215DA7"
            fontWeight={"700"}
            fontSize={["24px", "24px", "24px", "36px"]}
            fontFamily={"body"}
          >
            {NameArray?.[0] + " "}
            <Text
              as={"span"}
              color="#636363"
              fontWeight={"500"}
              fontSize={["24px", "24px", "24px", "36px"]}
              fontFamily={"body"}
            >
              {NameArray?.[1]}
            </Text>
          </Heading>
          <Flex gap={5}>
            <Flex align={"center"} gap={1}>
              {" "}
              <ShieldCheck style={{ color: "#2ECC71" }} />
              <Text
                fontFamily={"body"}
                color="#2ECC71"
                fontSize={["16px", "18px"]}
                fontWeight={"500"}
              >
                Verified
              </Text>
            </Flex>
            <Flex align={"center"} gap={1}>
              {" "}
              <ShieldQuestion style={{ color: "#F1C40F" }} />
              <Text
                fontFamily={"body"}
                color="#F1C40F"
                fontSize={["16px", "18px"]}
                fontWeight={"500"}
              >
                Verification Pending
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProfileBanner;
