import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../context/garageContext';
import { IPaginationContext, ICar } from '../types/types';
import { model } from '../model/fetchData';
import { CarTrack } from './CarTrack';
import { GarageControls } from './GarageControls';
import { Paginator } from './Paginator';

const carsPerPage = 7;

interface GarageProps {
  paginationState: IPaginationContext
}

export function Garage({ paginationState }: GarageProps) {
  const [carCount, setCarCount] = useState(0);

  const { updateState, updated, updateNeeded,  selectedCar } = useContext(GarageContext);
  const { currentCars, setCurrentCars } = useContext(GarageContext);

  const { currentPage, lastPage, setPage, setPageCount } = paginationState;
  paginationState.callback = updateNeeded;

  const loadCars = async (num?: number, limit?: number) => {
    
    const res = await model.getCars(num, limit);
    const carsArray: ICar[] = res.data as ICar[];

    if (carsArray.length === 0 && currentPage !== 1) {
      setPage(currentPage - 1);
    } else {
      setCurrentCars(carsArray);
      const count = res.total ? +res.total : 0;
      setCarCount(count);
      setPageCount(Math.ceil(count / carsPerPage));
    
      updated();
    }
  };
  
  useEffect(() => {
    if (!updateState) {
      loadCars(currentPage, carsPerPage);
    }
  });

  const carItems = currentCars.map(car =>
        <CarTrack car={car} key={car.id}></CarTrack>,
  );

  return (
        <>
            <GarageControls></GarageControls>
            <div className='garage'>
                <h3>Garage ({carCount})</h3>
                <h4>Page #{currentPage} / {lastPage}</h4>
                <Paginator {...paginationState} ></Paginator>
                {carItems}
            </div>
        </>




  );
}