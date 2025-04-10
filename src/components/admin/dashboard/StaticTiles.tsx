import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import MiniStatTile from "../stats/MiniStatTile";
import { FaGlobe, FaWallet } from "react-icons/fa";
import { IoMdDocument } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getDashboardStatistics } from "@/features/statistics/statisticsAction";

function StaticTiles() {
  const iconBoxInside = "white";

  const dispatch = useDispatch<AppDispatch>();

  const { loading, dashboard } = useSelector((state: RootState) => state.stat);

  useEffect(() => {
    dispatch(getDashboardStatistics(""));
  }, []);



  const SkelitonGrid = () => {
    return (
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} gap="24px">
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
        <Skeleton height="100px" />
      </SimpleGrid>
    );
  };

  return (
    <>
      {loading ? (
        <SkelitonGrid />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} gap="24px">
          <MiniStatTile
            title={"Today's Income"}
            amount={`RS ${dashboard?.todayIncome}`}
            percentage={parseInt(dashboard?.todayIncomePresentage ?? '0')}
            icon={
              <FaWallet height={"24px"} width={"24px"} color={iconBoxInside} />
            }
          />
          <MiniStatTile
            title={"Today's Students"}
            amount={dashboard?.newStudents ?? '0'}
            percentage={parseInt(dashboard?.attandancePresentage ?? '0')}
            icon={
              <FaGlobe height={"24px"} width={"24px"} color={iconBoxInside} />
            }
          />
          <MiniStatTile
            title={"New Students"}
            amount={dashboard?.newStudents ?? '0'}
            percentage={parseInt(dashboard?.newStudentPresentage ?? '0')}
            icon={
              <IoMdDocument
                height={"24px"}
                width={"24px"}
                color={iconBoxInside}
              />
            }
          />
          <MiniStatTile
            title={"Total Sales"}
            amount={`Rs ${dashboard?.todaySales}`}
            percentage={parseInt(dashboard?.todaySalesPrecentage ?? '0')}
            icon={
              <FiShoppingCart
                height={"24px"}
                width={"24px"}
                color={iconBoxInside}
              />
            }
          />
        </SimpleGrid>
      )}
    </>
  );
}

export default StaticTiles;
