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
  setWinner: (winner: TRaceWinner, raceCounter: number) => void
  setnonIdleCarsCounter: React.Dispatch<React.SetStateAction<number>>;
  confirmReset: (car: ICar) => void
  raceWinner: TRaceWinner | null
  raceCounter: number
}

export function GarageItem({ car, raceStart, raceReset, setWinner, confirmReset, raceWinner, raceCounter, setnonIdleCarsCounter }: CarItemProps) {
  const car2: ICarState = getCarStateObject(car);
  const [started, setStart] = useState(false);
  const [reseted, setReset] = useState(false);

  const [isIdle, setIsIdle] = useState(true);

  const resetRide = async () => {
    await car2.reset();
    setIsIdle(true);
    setReset(false);
  };

  useEffect(() => {
    if (raceStart) { 
      car2.ride(raceCounter);
      setIsIdle(false);
    }
    
  }, [raceStart]);

  useEffect(() => {
    if (car2.finished && raceStart && raceCounter === car2.raceCounter) {

      setWinner({ id: car2.id, name: car2.name, time: car2.duration, wins: 1 }, raceCounter);
    }
  }, [car2.finished]);

  useEffect(() => {
    if (car2.reseted) {
      confirmReset(car2);
    }
  }, [car2.reseted]);

  useEffect(() => {
    if (raceReset) {
      resetRide();
    }
  }, [raceReset]);

  useEffect(() => {
    if (reseted) { 
      resetRide();
      setnonIdleCarsCounter(prev=>prev - 1);
    }
  }, [reseted]);

  useEffect(() => {
    if (started) {      
      car2.ride();
      setIsIdle(false);
      setStart(false);

      setnonIdleCarsCounter(prev=>prev + 1);
    }
  }, [started]);


  const className =
    `unit_track ${car2.shouldAnimate ? 'ride' : ''} 
      ${car2.broken && car2.shouldAnimate ? 'anim-pause broke' : ''} 
      ${raceCounter === car2.raceCounter && raceWinner && car2.shouldAnimate && car2.id === raceWinner.id ? 'winner' : ''}
      ${car2.awaiting ? 'awaiting' : ''}
    `;

  return (
    <div className='garage_unit'>
      {<CarButtons car={car} start={setStart} reset={setReset} isIdle={isIdle} />}
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
