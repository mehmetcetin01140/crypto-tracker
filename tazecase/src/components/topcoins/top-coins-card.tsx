import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import type { CoinTypes } from "../../types/api-types";
type Props = {
  topCoinsCardData: CoinTypes;
};

export default function TopCoinsCard({ topCoinsCardData }: Props) {
  const navigate = useNavigate();
  return (
    <div
      className="top-coins-card"
      onClick={() => navigate(`/coin/${topCoinsCardData.id}`)}
    >
      <div className="top-coins-name">
        <h4 className="border-effect">{topCoinsCardData.name}</h4>
      </div>
      <div className="top-coins-logo">
        <img src={topCoinsCardData.image} alt={topCoinsCardData.name} />
      </div>
      <div className="top-coins-price ">{topCoinsCardData.current_price} $</div>
      <div className="top-coins-24-hours">
        <span>High: {topCoinsCardData.high_24h}$</span>{" "}
        <FontAwesomeIcon
          icon={faArrowUp}
          color="green"
          size="lg"
          className="my-auto"
        />
        <span>Low: {topCoinsCardData.low_24h}$</span>{" "}
        <FontAwesomeIcon
          icon={faArrowDown}
          color="red"
          size="lg"
          className="my-auto"
        />
      </div>
    </div>
  );
}
