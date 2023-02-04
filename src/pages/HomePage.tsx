import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import sipsaLogo from "../assets/home/Sipsa_logo.png";
import sipsaclassbanner1 from "../assets/home/class-banner/sipsa-class-1.jpg";
import sipsaclassBannerrow2 from "../assets/home/class-banner/sipsa-banner-row-2.jpg";
import sipsaclassBannerrow1 from "../assets/home/class-banner/sipsa-banner-row1.jpg";
import sipsaclassBannerrow3 from "../assets/home/class-banner/sipsa-banner-row3.jpg";
import sipsaclassBannerrow4 from "../assets/home/class-banner/sipsa-banner-row4.jpg";
import React from "react";
import Slider from "react-slick";

const bannerList: Array<string> = [
  sipsaclassbanner1,
  sipsaclassBannerrow2,
  sipsaclassBannerrow1,
  sipsaclassBannerrow3,
  sipsaclassBannerrow4,
];



function HomePage() {
  const vertical = useBreakpointValue({base:true,sm:true,md:false, lg:false},{ ssr: false });
  const verticalSwiping = useBreakpointValue({base:true,sm:true,md:false, lg:false},{ ssr: false });
  
  const settings: any = {
    dots: true,
    autoplay: true,
    vertical: vertical,
    verticalSwiping: verticalSwiping,
    autoplaySpeed: 4000,
    arrow: false,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <Box w={"full"}>
      <Flex
        flexDirection={["column", "column", "row"]}
        gap={2}
        mx={10}
        align={"center"}
        justify="space-between"
      >
        <Flex
          bg={"#E6F1FF"}
          align={"center"}
          justify="center"
          flexDirection={"column"}
          borderRadius="16px"
          w={"full"}
          p={5}
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
            fontSize={["34", "52", "80px"]}
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
          w={"full"}
          p={1}
        >
          <Image
            src={sipsaclassbanner1}
            objectFit="contain"
            boxSize={"350px"}
          />
        </Flex>
      </Flex>
      <Box mx={10}>
        <Text
          bgClip={"text"}
          bgGradient="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
          fontSize={"24px"}
          fontFamily="fantasy"
          my={2}
        >
          අපගේ පාඨමාලා
        </Text>
        <Box
          alignItems={"center"}
          px={5}
          rounded="10px"
          bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
        >
          <Slider {...settings}>
            {bannerList.map((item: string, index: number) => (
              <Box key={index}>
                <Box p={1} bg={"yellow.400"} rounded="5px" m={5}>
                  <Image
                    borderRadius={"12px"}
                    src={item}
                    objectFit="contain"
                    boxSize={"200px"}
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
      <Flex
        my={5}
        mx={10}
        p={3}
        flexDirection={["column", "column", "column", "row"]}
        align={"center"}
        justify="space-between"
        bg="#E6F1FF"
        rounded={"16px"}
      >
        <Text
          color={"#585858"}
          fontFamily="fantasy"
          fontSize={["14px", "14px", "18px"]}
          fontWeight="bold"
          m={2}
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
          colorScheme={"yellow"}
          bgGradient={" linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"}
        >
          <Text color={"white"} fontSize={["16px", "16px", "21px"]}>
            Support Page
          </Text>
        </Button>
      </Flex>
      <Box my={2} visibility="hidden">
        Dont show this
      </Box>
    </Box>
  );
}

export default HomePage;
