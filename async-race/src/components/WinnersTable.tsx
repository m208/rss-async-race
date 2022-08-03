import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { model } from '../model/fetchData';
import { getFullWinnerData } from '../model/winners';
import { IAppState, ICar, IWinner, IwinnersFull } from '../types/types';
import { Paginator } from './Paginator';
import { WinnerLine } from './WinnerLine';
import { WinnersHeader } from './WinnersHeader';

interface WinnersProps {
  appState: IAppState
}

const winnersPerPage = 2;

export function WinnersTable({ appState }: WinnersProps) {
  const [updateNeeded, setUpdateNeeded] = useState(true);
  const [winnersFull, setWinnersFull] = useState<Array<IwinnersFull>>([]);

  const { currentPage, lastPage, setPage, setPageCount } = appState.winnersPagState;
  appState.winnersPagState.onChange = ()=>{
    setUpdateNeeded(prev=>!prev);
  };

  const getWinners = async (page: number, limit: number) => {
    const data = await model.getWinners(page, limit);
    const winners = data.data as IWinner[];
    const count = data.total as string; 
    const fullData = await getFullWinnerData(winners);

    setPageCount(+count / winnersPerPage);
    setWinnersFull(fullData);
  };

  useEffect( () => {
    if (updateNeeded) {
      getWinners(currentPage, winnersPerPage);
      setUpdateNeeded(false);
    }
    
  });

  const winnerItems = winnersFull.map((el, i) =>
    <WinnerLine index={i} winner={el} key={el.id}></WinnerLine>,
  );

  return (
    <div className="winners">
      <Paginator {...appState.winnersPagState} ></Paginator>
        <WinnersHeader/>
        {winnerItems}
    </div>
  );
}