import OverlayBanner from "@/components/admin/banner/OverlayBanner";

import {
  Box,
  Button,
  Flex,
  Grid,
  SimpleGrid,
  Skeleton,
  Wrap,
} from "@chakra-ui/react";

import bgImg from "@/assets/signin/class-2.webp";
import { NavLink } from "react-router-dom";
import StaticTiles from "@/components/admin/dashboard/StaticTiles";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { useEffect } from "react";
import {
  getEarningAmongCourses,
  getSalesOverviewOYear,
} from "@/features/statistics/statisticsAction";
import { numbersToMonths } from "@/utils/formatter";
import ActiveUsersWrapper from "@/components/admin/wrappers/ActiveUsersWrapper";
import SalesOverviewWrapper from "@/components/admin/wrappers/SalesOverviewWrapper";

function AdminDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const { loading, salesOverviewYearly, earningAmongCourses } = useSelector(
    (state: RootState) => state.stat
  );

  useEffect(() => {
    dispatch(getSalesOverviewOYear(""));
    dispatch(getEarningAmongCourses(""));
  }, [dispatch]);

  return (
    <Flex gap={4} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <StaticTiles />

      <Grid
        templateColumns={{ md: "1fr", lg: "1.8fr 1.2fr" }}
        templateRows={{ md: "1fr auto", lg: "1fr" }}
        my="26px"
        gap="24px"
      >
        <OverlayBanner
          backgroundImage={bgImg}
          title={"Welcome Back"}
          description={"Manage your work and Get insights through our Dashboard"}
        />
        <Wrap>
          <NavLink to={"/admin/advertisments"}>
            <Button colorPalette={"blue"} size={"2xl"}>
              Advertisments
            </Button>
          </NavLink>
          <NavLink to={"/admin/common"}>
            <Button colorPalette={"blue"} size={"2xl"}>
              Common
            </Button>
          </NavLink>
        </Wrap>
      </Grid>

      <Grid
        templateColumns={{ sm: "1fr", lg: "1.3fr 1.7fr" }}
        templateRows={{ sm: "repeat(2, 1fr)", lg: "1fr" }}
        gap="24px"
        mb={{ lg: "26px" }}
      >
        {loading ? (
          <Skeleton height="200px" />
        ) : (
          <ActiveUsersWrapper salesOverviewYearly={salesOverviewYearly} />
        )}
        {loading ? (
          <Skeleton height="200px" />
        ) : (
          <SalesOverviewWrapper earningAmongCourses={earningAmongCourses} />
        )}
      </Grid>
    </Flex>
  );
}

export default AdminDashboard;
