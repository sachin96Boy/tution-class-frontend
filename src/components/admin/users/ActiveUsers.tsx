import { Card, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";


function ActiveUsers(props: any) {
  const { title, percentage, chart } = props;

  const iconBoxInside = "white";
  const textColor = "gray.700";
  return (
    <Card.Root p="16px">
      <Card.Body>
        <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
          Payment Records
        </Text>
        <Flex direction="column" w="100%">
          {chart}
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default ActiveUsers;
