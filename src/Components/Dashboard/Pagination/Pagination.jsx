import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./Pagination.css";

export default function PaginatedItems({ itemsPerPage, setPage, total }) {
  const pageCount = total / itemsPerPage;

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<"
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex align-items-center justify-content-end"
        pageLinkClassName="pagination-tag-anchor mx-2 text-secondary rounded-circle"
        activeLinkClassName="bg-primary text-white"
        previousLinkClassName="previousClassNamea"
        nextLinkClassName="previousClassNamea"
      />
    </>
  );
}
