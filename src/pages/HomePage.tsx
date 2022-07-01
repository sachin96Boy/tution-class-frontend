import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Image,
  Spacer,
  Text,
} from "@chakra-ui/react";
import sipsaLogo from "../assets/home/Sipsa_logo.png";
import sipsaclassbanner1 from "../assets/home/class-banner/sipsa-class-1.jpg";
import sipsaclassBannerrow2 from "../assets/home/class-banner/sipsa-banner-row-2.jpg";
import sipsaclassBannerrow1 from "../assets/home/class-banner/sipsa-banner-row1.jpg";
import sipsaclassBannerrow3 from "../assets/home/class-banner/sipsa-banner-row3.jpg";
import sipsaclassBannerrow4 from "../assets/home/class-banner/sipsa-banner-row4.jpg";
import React from "react";

const bannerList: Array<string> = [
  sipsaclassbanner1,
  sipsaclassBannerrow2,
  sipsaclassBannerrow1,
  sipsaclassBannerrow3,
  sipsaclassBannerrow4,
];

function HomePage() {
  return (
    <Box>
      <Flex mx={10} gap={20} align={"center"} justify="space-between">
        <Flex
          bg={"#E6F1FF"}
          align={"center"}
          justify="center"
          flexDirection={"column"}
          borderRadius="16px"
          overflow="hidden"
          w={"709px"}
          h={"353px"}
        >
          <Image src={sipsaLogo} objectFit="cover" w={"421px"} h="210px" />
          <Text
            fontFamily={"fantasy"}
            fontWeight="400"
            color="#585858"
            fontSize={"18px"}
          >
            ඔබෙ සිහින වලට නිවහනක් වන අපේ කාලයේ
          </Text>
          <Text
            fontFamily={"fantasy"}
            fontWeight={"400"}
            fontSize="80px"
            bgGradient={
              "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            }
            bgClip={"text"}
            text-fill-color="transparent"
          >
            තක්සලාව
          </Text>
        </Flex>
        <Spacer />
        <Flex
          borderRadius="16px"
          align={"center"}
          justify="center"
          bg={"yellow.400"}
          p={1}
        >
          <Image
            src={sipsaclassbanner1}
            objectFit="contain"
            boxSize={"350px"}
          />
        </Flex>
      </Flex>
      <Flex mx={10} flexDir={"column"} align="start" justify={"start"}>
        <Text
          bgClip={"text"}
          bgGradient="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
          fontSize={"24px"}
          fontFamily="fantasy"
          my={2}
        >
          අපගේ පාඨමාලා
        </Text>
        <Grid
          flexDir={"row"}
          gap={10}
          px={5}
          rounded="10px"
          templateColumns={"repeat(5, 1fr)"}
          bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
        >
          {bannerList.map((item: string, index: number) => (
            <GridItem key={index}>
              <Box p={1} bg={"yellow.400"} rounded="5px" my={5}>
                <Image
                  borderRadius={"12px"}
                  src={item}
                  objectFit="contain"
                  boxSize={"200px"}
                />
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Flex>
      <Flex
        my={5}
        mx={10}
        p={3}
        align={"center"}
        justify="space-between"
        bg="#E6F1FF"
        rounded={"16px"}
      >
        <Text
          color={"#585858"}
          fontFamily="fantasy"
          fontSize={"18px"}
          fontWeight="bold"
          w={"830px"}
          mx={2}
        >
          <Text as={"span"} fontFamily="body">
            Sipsa Web
          </Text>{" "}
          අඩඩිය භාවිත කරන ආකාරය හා ඒ් ආශිත තොරතුරු දැනගැනීම සදහා{" "}
          <Text as={"span"} fontFamily="body">
            Support
          </Text>{" "}
          පිටුවට පිවිසෙන්න
        </Text>
        <Button
          _hover={{
            background:
              "linear-gradient(193deg, rgba(244,187,78,1) 0%, rgba(160,109,58,1) 100%)",
          }}
          bg={" linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"}
        >
          <Text color={"white"} fontSize="21px">
            Support Page
          </Text>
        </Button>
      </Flex>
      <Box my={3} visibility="hidden">
        Dont show this
      </Box>
    </Box>
  );
}

export default HomePage;
