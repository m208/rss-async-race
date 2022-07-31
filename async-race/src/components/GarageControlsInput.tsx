import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../context/garageContext';
import { ICar } from '../types/types';

interface GarageControlsInputProps {
  buttonText: string;
  action: (car: ICar) => void;

  stateAble: boolean
}

export function GarageControlsInput({ buttonText, action, stateAble }: GarageControlsInputProps) {

  const { selectedCar } = useContext(GarageContext);
  // const bc: ICar = (selectedCar) ? selectedCar : { id: 0, color: '#ffffff', name : '' };

  // const bindedCar: ICar = (stateAble && selectedCar)? selectedCar : {id: 0, color: '#ffffff', name : ''};
  // const [bindedCar1, setbindedCar] = useState((stateAble && selectedCar)? selectedCar : {id: 0, color: '#ffffff', name : ''});


  // const [bindedCar, setBindedCar] = useState(bc);

  // const manualInput = false;

  const [color, setColor] = useState('#ffffff');
  const [name, setName] = useState('');
  const [id, setId] = useState(0);

  useEffect(() => {
    if (selectedCar && stateAble ) {
      setColor(selectedCar.color);
      setName(selectedCar.name);
      setId(selectedCar.id);

            
    }
  });



  // const [color, setColor] = useState(selectedCar?.color || 'ffffff');
  // const [name, setName] = useState(selectedCar?.name);
  // const [id, setId] = useState(selectedCar?.id);


  const changeColor = (event: React.KeyboardEvent<HTMLInputElement>) => {

    setColor(event.target.value);
  };
  const changeName = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(event.target.value);
        
    setName(event.target.value);
  };



  const resetFields = () =>{
    setColor('#ffffff');
    setName('');
  };

  const click = () => {
    action({ name, color, id });
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


