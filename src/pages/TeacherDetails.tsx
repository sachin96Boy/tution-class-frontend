import {
  Box,
  Flex,
  Heading,
  Text,
  Avatar,
  Image,
  Stack,
  Badge,
  Grid,
  GridItem,
} from "@chakra-ui/react";

type ITeacherDetails = {
  title: string;
  description: string;
  profileImageUrl: string;
  imageUrl1: string;
  imageUrl2: string;
};

const TeacherDetails = ({
  title,
  description,
  profileImageUrl,
  imageUrl1,
  imageUrl2,
}: ITeacherDetails) => {
  return (
    <Box maxW="6xl" divideX="2px" mx="auto" p={6}>
      <Box>
        {/* Header Section */}
        <Flex
          border="4px solid"
          borderColor="white"
          boxShadow="lg"
          mr={{ base: 0, md: 8 }}
          mb={{ base: 4, md: 0 }}
        >
          <Avatar.Root shape="full" size="lg">
            <Avatar.Fallback name={title} />
            <Avatar.Image src={profileImageUrl} />
          </Avatar.Root>

          <Box textAlign={{ base: "center", md: "left" }}>
            <Heading as="h1" size="2xl" fontWeight="bold" mb={2}>
              {title}
              <Badge ml={3} colorScheme="teal" fontSize="lg" variant="subtle">
                PRO
              </Badge>
            </Heading>

            <Text fontSize="xl" color="gray.600" maxW="2xl">
              {description}
            </Text>

            <Flex justify={{ base: "center", md: "flex-start" }} mt={4}>
              <Badge
                px={3}
                py={1}
                borderRadius="full"
                colorScheme="blue"
                mr={2}
              >
                Photographer
              </Badge>
              <Badge px={3} py={1} borderRadius="full" colorScheme="green">
                Designer
              </Badge>
            </Flex>
          </Box>
        </Flex>
      </Box>

      <Box>
        {/* Gallery Section */}
        <Heading as="h2" size="lg" mb={6} fontWeight="semibold">
          Featured Work
        </Heading>

        <Grid
          templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
          gap={6}
          mb={10}
        >
          <GridItem>
            <Box
              borderRadius="xl"
              overflow="hidden"
              boxShadow="lg"
              position="relative"
              _hover={{ transform: "translateY(-5px)" }}
              transition="transform 0.3s ease"
            >
              <Image
                src={imageUrl1}
                alt="Gallery image 1"
                objectFit="cover"
                w="100%"
                h={{ base: "300px", md: "400px" }}
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="linear-gradient(transparent, rgba(0,0,0,0.7))"
                p={4}
              >
                <Text color="white" fontWeight="bold" fontSize="lg">
                  Sunset Series
                </Text>
              </Box>
            </Box>
          </GridItem>

          <GridItem>
            <Box
              borderRadius="xl"
              overflow="hidden"
              boxShadow="lg"
              position="relative"
              _hover={{ transform: "translateY(-5px)" }}
              transition="transform 0.3s ease"
            >
              <Image
                src={imageUrl2}
                alt="Gallery image 2"
                objectFit="cover"
                w="100%"
                h={{ base: "300px", md: "400px" }}
              />
              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bg="linear-gradient(transparent, rgba(0,0,0,0.7))"
                p={4}
              >
                <Text color="white" fontWeight="bold" fontSize="lg">
                  Urban Exploration
                </Text>
              </Box>
            </Box>
          </GridItem>
        </Grid>

        {/* Stats Section */}
        <Box bg="gray.50" borderRadius="xl" p={6} mt={10}>
          <Heading as="h3" size="md" mb={4} color="gray.700">
            Activity Stats
          </Heading>
          <Flex justify="space-around" textAlign="center">
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                1,234
              </Text>
              <Text color="gray.600">Followers</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                567
              </Text>
              <Text color="gray.600">Following</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold" color="teal.500">
                89
              </Text>
              <Text color="gray.600">Projects</Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
};

export default TeacherDetails;
