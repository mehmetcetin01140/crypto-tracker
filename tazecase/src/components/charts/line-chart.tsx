import * as React from "react";
import { LineChart, Line } from "recharts";

type Props = {
  sparklineData: { price: number[] };
};

function LineChartComponent({ sparklineData }: Props) {
 

  const data: { uv: number, pv: number }[] = React.useMemo(
    () =>
      sparklineData.price.map((value, index) => {
        return { uv: index, pv: value };
      }),
    [sparklineData.price]
  );

  const chartStyle: { filter: string } = React.useMemo(
    () => ({
      filter: 'drop-shadow(0px 0px 5px rgba(128, 0, 128, 1))',
    }),
    []
  );

  return (
    <LineChart
      width={200}
      height={100}
      data={data}
      margin={{ top: 45, right: 30, left: 20, bottom: 5 }}
    >
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        strokeWidth={2}
        style={chartStyle}
        dot={false}
      />
    </LineChart>
  );
}

export default React.memo(LineChartComponent);