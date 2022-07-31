import React, { useContext } from 'react';
import { GarageContext } from '../context/garageContext';
import { GarageControlsInput } from './GarageControlsInput';



export function GarageControls() {
    //const {modal, open, close} = useContext(GarageContext)
    return (
        <div className="garage_controls">
            <GarageControlsInput buttonText='Create'></GarageControlsInput>
            <GarageControlsInput buttonText='Update'></GarageControlsInput>

            <div className="controls_line">
                <button className='btn btn-light'>RACE</button>
                <button className='btn btn-light'>RESET</button>
                <button className='btn btn-light'>GENERATE CARS</button>
            </div>

        </div>
    );
}


