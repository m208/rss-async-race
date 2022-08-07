import React from 'react';
import { getTypeFromId } from '../model/garage';
import { ICar, IwinnersFull } from '../types/types';
import { CarSvg } from './CarSvg';

interface WinnerLineProps {
  winner: IwinnersFull;
  index: number

}
export function WinnerLine({ index, winner  }: WinnerLineProps) {
  return (
      <div className="winners_line">
        <div className="winners_index">{index}</div>
        <div className="winners_name">
        <CarSvg color={winner.color} type={getTypeFromId(winner.id)}></CarSvg>
          {winner.name}
          </div>
        <div className="winners_wins">{winner.wins}</div>
        <div className="winners_time">{winner.time.toFixed(2)}</div>
      </div>
  );
}