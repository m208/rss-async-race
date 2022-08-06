import React, { useContext } from 'react';
import { GarageContext } from '../context/garageContext';
import { model } from '../model/fetchData';
import { ICar } from '../types/types';
import { GarageControlsInput } from './GarageControlsInput';

interface IGarageControlsProps {
  setRaceStart:  React.Dispatch<React.SetStateAction<boolean>>
  setRaceReset: React.Dispatch<React.SetStateAction<boolean>>
}

export function GarageControls({ setRaceStart, setRaceReset }: IGarageControlsProps) {
  const { updateNeeded } = useContext(GarageContext);

  const createCar = async (car: ICar) => {
    await model.createCar(car);
    updateNeeded();
  };
  
  const updateCar = async (car: ICar) => {
    await model.updateCar(car);
    updateNeeded();
  };

  const generateCars = async () =>{
    await model.generateCars(100);
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
                <button onClick={()=>{setRaceStart(true);}} className='btn btn-light'>RACE</button>
                <button onClick={()=>{setRaceReset(true);}} className='btn btn-light'>RESET</button>
                <button onClick={generateCars} className='btn btn-light'>GENERATE CARS</button>
            </div>

        </div>
  );
}


