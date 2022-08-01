import React, { createContext, useContext, useState } from 'react';
import { GarageContext } from './garageContext';


interface IPaginationContext {
  currentPage: number
  lastPage: number
  setPage: (num: number) => void
  setPageCount: (num: number) => void

}

export const PaginationContext = createContext<IPaginationContext>({
  currentPage: 1,
  lastPage: 1,
  setPage: (num) => { },
  setPageCount: (num) => { },
});

export const PaginationState = ({ children }: { children: React.ReactNode }) => {
  const { updateNeeded } = useContext(GarageContext);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);


  const setPage = (num: number) => {

    if (num > 0 && num <= lastPage) {
      setCurrentPage(num);
      updateNeeded();
    }

  };

  const setPageCount = (num: number) => {
    setLastPage(num);
  };

  return (
    <PaginationContext.Provider value={{ currentPage, lastPage, setPage, setPageCount }}>
      {children}
    </PaginationContext.Provider>
  );
};