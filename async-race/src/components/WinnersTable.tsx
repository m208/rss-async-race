import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPagState } from '../context/appState';
import { model } from '../model/fetchData';
import { getFullWinnerData } from '../model/winners';
import { IAppState, ICar, ISortContext, IWinner, IwinnersFull, TSortDir, TSortOptions } from '../types/types';
import { Paginator } from './Paginator';
import { WinnerLine } from './WinnerLine';
import { WinnersHeader } from './WinnersHeader';

interface WinnersProps {
  appState: IAppState
}

const winnersPerPage = 10;

export function WinnersTable({ appState }: WinnersProps) {
  const [winnersCount, setWinnersCount] = useState(0);
  const [updateNeeded, setUpdateNeeded] = useState(true);
  const [winnersFull, setWinnersFull] = useState<Array<IwinnersFull>>([]);

  const [sortBy, setSortBy] = useState<TSortOptions>('Time');
  const [activeSorter, setActiveSorter] = useState<TSortDir>('Asc');
  const [timeSorter, setTimeSorter] = useState<TSortDir>('Asc');
  const [winSorter, setWinSorter] = useState<TSortDir>('Asc');

  const winnersSort: ISortContext = { 
    sortBy, 
    setSortBy, 
    activeSorter, 
    setActiveSorter, 
    timeSorter, 
    setTimeSorter, 
    winSorter, 
    setWinSorter, 
    onChange: () => {setUpdateNeeded(prev => !prev);}, 
  };

  const winnersPagState = createPagState(useState(1), useState(1));
  const { currentPage, setPageCount } = winnersPagState;
  winnersPagState.onChange = () => { setUpdateNeeded(prev => !prev); };


  const getWinners = async (page: number, limit: number, sort: TSortOptions, order: TSortDir) => {
    const data = await model.getWinners(page, limit, sort, order);
    const winners = data.data as IWinner[];
    const count = data.total as string;
    const fullData = await getFullWinnerData(winners);
    
    
    setPageCount(Math.ceil(+count / winnersPerPage));
    setWinnersFull(fullData);
    setWinnersCount(+count);
  };

  const loadData = () =>{
    getWinners(currentPage, winnersPerPage, sortBy, activeSorter);
    setUpdateNeeded(false);
  };

  useEffect(() => {
    loadData();
  }, [appState.nav.showWinners]);

  useEffect(() => {
    if (updateNeeded) loadData();
  }, [updateNeeded]);

  const winnerItems = winnersFull.map((el, i) =>
    <WinnerLine index={i + ((currentPage - 1) * winnersPerPage) + 1} winner={el} key={el.id}></WinnerLine>,
  );


  return (
    <div className="winners">
      <p>Winners ({winnersCount})</p>
      <Paginator {...winnersPagState} ></Paginator>
      <WinnersHeader {...winnersSort} />
      {winnerItems}

    </div>
  );
}
