import React, { useContext } from 'react';
import { GarageContext } from '../context/garageContext';
import { model } from '../model/fetchData';
import { ICar } from '../types/types';
import { GarageControlsInput } from './GarageControlsInput';



export function GarageControls() {
  const { updateNeeded } = useContext(GarageContext);

  const createCar = async (car: ICar) => {
    await model.createCar(car);
    updateNeeded();
  };
  
  const updateCar = async (car: ICar) => {
    await model.updateCar(car);
    updateNeeded();
  };

  return (
        <div className="garage_controls">
            <GarageControlsInput 
                buttonText='Create' action={createCar} carSelectionControl={false}
            ></GarageControlsInput>

            <GarageControlsInput 
                buttonText='Update' action={updateCar} carSelectionControl={true}
            ></GarageControlsInput>

            <div className="controls_line">
                <button className='btn btn-light'>RACE</button>
                <button className='btn btn-light'>RESET</button>
                <button className='btn btn-light'>GENERATE CARS</button>
            </div>

        </div>
  );
}


