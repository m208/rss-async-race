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

  reset: () => void;
  broke: () => void;
  finish: () => void;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  drive: () => Promise<void>;
  ride: () => Promise<void>;

  stopLocal: () => void;
}

export function getCarStateObject(c: ICar) {
  const [broken, setBroken] = useState(false);
  const [car, setCar] = useState(c);
  const [carSpeed, setCarSpeed] = useState(0);
  const [engineStatus, setEngineStatus] = useState<TEngineStatus>('stopped');
  const [duration, setDuration] = useState(0);

  const carObj = {
    id:car.id,
    color:car.color,
    name:car.name,
    
    duration, setDuration,
    car, setCar, broken, setBroken, carSpeed, 
    setCarSpeed, engineStatus, setEngineStatus,

    reset: () => { },

    broke: () => { setBroken(true); },

    finish: () => { setBroken(false); },

    start: async () => {
      const start = await model.start(car.id);
      setEngineStatus('started');
      const speed = (start.data as ICarSpeed).velocity;
      setDuration( (start.data as ICarSpeed).distance / 1000 / speed );

      setCarSpeed(speed);
    },

    stop: async () => {
      const stop = await model.stop(car.id);
      setEngineStatus('stopped');
      const speed = (stop.data as ICarSpeed).velocity;
      setCarSpeed(speed);  // will set 0
    },

    drive: async () => {
      setEngineStatus('drive');
      const drive = await model.drive(car.id);
      if (drive.status === 500) carObj.broke();
      else carObj.finish();
      
      setEngineStatus('stopped');
      setCarSpeed(0);
    },

    ride: async () => {
      console.log('ride');
        
      await carObj.start();
      await carObj.drive();

      console.log('rede ended');
      
    },

    stopLocal: () => {
      setEngineStatus('stopped');
      setCarSpeed(0);
    },

  };

  return carObj;

}