import React from 'react';
import type {MarketTypes} from "../../types/api-types"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

type Props = {
  chartData:MarketTypes| undefined
}
interface Options {
  responsive: boolean;
  plugins: {
    legend: {
      position: 'top' | 'bottom' | 'left' | 'right' | 'chartArea' | undefined;
    };
    title: {
      display: boolean;
      text: string;
    };
  };
}
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options : Options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '24 Hours',
    },
  },
};

const labels :string[] = ['',''];

export function MultiDataLineChart({chartData}:Props) {
  
    const data = {
      labels,
      datasets: [
        {
          label: 'High',
          data: [chartData?.market_data.high_24h.usd,chartData?.market_data.high_24h.usd],
          borderColor: 'rgb(255, 99, 132)',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
          label: 'Low',
          data:  [chartData?.market_data.low_24h.usd,chartData?.market_data.low_24h.usd],
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    };
  return(
 
    <Line width={"100%"} height={"50vw"} options={options} data={data} />

    )
}
