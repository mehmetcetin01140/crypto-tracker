import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Row, Col } from "react-bootstrap";
import Transition from "../animations/transition";
import parse from "html-react-parser";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { LineChartComponent } from "../components/charts/line-chart-component";
import { MultiDataLineChart } from "../components/charts/multi-data-line-chart";
import { fetchCoinDetails } from "../apicalls/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function CoinDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id?: string }>();

  const { data } = useQuery(["coins", id], () => fetchCoinDetails(id));
  const { coins, dataMonthly, dataYearly } = data ?? {};

  const chartData7d: number[] = coins?.market_data.sparkline_7d.price || [];
  const chartData30d: number[][] = dataMonthly?.prices || [];
  const chartData1y: number[][] = dataYearly?.prices || [];
  
  const formattedLabels7d = (): string[] => {
    const dates: string[] = [];

    for (let i = 6; i >= 0; i--) {
      const date: Date = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
      dates.push(date.toLocaleDateString());
    }
    return dates;
  };

  const formattedLabels30d: string[] | undefined = dataMonthly?.prices.map(
    (price: number[]) => {
      const date: Date = new Date(price[0]);
      return date.toLocaleDateString();
    }
  );

  const formattedLabels1y: string[] = chartData1y?.map(
    (price: number[]): string => {
      const date: Date = new Date(price[0]);
      return date.toLocaleDateString();
    }
  );

  const handleBack = () => navigate(-1);

  return (
    <HelmetProvider>
      <Helmet>
        <title>{coins?.name}</title>
        <meta name="description" content={coins?.name} />
      </Helmet>
      <Transition>
        <div className="coin-details">
          <div className="coin-details-header">
            <img src={coins?.image.small}></img>
            <h4>{coins?.name}</h4>
            <div className="coin-details-go-back">
              <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack} />
            </div>
          </div>
          <Row>
            <Col xl={8} lg={12}>
              <h4>Description</h4>
              <p>{parse(coins?.description.en || "Loading...")}</p>
            </Col>
            <Col xl={4} lg={12} style={{ marginBottom: 15 }}>
              <div className="coin-details-info-list">
                <div className="coin-details-info-list-title">
                  <h5>{coins?.symbol.toUpperCase()} Price Statistics </h5>
                </div>
                <ul>
                  <li>
                    <span>Price</span>
                    <span>{coins?.market_data.current_price.usd} $</span>
                  </li>
                  <hr />
                  <li>
                    <span>High</span>
                    <span>{coins?.market_data.high_24h.usd} $</span>
                  </li>
                  <hr />
                  <li>
                    <span>Low</span>
                    <span>{coins?.market_data.low_24h.usd} $</span>
                  </li>
                  <hr />
                  <li>
                    <span>Volume</span>
                    <span>{coins?.market_data.total_volume.usd} $</span>
                  </li>
                  <hr />
                  <li>
                    <span>Rank</span>
                    <span>{coins?.coingecko_rank}</span>
                  </li>
                  <hr />
                  <li>
                    <span>ATH</span>
                    <span>{coins?.market_data.ath.usd} $</span>
                  </li>
                  <hr />
                  <li>
                    <span>ATL</span>
                    <span>{coins?.market_data.atl.usd} $</span>
                  </li>
                  <hr />
                </ul>
              </div>
            </Col>

            <Col md={6}>
              <span>24 Hours</span>
              <MultiDataLineChart chartData={coins} />
            </Col>
            <Col md={6}>
              <span>7 Days</span>
              <LineChartComponent
                chartData={chartData7d}
                labels={formattedLabels7d()}
                title={"7 Days"}
              />
            </Col>

            <Col md={6} style={{ marginTop: 30 }}>
              <span>30 Days</span>
              <LineChartComponent
                chartData={chartData30d}
                labels={formattedLabels30d}
                title={"30 Days"}
              />
            </Col>
            <Col md={6} style={{ marginTop: 30 }}>
              <span>1 Year</span>
              <LineChartComponent
                chartData={chartData1y}
                labels={formattedLabels1y}
                title={"1 Year"}
              />
            </Col>
          </Row>
        </div>
      </Transition>
    </HelmetProvider>
  );
}
