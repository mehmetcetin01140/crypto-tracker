import { useQuery } from "react-query";
import axios from "axios";
import TopCoinsCard from "./top-coins-card";
import { fetchTop10Coins } from "../../apicalls/api";
export default function TopCoins() {
  const { isLoading, error, data } = useQuery("top10Coins", fetchTop10Coins);

  return (
    <div className="top-coins">
      {data?.map((topCoin: any, i: number) => (
        <TopCoinsCard topCoinsCardData={topCoin} key={i} />
      ))}
    </div>
  );
}
