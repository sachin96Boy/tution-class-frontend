import { Center, Flex, Progress, Text } from "@chakra-ui/react";
import React from "react";

type IcharacterStatisticTile = {
  title: string;
  amount: string;
  icon: React.ReactNode;
  percentage: number;
};

function ChartStatisticTile(props: IcharacterStatisticTile) {
  const { title, amount, icon, percentage } = props;

  const iconTeal = "primary_color";
  const textColor = "gray.700";
  return (
    <Flex direction="column">
      <Flex alignItems="center">
        <Center h={"30px"} w={"30px"} bg={iconTeal} me="6px">
          {icon}
        </Center>
        <Text fontSize="sm" color="gray.400" fontWeight="semibold">
          {title}
        </Text>
      </Flex>
      <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px" my="6px">
        {amount}
      </Text>
      <Progress.Root
        colorScheme="teal"
        borderRadius="12px"
        h="5px"
        value={percentage}
      >
        <Progress.Track>
          <Progress.Range />
        </Progress.Track>
      </Progress.Root>
    </Flex>
  );
}

export default ChartStatisticTile;
