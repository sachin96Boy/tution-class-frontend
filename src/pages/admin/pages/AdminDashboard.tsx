import OverlayBanner from "@/components/admin/banner/OverlayBanner";
import BarChart from "@/components/admin/charts/BarChart";
import LineChart from "@/components/admin/charts/LineChart";
import SalesOverview from "@/components/admin/sale/SalesOverview";
import MiniStatTile from "@/components/admin/stats/MiniStatTile";
import ActiveUsers from "@/components/admin/users/ActiveUsers";
import {
  barChartData,
  barChartOptions,
  lineChartData,
  lineChartOptions,
} from "@/utils/variables/chart";
import { Box, Button, Flex, Grid, SimpleGrid, Wrap } from "@chakra-ui/react";

import { FaGlobe, FaWallet } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdDocument } from "react-icons/io";

import bgImg from "@/assets/signin/class-2.webp";
import { NavLink } from "react-router-dom";
import StaticTiles from "@/components/admin/dashboard/StaticTiles";

function AdminDashboard() {
  const iconBoxInside = "white";

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
          title={"Main Advertisment Banner"}
          description={"Update Main Advertisment on Student Dashboard"}
        />
        <Wrap>
          <NavLink to={"/admin/advertisments"}>
            <Button colorPalette={"blue"} size={"2xl"}>
              Advertisments
            </Button>
          </NavLink>
          <Button colorPalette={"blue"} size={"2xl"}>
            Company
          </Button>
          <Button colorPalette={"blue"} size={"2xl"}>
            Statistics
          </Button>
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
        <ActiveUsers
          title={"Active Users"}
          percentage={23}
          chart={
            <BarChart chartData={barChartData} chartOptions={barChartOptions} />
          }
        />
        <SalesOverview
          title={"Sales Overview"}
          percentage={5}
          chart={
            <LineChart
              chartData={lineChartData}
              chartOptions={lineChartOptions}
            />
          }
        />
      </Grid>
    </Flex>
  );
}

export default AdminDashboard;
