import React, { useContext } from 'react';
import { TRaceWinner } from '../types/types';

interface WinnerProps {
  data: TRaceWinner,
  close: ()=>void
}

export function Winner({ data, close }: WinnerProps) {
  return (
    <>
    <div className='modal_wrapper' onClick={close}>
      <div className="modal">
        <p>Winner is: {data.name} with time {data.time.toFixed(2)} sec!</p>
      </div>
    </div>
    </>
    
  );
}