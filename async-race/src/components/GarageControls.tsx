import React from 'react';
import { GarageControlsInput } from './GarageControlsInput';



export function GarageControls() {
    return (
        <div className="garage_controls">
            <GarageControlsInput buttonText='Create'></GarageControlsInput>
            <GarageControlsInput buttonText='Update'></GarageControlsInput>

            <div className="controls_line">
                <button>RACE</button>
                <button>RESET</button>
                <button>GENERATE CARS</button>
            </div>

        </div>
    );
}


