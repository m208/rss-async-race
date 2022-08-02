import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { IPaginationContext } from '../types/types';


export function Paginator({ currentPage, lastPage, setPage, setPageCount, callback }: IPaginationContext) {

  const prevPage = () => {
    if (currentPage > 1) { 
      setPage(currentPage - 1); 
      callback();
    }
  };

  const nextPage = () => {
    if (currentPage < lastPage) {
      setPage(currentPage + 1);  
      callback();
    }
  };

  const firstPage = () => { setPage(1);  callback(); };
  const endPage = () => { setPage(lastPage);  callback();};


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


