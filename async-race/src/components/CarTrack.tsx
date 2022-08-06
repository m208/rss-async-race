import React, { useContext, useEffect, useState } from 'react';
import { ICarState, getCarStateObject } from '../model/Car';
import { getTypeFromId } from '../model/garage';
import { ICar } from '../types/types';
import { CarButtons } from './CarButtons';
import { CarSvg } from './CarSvg';

interface CarItemProps {
  car: ICar
  //start: boolean
}

export function GarageItem( { car }: CarItemProps) {
  const car2: ICarState = getCarStateObject(car);


  // useEffect(() => {
  //   if (start) {
  //     car2.ride();
      
  //   }
  // }, []);
  

  return (
        <div className='garage_unit'>
          { <CarButtons car={car}/> }
          <div className="unit_car">
            <button onClick={()=>car2.ride()}>OK</button>
            <span>{'' + car2.broken}</span>
            <span className='garage_name'>{car.name}</span><span>Engi:{car2.engineStatus}</span><span>speed:{car2.carSpeed}</span>
            <div className={car2.carSpeed > 0 ? 'ride unit_track' : 'unit_track' } style={{ animationDuration: `${car2.duration}s` }}>
              <CarSvg color={car2.color} type={getTypeFromId(car2.id)}/>
            </div>
          </div>
        </div>
  );
}
