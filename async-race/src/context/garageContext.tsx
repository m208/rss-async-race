import React, { createContext, useState } from 'react';
import { ICar } from '../types/types';

interface IGarageContext {
  updateState: boolean
  updateNeeded: () => void
  updated: () => void

  selectedCar: ICar | null
  selectCar: (car: ICar | null) => void

  currentCars: ICar[],
  setCurrentCars: (cars: ICar[]) => void
}

export const GarageContext = createContext<IGarageContext>({
  updateState: false,
  updateNeeded: () => { },
  updated: () => { },

  selectedCar: null,
  selectCar: () => { },

  currentCars: [],
  setCurrentCars: () => { },
});

export const GarageState = ({ children }: { children: React.ReactNode }) => {
  const [updateState, setUpdateState] = useState(false);
  const [selectedCar, setSelectedCar] = useState<ICar | null>(null);
  const [currentCars, setCurrentlyDisplayedCars] = useState<Array<ICar>>([]);

  const updateNeeded = () => setUpdateState(false);

  const updated = () => setUpdateState(true);

  const selectCar = (car: ICar | null) => setSelectedCar(car);
  const setCurrentCars = (cars: ICar[]) => setCurrentlyDisplayedCars(cars);

  const context = {
    updateState,
    updateNeeded,
    updated,
    selectedCar,
    selectCar,
    currentCars,
    setCurrentCars,
  };

  return (
    <GarageContext.Provider value={context}>
      {children}
    </GarageContext.Provider>
  );
};