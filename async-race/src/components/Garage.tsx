import React, { useContext, useEffect, useState } from 'react';
import { GarageContext } from '../context/garageContext';
import { ICar } from '../types/types';
import { model } from '../model/fetchData';
import { GarageItem } from './CarTrack';
import { GarageControls } from './GarageControls';
import { Paginator } from './Paginator';
import { Winner } from './Winner';
import { createPagState } from '../context/appState';
import { useRaceLogic } from '../hooks/useRace';
import { itemsPerPage } from '../model/configVars';

const carsPerPage = itemsPerPage.garage;

export function Garage() {
  const [carCount, setCarCount] = useState(0);

  const { updateState, updated, updateNeeded, selectedCar } = useContext(GarageContext);
  const { currentCars, setCurrentCars } = useContext(GarageContext);

  const garagePagState = createPagState(useState(1), useState(1));
  const { currentPage, lastPage, setPage, setPageCount } = garagePagState;
  garagePagState.onChange = updateNeeded;

  const {
    nonIdleCarsCounter,
    setnonIdleCarsCounter,
    raceStart,
    raceReset,
    setRaceReset,
    raceWinner,
    setraceWinner,
    showWinnerModal,
    resetedCars,
    disableRaceBttn,
    setdisableRaceBttn,
    startRace,
    resetRace,
    setWinner,
    confirmReset,
    closeWinnerModal,

  } = useRaceLogic();

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
      setraceWinner(null);
      setdisableRaceBttn(false);
      setRaceReset(false);
    }
  });

  useEffect(() => {
    if (resetedCars >= currentCars.length) {
      setdisableRaceBttn(false);
      setRaceReset(false);
    }
  }, [resetedCars]);

  useEffect(() => {
    setdisableRaceBttn(nonIdleCarsCounter !== 0);
  }, [nonIdleCarsCounter]);

  const carItems = currentCars.map(car =>
    <GarageItem
      car={car}
      raceStart={raceStart}
      raceReset={raceReset}
      setWinner={setWinner}
      confirmReset={confirmReset}
      raceWinner={raceWinner}
      setnonIdleCarsCounter={setnonIdleCarsCounter}
      key={car.id}
    />,
  );

  return (
    <>
      <GarageControls setRaceStart={startRace} setRaceReset={resetRace} disableRaceBttn={disableRaceBttn} />
      <div className='garage'>
        <h3>Garage ({carCount})</h3>
        {(raceWinner && showWinnerModal) && <Winner data={raceWinner} close={closeWinnerModal} />}
        {carItems}
        <Paginator {...garagePagState} />
      </div>
    </>
  );
}