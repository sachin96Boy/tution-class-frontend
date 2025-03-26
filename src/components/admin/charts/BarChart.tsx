import { Card } from "@chakra-ui/react";
import Chart from "react-apexcharts";
import React from "react";

function BarChart(props: any) {
  const { chartData, chartOptions } = props;
  return (
    <Card.Root
      py="1rem"
      height={{ sm: "200px" }}
      width="100%"
      bg="linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)"
      position="relative"
    >
      <Chart
        options={chartOptions}
        series={chartData}
        type="bar"
        width="100%"
        height="100%"
      />
    </Card.Root>
  );
}

export default BarChart;
