import Table from "react-bootstrap/Table";
import LineChartComponent from "../charts/line-chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../utils/use-media-query";
import {
  getAppState,
  setSelectedCoinsForTracking,
} from "../../store/slices/app-slice";
import type { CoinTypes } from "../../types/api-types";

type Props = {
  tableData?: CoinTypes[];
  isLineChartVisible: boolean;
};
const tableHeads: string[] = [
  "",
  "Name",
  "Price",
  "High",
  "Low",
  "Volume",
  "7 Days",
  "Track",
];

export default function CoinListTable({
  tableData,
  isLineChartVisible,
}: Props) {
  const dispatch = useDispatch();
  const { selectedCoinsForTracking } = useSelector(getAppState);
  const isBreakPoint: boolean = useMediaQuery("(max-width:992px)");

  const navigate = useNavigate();

  const setSelectedCoin = (coin: string) => {
    const isThisElementInTheArray: string | undefined =
      selectedCoinsForTracking.find((selected: string) => selected === coin);
    if (!isThisElementInTheArray) {
      dispatch(
        setSelectedCoinsForTracking([...selectedCoinsForTracking, coin])
      );
    } else {
      const deleteItem: string[] = selectedCoinsForTracking.filter(
        (filteredCoin: string) => !filteredCoin.includes(coin)
      );
      dispatch(setSelectedCoinsForTracking(deleteItem));
    }
  };
  const manipulateHeadersForDifferentTables = (): string[] => {
    if (isLineChartVisible) {
      return tableHeads;
    } else return tableHeads.filter((head) => head !== "7 Days");
  };

  return (
    <div className="coin-list">
      <Table responsive="sm">
        <thead>
          {!isBreakPoint && (
            <tr className="table-heads">
              {manipulateHeadersForDifferentTables().map((head: string) => (
                <th key={`${head}_key`}>{head}</th>
              ))}
            </tr>
          )}
        </thead>
        <tbody>
          {tableData?.map((data: CoinTypes) => (
            <tr
              key={data.id}
              onClick={() => navigate(`/coin/${data.id}`)}
              style={{ cursor: "pointer" }}
            >
              {isBreakPoint && (
                <td className="coin-list-title">
                  <span>{data.name}</span>
                </td>
              )}
              <td>
                <img
                  src={data.image.replace("/large/", "/small/")}
                  alt={data.name}
                  style={{ width: 50, height: 50 }}
                />
              </td>
              {!isBreakPoint && (
                <td>
                  <span>{data.name}</span>
                </td>
              )}
              {isBreakPoint && (
                <td>
                  <span>Price</span>
                </td>
              )}

              <td>
                <span className="coin-list-price">
                  {data.current_price ? `$ ${data.current_price}` : "-"}
                </span>
              </td>
              {isBreakPoint && (
                <td>
                  <span>High</span>
                </td>
              )}
              <td>
                <span className="coin-list-high">
                  {data.high_24h ? `$ ${data.high_24h}` : "-"}
                </span>
              </td>
              {isBreakPoint && (
                <td>
                  <span>Low</span>
                </td>
              )}
              <td>
                <span className="coin-list-low">
                  {data.low_24h ? `$ ${data.low_24h}` : "-"}
                </span>
              </td>
              {isBreakPoint && (
                <td>
                  <span>Volume</span>
                </td>
              )}
              <td>
                <span className="coin-list-volume">
                  {data.total_volume ? `$ ${data.total_volume}` : "-"}
                </span>
              </td>
              {isBreakPoint && isLineChartVisible && (
                <td>
                  <span>7 Days</span>
                </td>
              )}
              {data.sparkline_in_7d.price.length > 0 ? (
                isLineChartVisible && (
                  <td>
                    <LineChartComponent sparklineData={data.sparkline_in_7d} />
                  </td>
                )
              ) : isLineChartVisible ? (
                <td>
                  <span>-</span>
                </td>
              ) : (
                ""
              )}
              {isBreakPoint && (
                <td>
                  <span>Track</span>
                </td>
              )}
              <td>
                {" "}
                <FontAwesomeIcon
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedCoin(data.id);
                  }}
                  fontSize={isBreakPoint ? 60 : 25}
                  color={
                    selectedCoinsForTracking.find((coin) => coin === data.id)
                      ? "#03C988"
                      : "#F0BA0A"
                  }
                  icon={faStar}
                  style={{ cursor: "pointer" }}
                  className="star-icon"
                />{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
