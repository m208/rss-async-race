import React, { useContext, useEffect, useState } from 'react';
import { ICarState, getCarStateObject } from '../model/Car';
import { getTypeFromId } from '../model/garage';
import { ICar, TRaceWinner } from '../types/types';
import { CarButtons } from './CarButtons';
import { CarSvg } from './CarSvg';

interface CarItemProps {
  car: ICar
  raceStart: boolean
  raceReset: boolean
  setWinner: (winner: TRaceWinner) => void
  raceWinner: TRaceWinner | null
}

export function GarageItem({ car, raceStart, raceReset, setWinner, raceWinner }: CarItemProps) {
  const car2: ICarState = getCarStateObject(car);
  const [started, setStart] = useState(false);
  const [reseted, setReset] = useState(false);

  const [race, setRace] = useState(false);

  useEffect(() => {
    if (raceStart) car2.ride();
  }, [raceStart]);

  useEffect(() => {
    if (car2.finished && raceStart) setWinner({ id: car2.id, name: car2.name, time: car2.duration, wins: 1 });
  });

  useEffect(() => {
    if (raceReset) car2.reset();
  }, [raceReset]);

  useEffect(() => {
    if (started) {
      car2.ride();
      setStart(false);
    }
    if (reseted) {
      car2.reset();
      setReset(false);
    }
  });

  const className = 
    `unit_track ${car2.shouldAnimate ? 'ride' : ''} 
      ${car2.broken ? 'anim-pause broke' : ''} 
      ${raceWinner !== null && car2.id === raceWinner.id ? 'winner' : ''  }
      ${car2.awaiting ? 'awaiting' : ''  }
    `;

  return (
    <div className='garage_unit'>
      {<CarButtons car={car} start={setStart} reset={setReset} />}
      <div className="unit_car">
        <span className='garage_name'>{car.name}</span>
        <div className={className}
          style={{ animationDuration: `${car2.duration}s` }}>
          <CarSvg color={car2.color} type={getTypeFromId(car2.id)} />
        </div>
      </div>
    </div>
  );
}
