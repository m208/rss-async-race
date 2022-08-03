import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { IPaginationContext } from '../types/types';


export function Paginator({ currentPage, lastPage, setPage, setPageCount, onChange }: IPaginationContext) {

  const prevPage = () => {
    if (currentPage > 1) { 
      setPage(currentPage - 1); 
      onChange();
    }
  };

  const nextPage = () => {
    if (currentPage < lastPage) {
      setPage(currentPage + 1);  
      onChange();
    }
  };

  const firstPage = () => { setPage(1);  onChange(); };
  const endPage = () => { setPage(lastPage);  onChange();};


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


