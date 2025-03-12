import React from "react";
import {
  Box,
  Button,
  Flex,
  Image,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import sipsaclassbanner1 from "../assets/home/class-banner/sipsa-class-1.jpg";
import sipsaclassBannerrow2 from "../assets/home/class-banner/sipsa-banner-row-2.jpg";
import sipsaclassBannerrow1 from "../assets/home/class-banner/sipsa-banner-row1.jpg";
import sipsaclassBannerrow3 from "../assets/home/class-banner/sipsa-banner-row3.jpg";
import sipsaclassBannerrow4 from "../assets/home/class-banner/sipsa-banner-row4.jpg";
import sipsaLogo from "../assets/header/logos/Sipsa_logo.png";

import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

const bannerList: Array<string> = [
  sipsaclassbanner1,
  sipsaclassBannerrow2,
  sipsaclassBannerrow1,
  sipsaclassBannerrow3,
  sipsaclassBannerrow4,
];

function HomePage() {
  const vertical = useBreakpointValue(
    { base: true, sm: true, md: false, lg: false },
    { ssr: false }
  );
  const verticalSwiping = useBreakpointValue(
    { base: true, sm: true, md: false, lg: false },
    { ssr: false }
  );

  const navigate = useNavigate();

  const settings: any = {
    dots: true,
    autoplay: true,
    vertical: vertical,
    verticalSwiping: verticalSwiping,
    autoplaySpeed: 4000,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768, // Adjust for smaller screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          vertical: false,
          verticalSwiping: false,
        },
      },
    ],
  };

  const handlenavigtetoSupport = ()=>{
    navigate('/dashboard/support');
  }

  return (
    <Box w={"full"} px={[4, 6, 10]}>
      {" "}
      {/* Responsive padding */}
      {/* Top Section */}
      <Flex
        flexDirection={["column", "column", "row"]}
        gap={[4, 6, 8]}
        align={"center"}
        justify="space-between"
        my={[4, 6, 8]}
      >
        <Flex
          bg={"light_bg_card"}
          align={"center"}
          justify="center"
          flexDirection={"column"}
          borderRadius="16px"
          w={["full", "full", "60%"]}
          p={[4, 6]}
        >
          <Image
            src={sipsaLogo}
            objectFit="cover"
            w={["200px", "300px", "421px"]}
            h={["100px", "150px", "210px"]}
          />
          <Text
            fontFamily={"fantasy"}
            fontWeight="400"
            color="secondary_title_color"
            fontSize={["14px", "16px", "18px"]}
            textAlign="center"
          >
            ඔබෙ සිහින වලට නිවහනක් වන අපේ කාලයේ
          </Text>
          <Text
            fontFamily={"fantasy"}
            fontWeight={"400"}
            fontSize={["24px", "36px", "52px", "80px"]}
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
          w={["full", "full", "35%"]}
          p={[2, 4]}
        >
          <Image
            src={sipsaclassbanner1}
            objectFit="contain"
            boxSize={["200px", "250px", "350px"]}
          />
        </Flex>
      </Flex>
      {/* Courses Section */}
      <Box>
        <Text
          bgClip={"text"}
          bgGradient="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
          fontSize={["18px", "20px", "24px"]}
          fontFamily="fantasy"
          my={[2, 4]}
        >
          අපගේ පාඨමාලා
        </Text>
        <Box
          alignItems={"center"}
          px={[2, 4, 6]}
          rounded="10px"
          bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
        >
          <Slider {...settings}>
            {bannerList.map((item: string, index: number) => (
              <Box key={index}>
                <Box p={1} bg={"yellow.400"} rounded="5px" m={[2, 4]}>
                  <Image
                    borderRadius={"12px"}
                    src={item}
                    objectFit="cover"
                    boxSize={["150px", "180px", "200px"]}
                  />
                </Box>
              </Box>
            ))}
          </Slider>
        </Box>
      </Box>
      {/* Support Section */}
      <Flex
        my={[4, 6]}
        p={[3, 4, 6]}
        flexDirection={["column", "column", "row"]}
        align={"center"}
        justify="space-between"
        bg="light_bg_card"
        rounded={"16px"}
      >
        <Text
          color={"text_secondary_color"}
          fontFamily="fantasy"
          fontSize={["12px", "14px", "18px"]}
          fontWeight="bold"
          m={[1, 2]}
          textAlign="center"
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
          colorPalette={"yellow"}
          bgGradient={" linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"}
          size={["sm", "md"]}
          mt={[2, 0]}
          onClick={handlenavigtetoSupport}
        >
          <Text color={"white"} fontSize={["14px", "16px", "21px"]}>
            Support Page
          </Text>
        </Button>
      </Flex>
      {/* Hidden Section */}
      <Box my={2} visibility="hidden">
        Dont show this
      </Box>
    </Box>
  );
}

export default HomePage;
