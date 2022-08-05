import React, { useContext } from 'react';
import { getTypeFromId } from '../model/garage';
import { ICar } from '../types/types';
import { CarButtons } from './CarButtons';
import { CarSvg } from './CarSvg';

interface CarItemProps {
  car: ICar
}

export function GarageItem({ car }: CarItemProps) {

  return (
        <div className='garage_unit'>
          <CarButtons car={car}/>
          <div className="unit_car">
            <span className='garage_name'>{car.name}</span>
            <div className="unit_track">
              <CarSvg color={car.color} type={getTypeFromId(car.id)}/>
            </div>
          </div>
        </div>

  );
}
