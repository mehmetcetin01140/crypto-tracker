import { useQuery } from "react-query";
import TopCoinsCard from "./top-coins-card";
import { fetchTop10Coins } from "../../apicalls/api";
import type { CoinTypes} from "../../types/api-types";
export default function TopCoins() {
  const { data } = useQuery("top10Coins", fetchTop10Coins);

  return (
    <div className="top-coins">
      {data?.map((topCoin: CoinTypes, i: number) => (
        <TopCoinsCard topCoinsCardData={topCoin} key={i} />
      ))}
    </div>
  );
}
