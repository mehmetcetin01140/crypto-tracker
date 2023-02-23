import axios from "axios";
import type {
  CoinTypes,
  MarketTypes,
  MonthlyAndYearlyTypes,
  NewsTypes,
} from "../types/api-types";

interface CoinDetails {
  coins: MarketTypes;
  dataMonthly: MonthlyAndYearlyTypes;
  dataYearly: MonthlyAndYearlyTypes;
}
interface Top10CoinsParams {
  vs_currency: string;
  per_page: number;
  page: number;
  sparkline: boolean;
  price_change_percentage: string;
}
interface FetchCoinsParams {
  vs_currency: string;
  order: string;
  per_page: number;
  page: number;
  sparkline: boolean;
}

type CoinTypesData = {
  data: CoinTypes[];
};

export const fetchNews = async (index: string | undefined) => {
  const res = await axios.get(
    `https://crypto-news-server-express-ir7h.vercel.app/${
      index == "" ? "getnews" : `getnews?index=${index}`
    }`
  );

  return res.data;
};

export const fetchTop10Coins = async (): Promise<CoinTypes[]> => {
  const response = await axios.get<Top10CoinsParams, CoinTypesData>(
    "https://api.coingecko.com/api/v3/coins/markets",
    {
      params: {
        vs_currency: "usd",
        per_page: 10,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    }
  );

  return response.data;
};

export const fetchCoins = async (page: number): Promise<CoinTypes[]> => {
  const res = await axios.get<FetchCoinsParams, CoinTypesData>(
    `https://api.coingecko.com/api/v3/coins/markets`,
    {
      params: {
        vs_currency: "usd",
        order: "market_cap_desc",
        per_page: 20,
        page: page,
        sparkline: true,
      },
    }
  );

  return res.data;
};

export const fetchCoinDetails = async (id?: string): Promise<CoinDetails> => {
  const params = {
    tickers: false,
    market_data: true,
    sparkline: true,
  };

  const [coins, dataMonthly, dataYearly] = await Promise.all([
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`, { params })
      .then((res) => res.data),
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: { vs_currency: "usd", days: 30 },
      })
      .then((res) => res.data),
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
        params: { vs_currency: "usd", days: 365 },
      })
      .then((res) => res.data),
  ]);

  return { coins, dataMonthly, dataYearly };
};
