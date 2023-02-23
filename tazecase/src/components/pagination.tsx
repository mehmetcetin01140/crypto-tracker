import React from "react";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

type PaginationComponentProps = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const totalPages = 615;

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    navigate(`/${pageNumber}`);
  };

  const getPaginationItems = () => {
    const paginationItems = [];
    const maxVisiblePages = 5;

    // If there are less pages than `maxVisiblePages`, show all pages
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            active={i === currentPage}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </Pagination.Item>
        );
      }
      return paginationItems;
    }

    // Determine the range of pages to show
    let rangeStart = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let rangeEnd = rangeStart + maxVisiblePages - 1;

    if (rangeEnd > totalPages) {
      rangeEnd = totalPages;
      rangeStart = rangeEnd - maxVisiblePages + 1;
    }

    // Show the first page
    paginationItems.push(
      <Pagination.Item
        key={1}
        active={1 === currentPage}
        onClick={() => handlePageChange(1)}
      >
        1
      </Pagination.Item>
    );

    // Show ellipsis if necessary
    if (rangeStart > 2) {
      paginationItems.push(<Pagination.Ellipsis disabled key="start-ellipsis" />);
    }

    // Show the range of pages
    for (let i = rangeStart + 1; i < rangeEnd; i++) {
      paginationItems.push(
        <Pagination.Item
          key={i+"key"}
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    // Show ellipsis if necessary
    if (rangeEnd < totalPages - 1) {
      paginationItems.push(<Pagination.Ellipsis disabled key="end-ellipsis" />);
    }

    // Show the last page
    paginationItems.push(
      <Pagination.Item
        key={totalPages}
        active={totalPages === currentPage}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </Pagination.Item>
    );

    return paginationItems;
  };

  return (
    <div className="pagination-component">
      <Pagination>{getPaginationItems()}</Pagination>
    </div>
  );
};

export default PaginationComponent;