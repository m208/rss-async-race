import React, { useState } from 'react';
import { ISortContext, TSortDir, TSortOptions } from '../types/types';


const getSymbol = (dir: TSortDir) => dir === 'Asc' ? '↑' : '↓';

export function WinnersHeader(  sortState  : ISortContext) {

  const { sortBy, setSortBy, timeSorter, setActiveSorter, setTimeSorter, winSorter, setWinSorter, onChange } = sortState;

  const clickToSort = (value: TSortOptions) => {
    setSortBy(value);
    if (value === 'Time') {
      const order = (timeSorter === 'Asc' ? 'Desc' : 'Asc');
      setTimeSorter(order);
      setActiveSorter(order);
    } else if (value === 'Wins') {
      const order = (winSorter === 'Asc' ? 'Desc' : 'Asc');
      setWinSorter(order);
      setActiveSorter(order);
    }
    onChange();
  };

  const getDir = (value: TSortOptions) => {
    if (value === 'Time') return getSymbol(timeSorter);
    else if (value === 'Wins') return getSymbol(winSorter);
  };

  return (
    <div className="winners_head">
      <div className="winners_index">№</div>
      <div className="winners_name">Winner</div>
      <div
        className={`winners_wins ${sortBy === 'Wins' ? 'active' : ''}`}
        onClick={() => { clickToSort('Wins'); }}
      >Wins
        <span className='sort_arrow'>{getDir('Wins')}</span>
      </div>

      <div
        className={`winners_time ${sortBy === 'Time' ? 'active' : ''}`}
        onClick={() => { clickToSort('Time'); }}
      >Time
        <span className='sort_arrow'>{getDir('Time')}</span>
      </div>
    </div>
  );
}



