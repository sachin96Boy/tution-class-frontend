import React, { RefObject } from "react";
import { Avatar, Box, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { ErrorMessage, FormikProps, FormikHelpers } from "formik";

import { BsShieldFillExclamation } from "react-icons/bs";
import { MdVerifiedUser } from "react-icons/md";
import { TbCameraPlus } from "react-icons/tb";

import { FormValues } from "../../pages/MyAccount";
import { Field } from "../ui/field";

interface BannerProps {
  hiddenInputRef: RefObject<HTMLInputElement | null>;
  formik: FormikProps<FormValues>;
  profilehandleChange: (
    element1: React.ChangeEvent<HTMLInputElement>,
    element2: FormikHelpers<FormValues>
  ) => void;
  selectedFile: File;
  preview: string | undefined;
  onClick: () => void;
}

function ProfileBanner({
  hiddenInputRef,
  profilehandleChange,
  formik,
  selectedFile,
  preview,
  onClick,
}: BannerProps) {
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
        <Box
          className="Avater-box"
          rounded={"full"}
          bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
          p={"4px"}
        >
          <Field htmlFor="profileImage">
            <Input
              id="profileImage"
              ref={hiddenInputRef}
              onChange={(event) => profilehandleChange(event, formik)}
              type={"file"}
              onBlur={formik.handleBlur}
              hidden
            />
            <Avatar.Root
              boxSize={"20"}
              _hover={{ cursor: "pointer" }}
              objectFit={"cover"}
              onClick={onClick}
            >
              <Avatar.Fallback>
                <Avatar.Icon>
                  <TbCameraPlus size={"28"} style={{ color: "#ffffffff" }} />
                </Avatar.Icon>
              </Avatar.Fallback>
              <Avatar.Image src={preview} />
            </Avatar.Root>
          </Field>
        </Box>

        <Flex
          ml={5}
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
            Hashan{" "}
            <Text
              as={"span"}
              color="#636363"
              fontWeight={"500"}
              fontSize={["24px", "24px", "24px", "36px"]}
              fontFamily={"body"}
            >
              Maduranga
            </Text>
          </Heading>
          <Flex gap={5}>
            <Flex align={"center"} gap={1}>
              {" "}
              <MdVerifiedUser style={{ color: "#2ECC71" }} />
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
              <BsShieldFillExclamation style={{ color: "#F1C40F" }} />
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
