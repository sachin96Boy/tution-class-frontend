import { IearningOnsalesOverview } from "@/features/statistics/statisticsSlice";
import React from "react";
import SalesOverview from "../sale/SalesOverview";
import LineChart from "../charts/LineChart";

interface TransformedCourseData {
  name: string;
  course_id: string;
  image: string;
  data: number[];
}

interface ResultWithMonths {
  months: string[];
  courses: TransformedCourseData[];
}

type IsalesOverviewProps = {
  earningAmongCourses: Array<IearningOnsalesOverview>;
};

function SalesOverviewWrapper(props: IsalesOverviewProps) {
  const { earningAmongCourses } = props;

  function transformPaymentData(
    rawData: IearningOnsalesOverview[]
  ): ResultWithMonths {
    // Get all unique months present in the data and sort them
    const allMonths = [...new Set(rawData.map((item) => item.month))].sort(
      (a, b) => a - b
    );

    // Month names mapping
    const monthNames: Record<number, string> = {
      1: "Jan",
      2: "Feb",
      3: "Mar",
      4: "Apr",
      5: "May",
      6: "Jun",
      7: "Jul",
      8: "Aug",
      9: "Sep",
      10: "Oct",
      11: "Nov",
      12: "Dec",
    };

    // Group by course
    const coursesMap = rawData.reduce(
      (acc, curr) => {
        const courseTitle = curr.Course.title;

        if (!acc[courseTitle]) {
          acc[courseTitle] = {
            name: courseTitle,
            course_id: curr.course_id,
            image: curr.Course.course_img_path,
            monthData: {} as Record<number, number>,
          };
        }

        // Store the amount by month
        acc[courseTitle].monthData[curr.month] = curr.total_amount;
        return acc;
      },
      {} as Record<
        string,
        {
          name: string;
          course_id: string;
          image: string;
          monthData: Record<number, number>;
        }
      >
    );

    // Convert to array and fill missing months with 0
    const courses = Object.values(coursesMap).map((course) => {
      const data = allMonths.map((month) => course.monthData[month] || 0);
      return {
        name: course.name,
        course_id: course.course_id,
        image: course.image,
        data,
      };
    });

    return {
      months: allMonths.map((month) => monthNames[month]),
      courses,
    };
  }

  const result = transformPaymentData(earningAmongCourses);

  const saleslineChartOptions = {
    chart: {
      height: 350,
      type: "area",
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      theme: "dark",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "string",
      categories: result.months,
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "#c8cfca",
          fontSize: "12px",
        },
      },
    },
    legend: {
      show: false,
    },
    grid: {
      strokeDashArray: 5,
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
        inverseColors: true,
        opacityFrom: 0.8,
        opacityTo: 0,
        stops: [],
      },
      colors: ["#4FD1C5", "#2D3748"],
    },
    colors: ["#4FD1C5", "#2D3748"],
  };
  return (
    <SalesOverview
      title={"Course Sales Overview"}
      percentage={5}
      chart={
        <LineChart
          chartData={result.courses}
          chartOptions={saleslineChartOptions}
        />
      }
    />
  );
}

export default SalesOverviewWrapper;
