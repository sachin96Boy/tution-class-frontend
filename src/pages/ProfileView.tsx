import Logo from "@/components/Logo";
import { QrCode } from "@/components/ui/qr-code";
import { IStudentAdditionalData } from "@/features/student/studentAction";
import { Avatar, Box, Flex, Heading, Separator, Text } from "@chakra-ui/react";
import { ShieldCheck, ShieldQuestion, UserRoundPlus } from "lucide-react";

type IprofileViewProps = {
  userInfo: IStudentAdditionalData;
};

const ProfileView = ({ userInfo }: IprofileViewProps) => {
  return (
    <Box>
      <ProfileBannerView
        profileImage={userInfo?.profile_image ?? ""}
        fullName={userInfo.Student?.full_name ?? ""}
        verified={userInfo.Student.isVerified}
      />
      <Flex flexDirection={"column"} gap={5} className="details-of-form">
        <Heading as={"h5"} fontSize="25px">
          PROFILE
        </Heading>
        <Flex
          flexDirection={["column", "column", "column", "row"]}
          align={"center"}
          justify="space-around"
          gap={2}
        >
          <Flex
            flexDirection={["column", "column", "row"]}
            align={"center"}
            justify="space-around"
            gap={5}
          >
            <Flex
              flexDirection={"column"}
              align={"start"}
              justify="center"
              gap={1}
              mr={5}
            >
              <ProfileField
                label="Exam Attempt"
                value={userInfo?.exam_attempt}
              />
              <ProfileField label="District" value={userInfo?.district} />
              <ProfileField label="NIC Number" value={userInfo?.nic} />
            </Flex>
            <Flex
              flexDirection={"column"}
              align={"start"}
              justify="center"
              gap={1}
              mr={5}
            >
              <ProfileField label="School Attended" value={userInfo?.school} />
              <ProfileField label="Exam Year" value={userInfo?.exam_year} />
              <ProfileField label="City" value={userInfo?.city} />
              <ProfileField label="Address" value={userInfo?.address} />
            </Flex>
          </Flex>
          <Separator
            minHeight={"350px"}
            size={"lg"}
            display={["none", "none", "none", "block"]}
            orientation={"vertical"}
            colorPalette={"blue"}
          />
          <Flex
            flexDirection={"column"}
            align={"start"}
            gap={5}
            ml={[-5, -5, 5]}
          >
            <Box>
              <Text>QR Code</Text>
              {userInfo != null ? (
                <QrCode
                  colorPalette={"blue"}
                  value={userInfo.student_id}
                  size={"lg"}
                  name={"QR.png"}
                >
                  <Logo linkPath="/" boxSize="24" fitType="cover" />
                </QrCode>
              ) : (
                <Box />
              )}
            </Box>
            <Box w={["50vw", "50vw", "50vw", "full"]}>
              <Text
                fontFamily={"body"}
                color="#636363"
                fontSize={"12px"}
                fontWeight="600"
              >
                Contact Numbers
              </Text>
            </Box>
            <ProfileField label="Mobile number 1" value={userInfo?.mobile1} />
            <ProfileField label="Mobile number 2" value={userInfo?.mobile2} />
          </Flex>
        </Flex>
      </Flex>
      <Separator divideX={"2px"} colorPalette={"blue"} my={5} />
    </Box>
  );
};

type IprofileBannerPros = {
  profileImage: string;
  fullName: string;
  verified: boolean;
};

const ProfileBannerView = ({
  profileImage,
  fullName,
  verified,
}: IprofileBannerPros) => {
  const NameArray = fullName.trim().split(" ") ?? ["", ""];

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
            bg={"linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"}
            p={"4px"}
          >
            <Avatar.Root
              boxSize={"20"}
              _hover={{ cursor: "pointer" }}
              objectFit={"cover"}
            >
              <Avatar.Fallback>
                <Avatar.Icon>
                  <UserRoundPlus size={"28"} style={{ color: "#ffffffff" }} />
                </Avatar.Icon>
              </Avatar.Fallback>
              <Avatar.Image src={profileImage} />
            </Avatar.Root>
          </Box>
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
            {!verified ? (
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
            ) : (
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
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

type IprofieFieldProps = {
  label: string;
  value: string;
};

export const ProfileField = ({ label, value }: IprofieFieldProps) => {
  return (
    <Box mb={4}>
      <Text
        fontFamily={"body"}
        color="#636363"
        fontSize={"12px"}
        fontWeight="600"
        mb={1}
      >
        {label}
      </Text>
      <Text
        fontFamily={"body"}
        color="#000"
        fontSize={"16px"}
        fontWeight="400"
        p={2}
        border="1px solid #e2e8f0"
        borderRadius="md"
      >
        {value || "Not provided"}
      </Text>
    </Box>
  );
};

export default ProfileView;
