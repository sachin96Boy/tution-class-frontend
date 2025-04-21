import { Box, SimpleGrid, Skeleton } from "@chakra-ui/react";
import React, { useEffect } from "react";
import MiniStatTile from "../stats/MiniStatTile";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { getDashboardStatistics } from "@/features/statistics/statisticsAction";

import { FileUser, Globe, ShoppingCart, Wallet } from "lucide-react";

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

  let LKRS = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
  });

  return (
    <>
      {loading ? (
        <SkelitonGrid />
      ) : (
        <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} gap="24px">
          <MiniStatTile
            title={"Today's Income"}
            amount={
              dashboard?.todayIncome != null
                ? LKRS.format(Number(dashboard?.todayIncome))
                : LKRS.format(0)
            }
            percentage={parseInt(dashboard?.todayIncomePresentage ?? "0")}
            icon={
              <Wallet height={"24px"} width={"24px"} color={iconBoxInside} />
            }
          />
          <MiniStatTile
            title={"Today's Students"}
            amount={dashboard?.newStudents ?? "0"}
            percentage={parseInt(dashboard?.attandancePresentage ?? "0")}
            icon={
              <Globe height={"24px"} width={"24px"} color={iconBoxInside} />
            }
          />
          <MiniStatTile
            title={"New Students"}
            amount={dashboard?.newStudents ?? "0"}
            percentage={parseInt(dashboard?.newStudentPresentage ?? "0")}
            icon={
              <FileUser height={"24px"} width={"24px"} color={iconBoxInside} />
            }
          />
          <MiniStatTile
            title={"Total Sales"}
            amount={LKRS.format(Number(dashboard?.todaySales))}
            percentage={parseInt(dashboard?.todaySalesPrecentage ?? "0")}
            icon={
              <ShoppingCart
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
