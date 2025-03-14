import { Box, Card, Flex, Text } from "@chakra-ui/react";
import React from "react";

function SalesOverview(props: any) {
  let textColor = "gray.700";

  const { title, percentage, chart } = props;
  return (
    <Card.Root p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
      <Card.Header mb="20px" pl="22px">
        <Flex direction="column" alignSelf="flex-start">
          <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
            {title}
          </Text>
          <Text fontSize="md" fontWeight="medium" color="gray.400">
            <Text
              as="span"
              color={percentage > 0 ? "green.400" : "red.400"}
              fontWeight="bold"
            >
              {`${percentage}%`} more
            </Text>{" "}
            in 2025
          </Text>
        </Flex>
      </Card.Header>
      <Box w="100%" h={{ sm: "300px" }} ps="8px">
        {chart}
      </Box>
    </Card.Root>
  );
}

export default SalesOverview;
