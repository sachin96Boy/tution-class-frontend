import { INicData } from "@/features/student/studentAction";
import { Flex, Box, Text, Image, Center, Separator } from "@chakra-ui/react";

type INicDociew = {
  userInfo: INicData;
};

const NicDocumentsView = ({ userInfo }: INicDociew) => {
  return (
    <Box mt={8}>
      <Flex flexDirection={"column"} gap={5}>
        <Flex
          align={"center"}
          justify={"center"}
          gap={5}
          flexDirection={["column", "column", "column", "row"]}
        >
          {/* Front NIC */}
          <DocumentView
            label="Front of the NIC"
            imageUrl={userInfo?.nic_front}
            altText="Front NIC"
          />

          {/* Back NIC */}
          <DocumentView
            label="Back of the NIC"
            imageUrl={userInfo?.nic_back}
            altText="Back NIC"
          />

          {/* Selfie with NIC */}
          <DocumentView
            label="Selfie with NIC"
            imageUrl={userInfo?.nic_selfie}
            altText="Selfie with NIC"
          />
        </Flex>
      </Flex>
      <Separator divideX={"2px"} colorPalette={"blue"} my={5} />
    </Box>
  );
};

type IDocumentView = {
  label: string;
  imageUrl: string;
  altText: string;
};

const DocumentView = ({ label, imageUrl, altText }: IDocumentView) => {
  return (
    <Box>
      <Text
        fontFamily={"body"}
        color="#636363"
        fontSize={"12px"}
        fontWeight="600"
        mb={2}
        textAlign="center"
      >
        {label}
      </Text>
      <Flex
        align={"center"}
        justify="center"
        bg={imageUrl ? undefined : "gray.100"}
        w={["full", "300px"]}
        h={"200px"}
        rounded="16px"
        overflow="hidden"
        border={imageUrl ? "1px solid #e2e8f0" : "1px dashed #cbd5e0"}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={altText}
            objectFit="contain"
            w="full"
            h="full"
          />
        ) : (
          <Center>
            <Text color="gray.400">No document uploaded</Text>
          </Center>
        )}
      </Flex>
    </Box>
  );
};

export default NicDocumentsView;
