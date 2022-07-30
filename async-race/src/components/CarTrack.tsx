import React, { useState } from 'react'
import { ICar } from '../utils/types'
import { CarSvg } from './CarSvg'

interface CarItemProps {
    car: ICar
  }

export function CarTrack({ car }: CarItemProps) {
    const [carCount, setCarCount] = useState(0)
    const [pageNum, setpageNum] = useState(1)
    return (
        <div className='garage_unit'>

        <div className='garage_edit-car'>
            <button>Remove</button>
            <button>Edit</button>

            <span className='garage_name'>{car.name}</span>
        </div>

        <div className="garage_lane">
        <div className='garage_race-car'>
            <button>Go</button>
            <button>Reset</button>
        </div>
        <div className="garage_track">
        <CarSvg color={car.color} type={randomNumInRange(1, 4)}></CarSvg>
        </div>
        </div>


        </div>

    )
}

function randomNumInRange(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}