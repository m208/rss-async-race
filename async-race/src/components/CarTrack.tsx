import React, { useContext } from 'react';
import { GarageContext } from '../context/garageContext';
import { model } from '../model/fetchData';
import { ICar } from '../types/types';
import { CarSvg } from './CarSvg';

interface CarItemProps {
  car: ICar
}

function getTypeFromId(id: number) {
  return  (id % 4) + 1;
}

export function CarTrack({ car }: CarItemProps) {
  const { updateNeeded, selectCar } = useContext(GarageContext);


  const deleteCar = async () => {
    await model.deleteCar(car.id);
    updateNeeded();
  };

  return (
        <div className='garage_unit'>

            <div className='garage_edit-car'>
                <button onClick={deleteCar}>Remove</button>
                <button onClick={() => { selectCar(car); }}>Select</button>

                <span className='garage_name'>{car.name}</span>
            </div>

            <div className="garage_lane">
                <div className='garage_race-car'>
                    <button onClick={updateNeeded}>Go</button>
                    <button onClick={updateNeeded}>Reset</button>
                </div>
                <div className="garage_track">
                    <CarSvg color={car.color} type={getTypeFromId(car.id)}></CarSvg>
                </div>
            </div>


        </div>

  );
}

