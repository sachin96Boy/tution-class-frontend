import { Badge, Box, Card, Center, Flex, Icon, Stat } from "@chakra-ui/react";
import React from "react";

function MiniStatTile(props: any) {
  const iconTeal = "primary_color";
  const textColor = "gray.700";

  const { title, amount, percentage, icon } = props;

  return (
    <Card.Root minH="83px">
      <Card.Body>
        <Flex flexDirection="row" align="center" justify="center" w="100%">
          <Stat.Root me="auto">
            <Stat.Label
              fontSize="sm"
              color="gray.400"
              fontWeight="bold"
              pb=".1rem"
            >
              {title}
            </Stat.Label>
            <Flex>
              <Stat.ValueText fontSize="lg" color={textColor}>
                {amount}
              </Stat.ValueText>
              <Badge
                alignSelf="flex-end"
                justifySelf="flex-end"
                m="0px"
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight="bold"
                ps="3px"
                fontSize="md"
              >
                {percentage > 0 ? `+${percentage}%` : `${percentage}%`}
              </Badge>
            </Flex>
          </Stat.Root>
          <Center h={"45px"} w={"45px"} bg={iconTeal}>
            <Icon>{icon}</Icon>
          </Center>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default MiniStatTile;
