import { useState } from 'react';
import { ICar, ICarSpeed, TEngineStatus } from '../types/types';
import { model } from './fetchData';

export interface ICarState {
  id: number;
  color: string;
  name: string;
  broken: boolean;
  carSpeed: number;
  engineStatus: TEngineStatus;
  duration: number;
  shouldAnimate: boolean;
  finished: boolean;
  awaiting: boolean;
  reseted: boolean;

  reset: () => void;
  broke: () => void;
  finish: () => void;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  drive: () => Promise<void>;
  ride: (c?: number) => Promise<void>;
}

export function getCarStateObject(c: ICar) {
  const [car, setCar] = useState(c);

  const [broken, setBroken] = useState(false);
  const [carSpeed, setCarSpeed] = useState(0);
  const [engineStatus, setEngineStatus] = useState<TEngineStatus>('stopped');
  const [duration, setDuration] = useState(0);
  const [shouldAnimate, setshouldAnimate] = useState(false);
  const [finished, setFinished] = useState(false);
  const [awaiting, setAwaiting] = useState(false);
  const [reseted, setReseted] = useState(false);


  const carObj = {
    id: car.id,
    color: car.color,
    name: car.name,

    duration,
    shouldAnimate,
    finished, 
    awaiting, 
    reseted,  
    broken, 
    carSpeed,
    engineStatus, 

    reset: async () => {
      await carObj.stop();
      setshouldAnimate(false);
      setBroken(false);
      setFinished(false);
      setReseted(true);
    },

    broke: () => { setBroken(true); },

    finish: () => { setFinished(true); },

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
        carObj.finish();
      } catch (error) {
        carObj.broke();
      } finally {
        setEngineStatus('stopped');
        setCarSpeed(0);
      }
    },

    ride: async () => {
      await carObj.start();
      await carObj.drive();
    },
  };

  return carObj;

}