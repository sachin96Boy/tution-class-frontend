import {
  Box,
  Button,
  Card,
  Flex,
  Icon,
  Portal,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";

import { BsArrowRight } from "react-icons/bs";

function OverlayBanner(props: any) {
  const { title, description, backgroundImage } = props;
  const overlayRef = useRef<HTMLDivElement>(null);

  return (
    <Card.Root maxHeight="290.5px" height={"600px"} p="1rem">
      <Card.Body
        p="0px"
        bgImage={`url(${backgroundImage})`}
        bgPos="center"
        bgRepeat="no-repeat"
        w="100%"
        h={{ sm: "200px", lg: "100%" }}
        bgSize="cover"
        position="relative"
        borderRadius="15px"
      >
        <Portal container={overlayRef}>
          <Flex
            flexDirection="column"
            color="white"
            p="1.5rem 1.2rem 0.3rem 1.2rem"
            lineHeight="1.6"
          >
            <Text fontSize="xl" fontWeight="bold" pb=".3rem">
              {title}
            </Text>
            <Text fontSize="sm" fontWeight="normal" w={{ lg: "92%" }}>
              {description}
            </Text>
            <Spacer />
            <Flex align="center" mt={{ sm: "20px", lg: "40px", xl: "90px" }}>
              <Button
                color={"wheat"}
                p="2px"
                variant="ghost"
                bg="transparent"
                mt="12px"
              >
                <Text
                  fontSize="sm"
                  fontWeight="bold"
                  _hover={{ me: "4px" }}
                  transition="all .5s ease"
                >
                  Read more
                </Text>
                <Icon
                  w="20px"
                  h="20px"
                  fontSize="xl"
                  transition="all .5s ease"
                  mx=".3rem"
                  cursor="pointer"
                  _hover={{ transform: "translateX(20%)" }}
                  pt="4px"
                >
                  <BsArrowRight />
                </Icon>
              </Button>
            </Flex>
          </Flex>
        </Portal>
        <Box
          bg="linear-gradient(360deg, rgba(49, 56, 96, 0.16) 0%, rgba(21, 25, 40, 0.88) 100%)"
          w="100%"
          position="absolute"
          h="inherit"
          borderRadius="inherit"
          ref={overlayRef}
        ></Box>
      </Card.Body>
    </Card.Root>
  );
}

export default OverlayBanner;
