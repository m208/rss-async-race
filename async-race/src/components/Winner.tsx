import React, { useContext } from 'react';
import { TRaceWinner } from '../types/types';

interface WinnerProps {
  data: TRaceWinner
}

export function Winner({ data }: WinnerProps) {
  return (
    <p>Winners is: {data.name} with time {data.time.toFixed(2)} sec!</p>
  );
}