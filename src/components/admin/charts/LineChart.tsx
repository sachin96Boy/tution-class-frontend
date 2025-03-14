import React from 'react'
import ReactApexChart from 'react-apexcharts'

function LineChart(props: any) {
    const { chartData , chartOptions} = props;
  return (
    <ReactApexChart
    options={chartOptions}
    series={chartData}
    type="area"
    width="100%"
    height="100%"
  />
  )
}

export default LineChart