import {
  Box,
  Image,
  Text,
  Flex,
  Badge,
  Avatar,
  Heading,
} from "@chakra-ui/react";

type IprofileProps = {
  name: string;
  imageUrl: string;
  role: string;
};

const TeacherProfileCard = ({ name, imageUrl, role }: IprofileProps) => {
  const cardBg = "white";
  const borderColor = "gray.200";
  const accentColor = "teal.500";

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={cardBg}
      borderColor={borderColor}
      boxShadow="xl"
      transition="all 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "2xl",
      }}
    >
      {/* Background Banner */}
      <Box
        h="120px"
        bgGradient={`linear(to-r, ${accentColor}, blue.500)`}
        position="relative"
      />

      {/* Profile Section */}
      <Flex
        direction="column"
        align="center"
        mt="-60px"
        mb="4"
        position="relative"
      >
        <Avatar.Root
          size="xl"
          border="4px solid"
          borderColor={cardBg}
          boxShadow="md"
        >
          <Avatar.Fallback name={name} />
          <Avatar.Image src={imageUrl} />
        </Avatar.Root>

        <Heading as="h3" size="lg" mt="4" fontWeight="bold" color={"gray.800"}>
          {name}
        </Heading>

        {role && (
          <Badge
            colorScheme="teal"
            px="3"
            py="1"
            borderRadius="full"
            mt="2"
            fontSize="sm"
          >
            {role}
          </Badge>
        )}
      </Flex>

      {/* Decorative Elements */}
      <Flex justify="center" pb="4" px="6">
        <Box
          w="40px"
          h="4px"
          bg={accentColor}
          borderRadius="full"
          opacity="0.6"
        />
      </Flex>
    </Box>
  );
};

export default TeacherProfileCard;
