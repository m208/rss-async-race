import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../context/garageContext';
import { ICar } from '../types/types';

interface GarageControlsInputProps {
  buttonText: string;
  action: (car: ICar) => void;

  carSelectionControl: boolean
}

const defaultColor = '#ffffff';
const defaultName = '';

export function GarageControlsInput({ buttonText, action, carSelectionControl = false }: GarageControlsInputProps) {

  const { selectedCar, selectCar } = useContext(GarageContext);

  const [color, setColor] = useState(defaultColor);
  const [name, setName] = useState(defaultName);
  const [id, setId] = useState(0);

  useEffect(() => {
    if (selectedCar && carSelectionControl ) {
      setColor(selectedCar.color);
      setName(selectedCar.name);
      setId(selectedCar.id);
    }
  });

  const changeColor = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setColor(event.target.value);
    if (carSelectionControl && selectedCar) {
      selectedCar.color = event.target.value;
    } 
  };

  const changeName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (carSelectionControl && selectedCar) {
      selectedCar.name = event.target.value;
    }
  };

  const resetFields = () =>{
    setColor(defaultColor);
    setName(defaultName);
  };

  const click = () => {
    if (carSelectionControl && selectedCar) {
      action(selectedCar);
      selectCar(null);
    } else {
      action({ name, color, id });
    }
    resetFields();
  };

  return (
        <div className="controls_line">
            <input type="text" value={name} onChange={changeName} />
            <input type="color" value={color} onChange={changeColor} />
            <button onClick={click}>{buttonText}</button>
        </div>
  );
}


