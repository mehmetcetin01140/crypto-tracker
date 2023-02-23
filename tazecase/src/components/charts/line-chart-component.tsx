import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
interface ChartDataTypes{
  chartData : Number[] | number[][]
  labels?:string[]
  title:string

}
export function LineChartComponent({
  chartData,
  labels,
  title,
}:ChartDataTypes) {
  const options = {
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };


  const data = {
    labels,

    datasets: [
      {
        fill: true,
        label: "Price",
        data: chartData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line width={"100%"} height={"50vw"} options={options} data={data} />;
}
