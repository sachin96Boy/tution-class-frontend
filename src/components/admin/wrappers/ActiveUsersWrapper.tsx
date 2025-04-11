import { IsalesOverview } from "@/features/statistics/statisticsSlice";
import { numbersToMonths } from "@/utils/formatter";
import React from "react";
import ActiveUsers from "../users/ActiveUsers";
import BarChart from "../charts/BarChart";

type IactiveUserWrapper = {
  salesOverviewYearly: Array<IsalesOverview>;
};

function ActiveUsersWrapper(props: IactiveUserWrapper) {
  const { salesOverviewYearly } = props;

  const payment_total_List = salesOverviewYearly.map(
    (item, index) => item.total_amount
  );
  const month_list = salesOverviewYearly.map((item, index) => item.month);
  const month_names_list = numbersToMonths(month_list);
  const paymentChartData = [
    {
      name: "Payments",
      data: payment_total_List,
    },
  ];

  const payChartOptions = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      style: {
        backgroundColor: "red",
        fontSize: "12px",
        fontFamily: undefined,
      },
      onDatasetHover: {
        style: {
          backgroundColor: "red",
          fontSize: "12px",
          fontFamily: undefined,
        },
      },
      theme: "dark",
    },
    xaxis: {
      categories: month_names_list,
      show: false,
      labels: {
        show: false,
        style: {
          colors: "#fff",
          fontSize: "12px",
        },
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: true,
      color: "#fff",
      labels: {
        show: true,
        style: {
          colors: "#fff",
          fontSize: "14px",
        },
      },
    },
    grid: {
      show: false,
    },
    fill: {
      colors: "#fff",
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: "12px",
      },
    },
    responsive: [
      {
        breakpoint: 768,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
            },
          },
        },
      },
    ],
  };
  return (
    <ActiveUsers
      title={"Active Users"}
      percentage={23}
      chart={
        <BarChart chartData={paymentChartData} chartOptions={payChartOptions} />
      }
    />
  );
}

export default ActiveUsersWrapper;
