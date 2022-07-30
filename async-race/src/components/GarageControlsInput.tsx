import React from 'react';

interface GarageControlsInputProps {
    buttonText: string
}

export function GarageControlsInput({ buttonText }: GarageControlsInputProps) {
    return (
        <div className="controls_line">
            <input type="text" />
            <input type="color" value="#ffffff" />
            <button>{buttonText}</button>
        </div>
    );
}


