import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
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
  setnonIdleCarsCounter: Dispatch<SetStateAction<number>>;
  confirmReset: (car: ICar) => void
  raceWinner: TRaceWinner | null
}

export function GarageItem({ car, raceStart, raceReset, setWinner, confirmReset, raceWinner, setnonIdleCarsCounter }: CarItemProps) {
  const carModel: ICarState = getCarStateObject(car);
  
  const [started, setStart] = useState(false);
  const [reseted, setReset] = useState(false);
  const [isIdle, setIsIdle] = useState(true);

  const resetRide = async () => {
    carModel.reset();
    setIsIdle(true);
    setReset(false);
  };

  // Single ride started
  useEffect(() => {
    if (started) {      
      carModel.ride();
      setIsIdle(false);
      setStart(false);
      setnonIdleCarsCounter(prev=>prev + 1);
    }
  }, [started]);

  // Single ride reseted
  useEffect(() => {
    if (reseted) { 
      resetRide();
      setnonIdleCarsCounter(prev=>prev - 1);
    }
  }, [reseted]);
    
  // Race started
  useEffect(() => {
    if (raceStart) { 
      carModel.ride();
      setIsIdle(false);
    }
  }, [raceStart]); 

  // Race reseted
  useEffect(() => {
    if (raceReset) {
      resetRide();
    }
  }, [raceReset]);

  // this car finished > send data to garage 
  useEffect(() => {
    if (carModel.finished && raceStart ) {
      setWinner({ id: carModel.id, name: carModel.name, time: carModel.duration, wins: 1 });
    }
  }, [carModel.finished]);

  // this car is reseted > send data to garage 
  useEffect(() => {
    if (carModel.reseted) {
      confirmReset(carModel);
    }
  }, [carModel.reseted]);

  const animation =
    `unit_track ${carModel.shouldAnimate ? 'ride' : ''} 
      ${carModel.broken && carModel.shouldAnimate ? 'anim-pause broke' : ''} 
      ${raceWinner && carModel.shouldAnimate && carModel.id === raceWinner.id ? 'winner' : ''}
      ${carModel.awaiting ? 'awaiting' : ''}
    `;

  return (
    <div className='garage_unit'>
      {<CarButtons car={car} start={setStart} reset={setReset} isIdle={isIdle} />}
      <div className="unit_car">
        <span className='garage_name'>{car.name}</span>
        <div 
          className={animation}
          style={{ animationDuration: `${carModel.duration}s` }}>
          <CarSvg color={carModel.color} type={getTypeFromId(carModel.id)} />
        </div>
      </div>
    </div>
  );
}
