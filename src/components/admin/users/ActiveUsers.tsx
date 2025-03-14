import { Card, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import ChartStatisticTile from "../stats/ChartStatisticTile";
import { FaGlobe, FaWallet } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdDocument } from "react-icons/io";

function ActiveUsers(props: any) {
  const { title, percentage, chart } = props;

  const iconBoxInside = "white";
  const textColor = "gray.700";
  return (
    <Card.Root p="16px">
      <Card.Body>
        <Flex direction="column" w="100%">
          {chart}
          <Flex direction="column" mt="24px" mb="36px" alignSelf="flex-start">
            <Text fontSize="lg" color={textColor} fontWeight="bold" mb="6px">
              {title}
            </Text>
            <Text fontSize="md" fontWeight="medium" color="gray.400">
              <Text
                as="span"
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight="bold"
              >
                {percentage > 0 ? `+${percentage}%` : `-${percentage}%`}
              </Text>{" "}
              than last week
            </Text>
          </Flex>
          <SimpleGrid gap={{ sm: "12px" }} columns={4}>
            <ChartStatisticTile
              title={"Users"}
              amount={"32,984"}
              percentage={20}
              icon={
                <FaWallet
                  height={"15px"}
                  width={"15px"}
                  color={iconBoxInside}
                />
              }
            />
            <ChartStatisticTile
              title={"Clicks"}
              amount={"2.42m"}
              percentage={80}
              icon={
                <FaGlobe height={"15px"} width={"15px"} color={iconBoxInside} />
              }
            />
            <ChartStatisticTile
              title={"Sales"}
              amount={"2,400$"}
              percentage={30}
              icon={
                <FiShoppingCart
                  height={"15px"}
                  width={"15px"}
                  color={iconBoxInside}
                />
              }
            />
            <ChartStatisticTile
              title={"Items"}
              amount={"320"}
              percentage={40}
              icon={
                <IoMdDocument
                  height={"15px"}
                  width={"15px"}
                  color={iconBoxInside}
                />
              }
            />
          </SimpleGrid>
        </Flex>
      </Card.Body>
    </Card.Root>
  );
}

export default ActiveUsers;
