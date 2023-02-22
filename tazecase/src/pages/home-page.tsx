import { useEffect, useState,Suspense } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import TopCoins from "../components/topcoins/top-coins";
import CoinListTable from "../components/table/coin-list-table";
import PaginationComponent from "../components/pagination";
import ModalComponent from "../components/modal";
import Transition from "../animations/transition";
import { useSelector, useDispatch } from "react-redux";
import { setCoinData, getAppState } from "../store/slices/app-slice";
import SearchInput from "../components/search-input";
import { useParams } from "react-router-dom";
import { fetchCoins } from "../apicalls/api";
import type {CoinTypes } from "../types/api-types";
import { Helmet, HelmetProvider } from "react-helmet-async";
type Props = {};

export default function HomePage({}: Props) {
  const { coinData } = useSelector(getAppState);
  const { id } = useParams<{ id: string | undefined }>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParam, setSearchParam] = useState<string>("");
  const dispatch = useDispatch();
  const { isLoading, isError, error, data, isFetching, isPreviousData } =
    useQuery(["coins", currentPage], () => fetchCoins(currentPage), {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    });
  useEffect(() => {
    setCurrentPage(id ? Number(id) : 1);
  }, [id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  useEffect(() => {
    if (coinData && data) {
      const existingIds = coinData.map((coin: any) => coin.id);
      const newCoins = data.filter(
        (coin: any) => !existingIds.includes(coin.id)
      );
      if (newCoins.length > 0) {
        dispatch(setCoinData([...coinData, ...newCoins]));
      }
    }
  }, [data]);
  const filterWithSearchParam: CoinTypes[] | undefined = data?.filter(
    (name: { id: string }) =>
      name.id.toLowerCase().includes(searchParam.toLowerCase())
  );

  return (
    <> 
      <HelmetProvider>
        <Helmet>
          <title>Taze</title>
          <meta name="description" content="taze case" />
        </Helmet>
    <Transition>
      <TopCoins />
      <SearchInput searchParam={searchParam} setSearchParam={setSearchParam} />
      {
        filterWithSearchParam?.length ? (

          <CoinListTable
            tableData={filterWithSearchParam}
            isLineChartVisible={true}
          />
        ):(
          <h5>No coin with this name was found.</h5>
        )
      }
      {filterWithSearchParam?.length ? (
          <PaginationComponent
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ):""}
    </Transition>
    </HelmetProvider>
    </>
  );
}
