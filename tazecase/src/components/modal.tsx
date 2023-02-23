import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CoinListTable from "./table/coin-list-table";
import { useSelector, useDispatch } from "react-redux";
import { getAppState, setModalShow } from "../store/slices/app-slice";
import SearchInput from "./search-input";
import { useLocation } from "react-router-dom";
import type { CoinTypes } from "../types/api-types";

type ModalComponentProps = {
  modalData: CoinTypes[];
};

type ModalContentProps = {
  filteredData: CoinTypes[];
};

function ModalContent({ filteredData }: ModalContentProps) {
  const [searchParam, setSearchParam] = useState<string>("");
  const filteredDataWithSearchParam: CoinTypes[] = filteredData?.filter(
    (name: { id: string }) =>
      name.id.toLowerCase().includes(searchParam.toLowerCase())
  );

  return (
    <Modal.Body style={{ overflowY: "scroll", height: 400 }}>
      <SearchInput searchParam={searchParam} setSearchParam={setSearchParam} />
      {(filteredData?.length > 0 && !searchParam) ||
      filteredDataWithSearchParam.length > 0 ? (
        <CoinListTable
          tableData={filteredDataWithSearchParam}
          isLineChartVisible={false}
        />
      ) : filteredDataWithSearchParam && searchParam.length > 0 ? (
        <h5>No coin with this name was found.</h5>
      ) : (
        <h5>You are not tracking any cryptocurrencies yet.</h5>
      )}
    </Modal.Body>
  );
}

const MemoizedModalContent = React.memo(ModalContent);

export default function ModalComponent({ modalData }: ModalComponentProps) {
  const { selectedCoinsForTracking, modalShow } = useSelector(getAppState);
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState<CoinTypes[]>(() =>
    modalData?.filter((filteredItem: CoinTypes) =>
      selectedCoinsForTracking.includes(filteredItem.id)
    )
  );
  const location = useLocation();
  const handleClose = () => dispatch(setModalShow(false));

  useEffect(() => {
    handleClose();
  }, [location]);


  useEffect(() => {
    setFilteredData(
      modalData?.filter((filteredItem: CoinTypes) =>
        selectedCoinsForTracking.includes(filteredItem.id)
      )
    );
  }, [selectedCoinsForTracking, modalData]);


  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Tracking Coins
        </Modal.Title>
      </Modal.Header>
      <MemoizedModalContent filteredData={filteredData} />
      <Modal.Footer>
        <Button onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
