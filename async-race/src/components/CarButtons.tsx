import React, { useContext } from 'react';
import { GarageContext } from '../context/garageContext';
import { model } from '../model/fetchData';
import { ICar } from '../types/types';


interface CarItemProps {
  car: ICar
  start: React.Dispatch<React.SetStateAction<boolean>>
  reset: React.Dispatch<React.SetStateAction<boolean>>
}

export function CarButtons({ car, start, reset }: CarItemProps) {
  const { updateNeeded, selectCar } = useContext(GarageContext);

  const deleteCar = async () => {
    await model.deleteCar(car.id);
    updateNeeded();
  };

  return (
    <div className="unit_buttons">
      <div className="line">
        <button onClick={deleteCar}>Del</button>
        <button onClick={() => { selectCar(car); }}>Select</button>
      </div>
      <div className="line">
        <button onClick={() => reset(true)}>Reset</button>
        <button onClick={() => start(true)}>Go</button>
      </div>
    </div>

  );
}