import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../context/garageContext';
import { IPaginationContext, ICar, IAppState, TRaceWinner } from '../types/types';
import { manageWinnersDB, model } from '../model/fetchData';
import { GarageItem } from './CarTrack';
import { GarageControls } from './GarageControls';
import { Paginator } from './Paginator';
import { Winner } from './Winner';

const carsPerPage = 7;

interface GarageProps {
  appState: IAppState
}

export function Garage({ appState }: GarageProps) {
  const [carCount, setCarCount] = useState(0);

  const [raceStart, setRaceStart] = useState(false);
  const [raceReset, setRaceReset] = useState(false);
  const [raceWinner, setraceWinner] = useState<TRaceWinner | null>(null);
  const [showWinnerModal, setshowWinnerModal] = useState(false);

  const { updateState, updated, updateNeeded, selectedCar } = useContext(GarageContext);
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

  const startRace = () =>{
    setRaceReset(false);
    setRaceStart(true);
  };
  const resetRace = () => {
    setraceWinner(null);
    setRaceStart(false);
    setRaceReset(true);
  };
  const setWinner = async (winner: TRaceWinner ) =>{
    setraceWinner(prev=>prev ? null : winner);
    setRaceStart(false);
    setshowWinnerModal(true);

    await manageWinnersDB(winner);


  };

  const closeWinnerModal = () =>{ setshowWinnerModal(false );};

  const carItems = currentCars.map(car =>
    <GarageItem 
      car={car} 
      raceStart={raceStart} 
      raceReset={raceReset} 
      setWinner={setWinner}
      raceWinner={raceWinner}
      key={car.id} 
    />,
  );

  return (
    <>
      <GarageControls setRaceStart={startRace} setRaceReset={resetRace} />
      <div className='garage'>
        <h3>Garage ({carCount})</h3>
        {(raceWinner && showWinnerModal) && <Winner data ={raceWinner} close={closeWinnerModal}/>}
        {carItems}
        <Paginator {...appState.garagePagState} />
      </div>
    </>




  );
}