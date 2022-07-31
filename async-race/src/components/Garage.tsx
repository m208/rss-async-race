import React, { useContext, useEffect, useState } from 'react'
import { GarageContext } from '../context/garageContext';
import { model } from '../model/fetchData';
import { ICar } from '../types/types';
import { CarTrack } from './CarTrack'
import { GarageControls } from './GarageControls';


export function Garage() {
    const [carCount, setCarCount] = useState(0)
    const [pageNum, setpageNum] = useState(1)

    const [cars, setCars] = useState<Array<ICar>>([]);
    const {updateState, updated} = useContext(GarageContext)

    useEffect(() => {
        if (!updateState) {
            loadCars();
        }
    });

    const loadCars = async () => {
        const data: ICar[] = await model.getCars();
        setCars(data)
        setCarCount(data.length);
        updated()
    }
    const carItems = cars.map(car =>
        <CarTrack car={car} key={car.id}></CarTrack>
    );


    return (
        <>
            <GarageControls></GarageControls>
            <div className='garage'>
                <h3>Garage ({carCount})</h3>
                <h4>Page #{pageNum}</h4>
                {carItems}
            </div>
        </>




    )
}