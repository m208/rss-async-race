import React, { useContext, useState } from 'react'
import { GarageContext } from '../context/garageContext'
import { model } from '../model/fetchData'
import { ICar } from '../types/types'
import { CarSvg } from './CarSvg'

interface CarItemProps {
    car: ICar
  }

export function CarTrack({ car }: CarItemProps) {
    const {updateNeeded, updated} = useContext(GarageContext);


    const deleteCar = async () => {
        console.log('del ', car.id);
        await model.deleteCar(car.id);
        updateNeeded()
    }



    return (
        <div className='garage_unit'>

        <div className='garage_edit-car'>
            <button onClick={deleteCar}>Remove</button>
            <button>Edit</button>

            <span className='garage_name'>{car.name}</span>
        </div>

        <div className="garage_lane">
        <div className='garage_race-car'>
            <button onClick={updateNeeded}>Go</button>
            <button onClick={updateNeeded}>Reset</button>
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