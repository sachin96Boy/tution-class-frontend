import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  Button,
  VStack,
  Icon,
} from "@chakra-ui/react";
import {
  CloudCog,
  Cloudy,
  FileChartPie,
  Laptop,
  MoveRight,
} from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      title: "Cloud Solution",
      icon: Cloudy,
      description: "Scalable cloud infrastructure for your business needs",
      color: "blue.500",
    },
    {
      title: "Speed Optimization",
      icon: CloudCog,
      description: "Boost your website performance and loading times",
      color: "green.500",
    },
    {
      title: "Online Marketing",
      icon: FileChartPie,
      description: "Data-driven marketing strategies for growth",
      color: "purple.500",
    },
    {
      title: "Website Design",
      icon: Laptop,
      description: "Beautiful, responsive websites tailored to your brand",
      color: "orange.500",
    },
  ];

  return (
    <Container maxW="container.xl" py={16}>
      <VStack gap={6} textAlign="center" mb={12}>
        <Text color="blue.600" fontWeight="bold">
          How to Use Different Section of our App
        </Text>
        <Heading as="h2" size="xl" fontWeight="bold">
          Our Professional Services
        </Heading>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
        {services.map((service, index) => (
          <Card.Root
            key={index}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            _hover={{ transform: "translateY(-5px)", transition: "all 0.3s" }}
          >
            <Card.Header bg={service.color} p={0}>
              <Box p={6} textAlign="center">
                <Icon as={service.icon} boxSize={10} color="white" />
              </Box>
            </Card.Header>
            <Card.Body p={6}>
              <VStack gap={4} align="center">
                <Heading as="h3" size="md" textAlign="center">
                  {service.title}
                </Heading>
                <Text color="gray.600" textAlign="center">
                  {service.description}
                </Text>
              </VStack>
            </Card.Body>
            <Card.Footer justifyContent="center" p={0} pb={6}>
              <Button
                variant="outline"
                colorScheme="blue"
                borderRadius="full"
                px={8}
              >
                MORE <Icon as={MoveRight} />
              </Button>
            </Card.Footer>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ServicesSection;
