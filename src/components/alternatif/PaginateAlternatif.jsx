"use client";

import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import AlternatifList from "./AlternatifList";

const PaginateAlternatif = ({ itemsPerPage, alternatif }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = alternatif.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(alternatif.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % alternatif.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <AlternatifList currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        containerClassName="flex space-x-2 justify-center w-full mt-2 h-full items-center"
        pageClassName="font-medium border border-px px-2"
      />
    </>
  );
};

export default PaginateAlternatif;
