import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { model } from '../model/fetchData';
import { getFullWinnerData } from '../model/winners';
import { IAppState, ICar, IWinner, IwinnersFull, TSortDir, TSortOptions } from '../types/types';
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

  const { currentPage, setPageCount } = appState.winnersPagState;
  const { sortBy, activeSorter } = appState.winnersSort;
  appState.winnersPagState.onChange = () => { setUpdateNeeded(prev => !prev); };
  appState.winnersSort.onChange = () => { setUpdateNeeded(prev => !prev); };

  const getWinners = async (page: number, limit: number, sort: TSortOptions, order: TSortDir) => {
    const data = await model.getWinners(page, limit, sort, order);
    const winners = data.data as IWinner[];
    const count = data.total as string;
    const fullData = await getFullWinnerData(winners);
    
    setPageCount(Math.ceil(+count / winnersPerPage));
    setWinnersFull(fullData);
    setWinnersCount(+count);
  };

  useEffect(() => {
    getWinners(currentPage, winnersPerPage, sortBy, activeSorter);
    setUpdateNeeded(false);
  }, [appState.nav.showWinners]);

  const winnerItems = winnersFull.map((el, i) =>
    <WinnerLine index={i + ((currentPage - 1) * winnersPerPage) + 1} winner={el} key={el.id}></WinnerLine>,
  );


  return (
    <div className="winners">
      <p>Winners ({winnersCount})</p>
      <Paginator {...appState.winnersPagState} ></Paginator>
      <WinnersHeader {...appState.winnersSort} />
      {winnerItems}

    </div>
  );
}
