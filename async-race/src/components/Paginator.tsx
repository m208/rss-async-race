import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { PaginationContext } from '../context/paginationContext';

export function Paginator() {

  const { currentPage, lastPage, setPage, setPageCount } = useContext(PaginationContext);

  const prevPage = () => {
    if (currentPage > 1) setPage(currentPage - 1);

  };

  const nextPage = () => {
    if (currentPage < lastPage) setPage(currentPage + 1);
  };

  const firstPage = () => { setPage(1); };
  const endPage = () => { setPage(lastPage); };


  return (
    <div className="line">
      <button onClick={firstPage}>First</button>
      <button onClick={prevPage}>Prev</button>

      <span>{currentPage}</span>

      <button onClick={nextPage} >Next</button>
      <button onClick={endPage} >Last</button>
    </div>
  );
}


