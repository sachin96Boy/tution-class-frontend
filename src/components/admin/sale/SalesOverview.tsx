import { Box, Card, Flex, Text } from "@chakra-ui/react";
import React from "react";

type IsalesOverview = {
  title: string;
  percentage: number;
  chart: React.ReactNode;
};

function SalesOverview(props: IsalesOverview) {
  let textColor = "gray.700";

  const { title, percentage, chart } = props;
  return (
    <Card.Root p="28px 10px 16px 0px" mb={{ sm: "26px", lg: "0px" }}>
      <Card.Header mb="20px" pl="22px">
        <Flex direction="column" alignSelf="flex-start">
          <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
            {title}
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
