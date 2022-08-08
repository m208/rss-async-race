import { useState } from 'react';
import { ICar, ICarSpeed, TEngineStatus } from '../types/types';
import { model } from './fetchData';

export interface ICarState {
  id: number;
  color: string;
  name: string;
  car: ICar;
  setCar: React.Dispatch<React.SetStateAction<ICar>>;
  broken: boolean;
  setBroken: React.Dispatch<React.SetStateAction<boolean>>;
  carSpeed: number;
  setCarSpeed: React.Dispatch<React.SetStateAction<number>>;
  engineStatus: TEngineStatus;
  setEngineStatus: React.Dispatch<React.SetStateAction<TEngineStatus>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  shouldAnimate: boolean;
  setshouldAnimate: React.Dispatch<React.SetStateAction<boolean>>;
  
  finished: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
  awaiting: boolean;
  setAwaiting: React.Dispatch<React.SetStateAction<boolean>>;
  reseted: boolean;
  setReseted: React.Dispatch<React.SetStateAction<boolean>>;
  raceCounter:number

  reset: () => void;
  broke: () => void;
  finish: () => void;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  drive: () => Promise<void>;
  ride: (c?: number) => Promise<void>;
}

export function getCarStateObject(c: ICar) {
  const [broken, setBroken] = useState(false);
  const [car, setCar] = useState(c);
  const [carSpeed, setCarSpeed] = useState(0);
  const [engineStatus, setEngineStatus] = useState<TEngineStatus>('stopped');
  const [duration, setDuration] = useState(0);
  const [shouldAnimate, setshouldAnimate] = useState(false);
  const [finished, setFinished] = useState(false);
  const [awaiting, setAwaiting] = useState(false);
  const [reseted, setReseted] = useState(false);
  const [raceCounter, setRaceCounter] = useState(-1);

  const carObj = {
    id: car.id,
    color: car.color,
    name: car.name,

    duration, setDuration,
    shouldAnimate, setshouldAnimate,
    finished, setFinished,
    awaiting, setAwaiting,
    reseted, setReseted, raceCounter,
    car, setCar, broken, setBroken, carSpeed,
    setCarSpeed, engineStatus, setEngineStatus,

    reset: async () => { 
      await carObj.stop();
      setshouldAnimate(false);
      setBroken(false);
      setFinished(false);
      setReseted(true);
    },

    broke: () => { setBroken(true); },

    finish: () => { 
      setFinished(true); 

    },

    start: async () => {
      setReseted(false);
      setFinished(false);
      setAwaiting(true);
      const start = await model.start(car.id);
      setAwaiting(false);
      setEngineStatus('started');
      const speed = (start.data as ICarSpeed).velocity;
      setDuration((start.data as ICarSpeed).distance / 1000 / speed);

      setCarSpeed(speed);
    },

    stop: async () => {
      setAwaiting(true);
      const stop = await model.stop(car.id);
      setAwaiting(false);
      setEngineStatus('stopped');
      const speed = (stop.data as ICarSpeed).velocity;
      setCarSpeed(speed);  // will set 0
    },

    drive: async () => {
      setEngineStatus('drive');
      setshouldAnimate(true);
      try {
        const drive = await model.drive(car.id);
        //if (!reseted) carObj.finish();
        carObj.finish();
      } catch (error) {
        //if (!reseted) carObj.broke();
        carObj.broke();
      } finally {
        setEngineStatus('stopped');
        setCarSpeed(0);
      }
    },

    ride: async (counter? :number) => {
      if (counter) setRaceCounter(counter);
      await carObj.start();
      await carObj.drive();
    },
  };

  return carObj;

}