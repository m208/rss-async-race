import React, { useContext } from 'react';
import { GarageContext } from '../context/garageContext';
import { model } from '../model/fetchData';
import { ICar } from '../types/types';


interface CarItemProps {
  car: ICar
}

export function CarButtons({ car }: CarItemProps) {
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
            <button onClick={updateNeeded}>Go</button>
            <button onClick={updateNeeded}>Reset</button>
        </div>
   </div>

  );
}