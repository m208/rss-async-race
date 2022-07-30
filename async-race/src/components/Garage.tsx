import React, { useEffect, useState } from 'react'
import { getCars } from '../utils/fetchData';
import { ICar } from '../utils/types';
import { CarTrack } from './CarTrack'
import { GarageControls } from './GarageControls';


export function Garage() {
    const [carCount, setCarCount] = useState(0)
    const [pageNum, setpageNum] = useState(1)

    const [cars, setCars] = useState<Array<ICar>>([]);


    useEffect(() => {
        if (cars.length === 0) {
            getCars1();
        }
    });

    const getCars1 = async () => {
        const data: ICar[] = await getCars();
        setCars(data)
        console.log(data);
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