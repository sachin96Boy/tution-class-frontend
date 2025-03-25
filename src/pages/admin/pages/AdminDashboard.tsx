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

function AdminDashboard() {
  const iconBoxInside = "white";

  return (
    <Flex gap={4} flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} gap="24px">
        <MiniStatTile
          title={"Today's Income"}
          amount={"$53,000"}
          percentage={55}
          icon={
            <FaWallet height={"24px"} width={"24px"} color={iconBoxInside} />
          }
        />
        <MiniStatTile
          title={"Today's Students"}
          amount={"2,300"}
          percentage={5}
          icon={
            <FaGlobe height={"24px"} width={"24px"} color={iconBoxInside} />
          }
        />
        <MiniStatTile
          title={"New Students"}
          amount={"+3,020"}
          percentage={-14}
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
          amount={"$173,000"}
          percentage={8}
          icon={
            <FiShoppingCart
              height={"24px"}
              width={"24px"}
              color={iconBoxInside}
            />
          }
        />
      </SimpleGrid>

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
