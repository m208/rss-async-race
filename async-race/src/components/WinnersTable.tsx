import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { model } from '../model/fetchData';
import { getFullWinnerData } from '../model/winners';
import { ICar, IWinner, IwinnersFull } from '../types/types';
import { Paginator } from './Paginator';
import { WinnerLine } from './WinnerLine';
import { WinnersHeader } from './WinnersHeader';


export function WinnersTable() {
  const [updateNeeded, setUpdateNeeded] = useState(true);
  const [winnersFull, setWinnersFull] = useState<Array<IwinnersFull>>([]);

  const getWinners = async () => {
    const data = await model.getWinners();
    const fullData = await getFullWinnerData(data);

    setWinnersFull(fullData);
    console.log(fullData);
    
  };

  useEffect( () => {
    if (updateNeeded) {
      getWinners();
      setUpdateNeeded(false);
    }
    
  });

  const car = {
    id: 0,
    name: 'name',
    color: 'red',
  };

  const winnerItems = winnersFull.map((el, i) =>
    <WinnerLine index={i} winner={el} key={el.id}></WinnerLine>,
  );

  return (
    <div className="winners">
      {/* <Paginator {...paginationContext} ></Paginator> */}
        <WinnersHeader/>
        {winnerItems}
    </div>
  );
}