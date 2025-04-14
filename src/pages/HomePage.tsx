import React, { useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Spacer,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion"; // Import Framer Motion
import sipsaLogo from "../assets/header/logos/Sipsa_logo.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  getAllAdvertisments,
  getCompanyMainBanner,
} from "@/features/advertisment/advertismentAction";
import Spinner from "@/components/spinner/Spinner";
import CarousaComponent from "@/components/carousel/CarousaComponent";
import { EmblaOptionsType } from "embla-carousel";

// Motion components
const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionImage = motion(Image);
const MotionText = motion(Text);
const MotionButton = motion(Button);

function HomePage() {
  const vertical = useBreakpointValue(
    { base: true, sm: true, md: false, lg: false },
    { ssr: false }
  );
  const verticalSwiping = useBreakpointValue(
    { base: true, sm: true, md: false, lg: false },
    { ssr: false }
  );

  const dispatch = useDispatch<AppDispatch>();

  const { company } = useSelector((state: RootState) => state.config);

  const { loading, advertisments, companyMainAd } = useSelector(
    (state: RootState) => state.advertisment
  );

  const logoPath = `${import.meta.env.VITE_BACKEND_STATIC}/logo/${
    company[0]?.logo
  }`;

  const navigate = useNavigate();

  const handlenavigtetoSupport = () => {
    navigate("/dashboard/support");
  };

  useEffect(() => {
    if (company && company.length > 0) {
      dispatch(
        getCompanyMainBanner({
          enc_company_id: company[0].id,
        })
      );
    }
    dispatch(getAllAdvertisments(""));
  }, [dispatch, company]);

  const OPTIONS: EmblaOptionsType = { loop: true };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.8 } },
  };

  const scaleUp = {
    hidden: { scale: 0.9, opacity: 0 },
    show: { scale: 1, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <MotionBox
      w={"full"}
      px={[4, 6, 10]}
      initial="hidden"
      animate="show"
      variants={container}
    >
      {/* Top Section */}
      <MotionFlex
        flexDirection={["column", "column", "row"]}
        gap={[4, 6, 8]}
        align={"center"}
        justify="space-between"
        my={[4, 6, 8]}
        variants={container}
      >
        <MotionFlex
          bg={"light_bg_card"}
          align={"center"}
          justify="center"
          flexDirection={"column"}
          borderRadius="16px"
          w={["full", "full", "60%"]}
          p={[4, 6]}
          variants={item}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <MotionImage
            src={company && company.length > 0 ? logoPath : sipsaLogo}
            objectFit="contain"
            w={["200px", "300px", "421px"]}
            h={["100px", "150px", "210px"]}
            variants={scaleUp}
          />
          <MotionText
            fontFamily={"fantasy"}
            fontWeight="400"
            color="secondary_title_color"
            fontSize={["14px", "16px", "18px"]}
            textAlign="center"
            variants={item}
          >
            ඔබෙ සිහින වලට නිවහනක් වන අපේ කාලයේ
          </MotionText>
          <MotionText
            fontFamily={"fantasy"}
            fontWeight={"400"}
            fontSize={["24px", "36px", "52px", "80px"]}
            bgGradient={
              "linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
            }
            bgClip={"text"}
            text-fill-color="transparent"
            variants={item}
            whileHover={{ scale: 1.05 }}
          >
            තක්සලාව
          </MotionText>
        </MotionFlex>
        <Spacer />
        <MotionFlex
          borderRadius="16px"
          align={"center"}
          justify="center"
          bg={"yellow.400"}
          w={["full", "full", "35%"]}
          p={[2, 4]}
          variants={item}
          whileHover={{ scale: 1.02 }}
        >
          {loading ? (
            <Center boxSize={["200px", "250px", "350px"]}>
              <Spinner />
            </Center>
          ) : (
            <MotionImage
              src={
                companyMainAd != null
                  ? companyMainAd.advertisment_img_path
                  : sipsaLogo
              }
              objectFit="fill"
              boxSize={["200px", "250px", "350px"]}
              variants={scaleUp}
              whileHover={{ scale: 1.03 }}
            />
          )}
        </MotionFlex>
      </MotionFlex>

      {/* Courses Section */}
      <MotionBox variants={fadeIn}>
        <MotionText
          bgClip={"text"}
          bgGradient="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
          fontSize={["18px", "20px", "24px"]}
          fontFamily="fantasy"
          my={[2, 4]}
          variants={item}
        >
          අපගේ පාඨමාලා
        </MotionText>
        <MotionFlex
          alignItems={"center"}
          justifyContent={"center"}
          px={[2, 4, 6]}
          rounded="10px"
          bg="linear-gradient(94.5deg, #205EAA 0.53%, #2B2D4E 99.79%)"
          variants={item}
        >
          {loading ? (
            <Center>
              <Spinner />
            </Center>
          ) : advertisments && advertisments.length > 0 ? (
            <CarousaComponent slides={advertisments} options={OPTIONS} />
          ) : (
            <Center boxSize={["150px", "180px", "220px"]}>
              <Heading textAlign={"center"} color={"gray.200"} size={"lg"}>
                No Details to Display
              </Heading>
            </Center>
          )}
        </MotionFlex>
      </MotionBox>

      {/* Support Section */}
      <MotionFlex
        my={[4, 6]}
        p={[3, 4, 6]}
        flexDirection={["column", "column", "row"]}
        align={"center"}
        justify="space-between"
        bg="light_bg_card"
        rounded={"16px"}
        variants={item}
        whileHover={{ scale: 1.01 }}
      >
        <MotionText
          color={"text_secondary_color"}
          fontFamily="fantasy"
          fontSize={["12px", "14px", "18px"]}
          fontWeight="bold"
          m={[1, 2]}
          textAlign="center"
          variants={item}
        >
          <Text as={"span"} fontFamily="body">
            {company && company.length > 0 ? company[0].name : ""} Web
          </Text>{" "}
          අඩඩිය භාවිත කරන ආකාරය හා ඒ් ආශිත තොරතුරු දැනගැනීම සදහා{" "}
          <Text as={"span"} fontFamily="body">
            Support
          </Text>{" "}
          පිටුවට පිවිසෙන්න
        </MotionText>
        <MotionButton
          colorPalette={"yellow"}
          bgGradient={" linear-gradient(94.16deg, #F4BB4E 2.33%, #A06D3A 100%)"}
          size={["sm", "md"]}
          mt={[2, 0]}
          onClick={handlenavigtetoSupport}
          variants={item}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Text color={"white"} fontSize={["14px", "16px", "21px"]}>
            Support Page
          </Text>
        </MotionButton>
      </MotionFlex>

      {/* Hidden Section */}
      <MotionBox my={2} visibility="hidden" variants={item}>
        Dont show this
      </MotionBox>
    </MotionBox>
  );
}

export default HomePage;