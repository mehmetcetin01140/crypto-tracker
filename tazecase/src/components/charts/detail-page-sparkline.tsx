import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: any;
};

export default function DetailPageSparkline({ data }: Props) {
  const manipulateData = () => {
    if (data?.market_data?.sparkline_7d?.price) {
      const manipulated = data.market_data.sparkline_7d.price.map(
        (el: string, i: number) => {
          return {
            name: i,
            price: el,
          };
        }
      );
      return manipulated;
    }
    return [];
  };
 
  const gradientOffset = () => {
    const dataMax = Math.max(...manipulateData().map((i: any) => i.price));
    const dataMin = Math.min(...manipulateData().map((i: any) => i.price));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  const lineColor = "#007bff";
  const areaColor = "url(#colorUv)";

  const gradientDef = (
    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
      <stop offset={off} stopColor={lineColor} stopOpacity={0.7} />
      <stop offset={off} stopColor={lineColor} stopOpacity={0} />
    </linearGradient>
  );

  return (
    <>
      <ResponsiveContainer width={"100%"} height={400}>
        <LineChart width={500} height={300} data={manipulateData()}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {gradientDef}
          <Line
            type="monotone"
            dataKey="price"
            dot={false}
            stroke={lineColor}
            strokeWidth={2}
            fill={areaColor}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
