import React from 'react';
import Svg from '../assets/svg/cars-sprite.svg';

interface CarSvgProps {
  color: string;
  type: number
}

export function CarSvg({ color = 'white', type = 1 }: CarSvgProps) {
  return (    
        <svg className="svg-letter" fill={color} width='100' height='40'>
        <use href={`${Svg}#car-0${type}`} />
    </svg>);
}


