import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../context/garageContext';
import { IPaginationContext, ICar, IAppState } from '../types/types';
import { model } from '../model/fetchData';
import { GarageItem } from './CarTrack';
import { GarageControls } from './GarageControls';
import { Paginator } from './Paginator';

const carsPerPage = 7;

interface GarageProps {
  appState: IAppState
}

export function Garage({ appState }: GarageProps) {
  const [carCount, setCarCount] = useState(0);

  const { updateState, updated, updateNeeded,  selectedCar } = useContext(GarageContext);
  const { currentCars, setCurrentCars } = useContext(GarageContext);

  const { currentPage, lastPage, setPage, setPageCount } = appState.garagePagState;
  appState.garagePagState.onChange = updateNeeded;

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
        <GarageItem car={car} key={car.id}/>,
  );

  return (
        <>
            <GarageControls></GarageControls>
            <div className='garage'>
                <h3>Garage ({carCount})</h3>
                {carItems}
                <Paginator {...appState.garagePagState} ></Paginator>
            </div>
        </>




  );
}