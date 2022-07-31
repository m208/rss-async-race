import React, { createContext, useState } from 'react';
import { ICar } from '../types/types';

interface IModalContext {
  updateState: boolean
  updateNeeded: () => void
  updated: () => void

  selectedCar: ICar | null

  selectCar: (car: ICar | null) => void 
}

export const GarageContext = createContext<IModalContext>({
  updateState: false,
  updateNeeded: () => {},
  updated: () => {}, 
  
  selectedCar: null,
  selectCar: () => {},
});

export const GarageState = ({ children }: { children: React.ReactNode }) => {
  const [updateState, setUpdateState] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);


  const updateNeeded = () => setUpdateState(false);

  const updated = () => setUpdateState(true);

  const selectCar = (car: ICar | null) => setSelectedCar(car);

  return (
    <GarageContext.Provider value={{ updateState, updateNeeded, updated, selectedCar, selectCar }}>
      { children }
    </GarageContext.Provider>
  );
};