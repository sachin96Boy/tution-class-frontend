"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  Container,
  Avatar,
} from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

const Testimonial = (props: Props) => {
  const { children } = props;

  return <Box>{children}</Box>;
};

const TestimonialContent = (props: Props) => {
  const { children } = props;

  return (
    <Stack
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: "white",
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = (props: Props) => {
  const { children } = props;

  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = (props: Props) => {
  const { children } = props;

  return (
    <Text textAlign={"center"} color={"gray.600"} fontSize={"sm"}>
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar.Root>
        <Avatar.Fallback />
        <Avatar.Image src={src} mb={2} />
      </Avatar.Root>
      <Stack gap={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={"gray.600"}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function Testomonials() {
  return (
    <Box>
      <Container maxW={"7xl"} py={16} as={Stack} gap={12}>
        <Stack gap={0} align={"center"}>
          <Heading>Our Students Speak</Heading>
        </Stack>
        <Stack
          direction={{ base: "column", md: "row" }}
          gap={{ base: 10, md: 4, lg: 10 }}
        >
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Great Teaching Methods</TestimonialHeading>
              <TestimonialText>
                Our Teachers Teaches Us with modern methods and It help me to
                Learn Quickly and Obtain a Good Result
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={""}
              name={"Supun Arunasingha"}
              title={"AL Student"}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Paper Classes</TestimonialHeading>
              <TestimonialText>
                We were able to learn more content by attending paper classes
                and completing Question Papers
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={""}
              name={"Ruvini Dissanayaka"}
              title={"OL Student"}
            />
          </Testimonial>
          <Testimonial>
            <TestimonialContent>
              <TestimonialHeading>Clear Notes</TestimonialHeading>
              <TestimonialText>
                Our Sir Provide Good Class Notes , We were able to study Well
                due to proper documents
              </TestimonialText>
            </TestimonialContent>
            <TestimonialAvatar
              src={""}
              name={"Kavya Banuki"}
              title={"OL Student"}
            />
          </Testimonial>
        </Stack>
      </Container>
    </Box>
  );
}
